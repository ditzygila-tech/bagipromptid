// ============================================================
// FIREBASE REAL & REAL-TIME PLATFORM CORE ENGINE
// ============================================================

// Deteksi Inisialisasi Firebase Nyata
let auth = null;
let db = null;
let storage = null;
let isRealFirebase = false;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    isRealFirebase = true;
  } catch (e) {
    console.error("Kesalahan kritis konfigurasi Firebase: ", e);
  }
}

// State Global Ter-sinkronisasi
let currentUser = null;
let db_prompts = []; // Disinkronkan realtime dari Firestore
let activeCategory = "Semua";
let currentSearch = "";
let currentFilter = "Semua";
let currentSort = "Terbaru";
let visiblePromptsCount = 6;

// Cache gambar sesi lokal (Base64/ObjectURL) agar langsung tampil sebelum di-sync server fisik
let tempImageCache = {};

// ============================================================
// SISTEM SEEDING OTOMATIS (FIRST RUN IN PRODUCTION)
// ============================================================
function seedInitialData() {
  if (!isRealFirebase) return;
  if (typeof SAMPLE_PROMPTS === "undefined" || !SAMPLE_PROMPTS.length) return;
  
  showToast("Menginisialisasi basis data sampel di Cloud Firestore...");
  let batch = db.batch();
  
  SAMPLE_PROMPTS.forEach(p => {
    let docRef = db.collection("prompts").doc(p.id);
    batch.set(docRef, {
      title: p.title,
      category: p.category,
      description: p.description,
      promptText: p.promptText,
      imageUrl: p.imageUrl,
      tags: p.tags,
      creatorId: p.creatorId,
      creatorName: p.creatorName,
      uploadDate: p.uploadDate,
      viewCount: p.viewCount,
      copyCount: p.copyCount,
      isPublished: p.isPublished,
      isVerified: p.isVerified,
      status: p.status
    });
  });

  batch.commit()
    .then(() => { showToast("Selesai memigrasikan pustaka data sampel pertama."); })
    .catch(err => { console.error("Migrasi awal Firestore gagal: ", err); });
}

// ============================================================
// INITIALIZATION & REAL-TIME SYNC READERS
// ============================================================
if (isRealFirebase) {
  // 1. Sinkronisasi Autentikasi Pengguna
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).onSnapshot(doc => {
        if (doc.exists) {
          currentUser = { uid: user.uid, ...doc.data() };
        } else {
          currentUser = { uid: user.uid, displayName: user.displayName || "Kreator", email: user.email, role: "user" };
        }
        updateNavCta();
        runPageSpecificInit();
      });
    } else {
      currentUser = null;
      updateNavCta();
      runPageSpecificInit();
    }
  });

  // 2. Sinkronisasi Data Prompt Utama Secara Real-time (Seketika)
  db.collection("prompts").onSnapshot(snapshot => {
    db_prompts = [];
    snapshot.forEach(doc => {
      db_prompts.push({ id: doc.id, ...doc.data() });
    });

    // Jalankan seeding otomatis jika koleksi database kosong di server awan Anda
    if (db_prompts.length === 0) {
      seedInitialData();
    } else {
      const path = window.location.pathname;
      const page = path.substring(path.lastIndexOf("/") + 1);
      
      // Update visual komponen yang bergantung pada real-time data secara instan
      if (page === "" || page === "index.html") {
        loadLiveCounter();
        loadTrendingPrompts();
        filterAndRenderPrompts();
      } else if (page === "admin.html") {
        loadAdminStats();
        renderAdminPrompts();
      }
    }
  });
} else {
  // Fallback lokal jika kunci API masih belum diubah pengguna
  document.addEventListener("DOMContentLoaded", () => {
    db_prompts = typeof SAMPLE_PROMPTS !== "undefined" ? SAMPLE_PROMPTS : [];
    updateNavCta();
    runPageSpecificInit();
  });
}

// ============================================================
// UTILITIES (Sama & Konsisten Tanpa Emojis)
// ============================================================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.className = "toast-notification show";
  toast.style.background = type === "danger" ? "var(--color-danger)" : "var(--color-accent)";
  setTimeout(() => { toast.className = "toast-notification"; }, 3000);
}

function showConfirmDialog(title, desc, onConfirm) {
  const overlay = document.getElementById("confirmDialog");
  const t = document.getElementById("confirmTitle");
  const d = document.getElementById("confirmDesc");
  const cancel = document.getElementById("confirmCancelBtn");
  const yes = document.getElementById("confirmYesBtn");
  
  if (!overlay) return;
  t.innerText = title;
  d.innerText = desc;
  overlay.classList.add("active");
  
  const close = () => { overlay.classList.remove("active"); };
  cancel.onclick = close;
  yes.onclick = () => { onConfirm(); close(); };
}

function formatNumber(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n;
}

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function handleImageError(imageElement) {
  const title = imageElement.alt || "AI Prompt";
  imageElement.onerror = null;
  imageElement.src = `https://placehold.co/600x400/e0e7ff/4F46E5?text=${encodeURIComponent(title)}`;
}

// ============================================================
// MEDIA STORAGE INTEGRATED ENGINE
// ============================================================
function uploadMediaToFirebase(file, targetFolder) {
  return new Promise((resolve, reject) => {
    if (!isRealFirebase || !storage) {
      // Langkah mitigasi jika menggunakan mode pengembangan tanpa storage bucket terdaftar
      resolve("assets/img/" + file.name);
      return;
    }
    const storageRef = storage.ref().child(`${targetFolder}/${Date.now()}_${file.name}`);
    storageRef.put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(downloadURL => resolve(downloadURL))
      .catch(err => {
        console.warn("Storage upload terhambat. Mengalihkan ke direktori lokal: ", err);
        resolve("assets/img/" + file.name);
      });
  });
}

// ============================================================
// CORE NAVIGATION CTA RENDERER
// ============================================================
function updateNavCta() {
  const area = document.getElementById("navCtaArea");
  if (!area) return;
  if (currentUser) {
    let dashboardLink = currentUser.role === "admin" || currentUser.role === "moderator" ? "admin.html" : "dashboard.html";
    area.innerHTML = `
      <a href="${dashboardLink}" class="btn-secondary btn-nav">Panel Kontrol</a>
      <button onclick="handleLogout()" class="btn-primary btn-nav">Keluar</button>
    `;
  } else {
    area.innerHTML = `<a href="login.html" class="btn-primary btn-nav">Masuk</a>`;
  }
}

function handleLogout() {
  if (isRealFirebase) {
    auth.signOut().then(() => { window.location.href = "index.html"; });
  } else {
    currentUser = null;
    showToast("Berhasil keluar.");
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  }
}

// ============================================================
// ROUTING DISPATCHER
// ============================================================
function runPageSpecificInit() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  if (page === "" || page === "index.html") {
    initIndexPage();
  } else if (page === "login.html") {
    initLoginPage();
  } else if (page === "signup.html") {
    initSignupPage();
  } else if (page === "forgot-password.html") {
    initForgotPasswordPage();
  } else if (page === "dashboard.html") {
    initDashboardPage();
  } else if (page === "admin.html") {
    initAdminPage();
  }
}

// ============================================================
// INDEX PAGE & SEARCH ENGINE (REAL-TIME UPDATED)
// ============================================================
function initIndexPage() {
  loadLiveCounter();
  renderFeaturedCreators();
  loadTrendingPrompts();
  filterAndRenderPrompts();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", debounce((e) => {
      currentSearch = e.target.value.toLowerCase();
      visiblePromptsCount = 6;
      filterAndRenderPrompts();
    }, 300));
  }

  const tabs = document.querySelectorAll("#categoryTabs .tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.getAttribute("data-category");
      visiblePromptsCount = 6;
      filterAndRenderPrompts();
    });
  });

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      filterAndRenderPrompts();
    });
  }

  const filterSelect = document.getElementById("filterSelect");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      currentFilter = e.target.value;
      visiblePromptsCount = 6;
      filterAndRenderPrompts();
    });
  }

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      visiblePromptsCount += 6;
      filterAndRenderPrompts();
    };
  }

  const nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    nlForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value;
      if (isRealFirebase) {
        db.collection("newsletters").add({ email, subscribedAt: firebase.firestore.FieldValue.serverTimestamp(), status: "Aktif" })
          .then(() => { showToast("Terima kasih, Anda telah berlangganan newsletter."); nlForm.reset(); });
      } else {
        showToast("Terimakasih telah mendaftarkan email Anda.");
        nlForm.reset();
      }
    };
  }

  // Modals
  const modal = document.getElementById("promptModal");
  const modalClose = document.getElementById("modalCloseBtn");
  if (modalClose) {
    modalClose.onclick = () => modal.classList.remove("active");
  }

  const pubModal = document.getElementById("publicPromptModal");
  const pubModalClose = document.getElementById("publicPromptModalCloseBtn");
  if (pubModalClose) {
    pubModalClose.onclick = () => pubModal.classList.remove("active");
  }

  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
    if (e.target === pubModal) pubModal.classList.remove("active");
  };
}

function loadLiveCounter() {
  const counter = document.getElementById("liveCounter");
  if (!counter) return;
  const count = db_prompts.filter(p => p.isPublished).length;
  counter.innerText = `${count} prompt aktif tersedia saat ini`;
}

function renderFeaturedCreators() {
  const container = document.getElementById("creatorsContainer");
  if (!container) return;
  
  if (isRealFirebase) {
    db.collection("users").limit(3).get().then(snap => {
      let creators = [];
      snap.forEach(doc => { creators.push(doc.data()); });
      container.innerHTML = creators.map(u => `
        <div class="creator-card glass-card">
          <div class="creator-avatar">${getInitials(u.displayName)}</div>
          <h3 class="card-title">${u.displayName}</h3>
          <p class="card-desc">${(u.role || "MEMBER").toUpperCase()}</p>
          <div class="card-meta" style="justify-content:center; gap:20px;">
            <span>${u.promptCount || 0} Prompt</span>
            <span>${formatNumber(u.totalViews || 0)} Views</span>
          </div>
        </div>
      `).join("");
    });
  }
}

function loadTrendingPrompts() {
  const container = document.getElementById("trendingContainer");
  if (!container) return;
  const sorted = [...db_prompts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
  container.innerHTML = sorted.map(p => {
    const renderedImg = tempImageCache[p.id] || p.imageUrl;
    return `
      <div class="prompt-card trending-card" onclick="openModal('${p.id}')">
        <img src="${renderedImg}" loading="lazy" alt="${p.title}" onerror="handleImageError(this)">
        <div class="card-body">
          <span class="category-tag">${p.category}</span>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-meta">
            <span>Views: ${formatNumber(p.viewCount)}</span>
            <span>Salin: ${formatNumber(p.copyCount)}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function filterAndRenderPrompts() {
  const gallery = document.getElementById("promptGallery");
  if (!gallery) return;

  let filtered = db_prompts.filter(p => p.isPublished);

  if (activeCategory !== "Semua") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (currentSearch) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch) || p.tags.some(t => t.toLowerCase().includes(currentSearch)));
  }

  if (currentFilter === "Verified") {
    filtered = filtered.filter(p => p.isVerified);
  }

  if (currentSort === "Terbaru") {
    filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  } else if (currentSort === "Terpopuler") {
    filtered.sort((a, b) => b.viewCount - a.viewCount);
  } else if (currentSort === "Paling Banyak Disalin") {
    filtered.sort((a, b) => b.copyCount - a.copyCount);
  }

  const totalCount = filtered.length;
  const renderLimit = Math.min(visiblePromptsCount, totalCount);
  document.getElementById("resultsCount").innerText = `Menampilkan ${renderLimit} dari ${totalCount} prompt`;

  const shown = filtered.slice(0, renderLimit);
  if (shown.length === 0) {
    gallery.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Tidak ada prompt yang ditemukan.</div>`;
  } else {
    gallery.innerHTML = shown.map(p => {
      const renderedImg = tempImageCache[p.id] || p.imageUrl;
      return `
        <div class="prompt-card" onclick="openModal('${p.id}')">
          <img src="${renderedImg}" loading="lazy" alt="${p.title}" onerror="handleImageError(this)">
          <div class="card-body">
            <span class="category-tag">${p.category}</span>
            ${p.isVerified ? `<span class="verified-badge">Terverifikasi</span>` : ""}
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.description}</p>
            <div class="card-meta">
              <span>Views: ${formatNumber(p.viewCount)}</span>
              <span>Salin: ${formatNumber(p.copyCount)}</span>
            </div>
            <button class="btn-lihat">Lihat Prompt</button>
          </div>
        </div>
      `;
    }).join("");
  }

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (totalCount > renderLimit) {
    loadMoreBtn.classList.remove("hidden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }
}

function openModal(id) {
  const modal = document.getElementById("promptModal");
  if (!modal) return;
  const prompt = db_prompts.find(p => p.id === id);
  if (!prompt) return;

  // Naikkan jumlah tayangan secara realtime di Firestore
  if (isRealFirebase) {
    db.collection("prompts").doc(prompt.id).update({
      viewCount: firebase.firestore.FieldValue.increment(1)
    });
  }

  const renderedImg = tempImageCache[prompt.id] || prompt.imageUrl;
  document.getElementById("modalImage").src = renderedImg;
  document.getElementById("modalCategory").innerText = prompt.category;
  document.getElementById("modalTitle").innerText = prompt.title;
  document.getElementById("modalDesc").innerText = prompt.description;
  document.getElementById("modalPromptText").innerText = prompt.promptText;
  document.getElementById("modalCreatorAvatar").innerText = getInitials(prompt.creatorName);
  document.getElementById("modalCreatorName").innerText = prompt.creatorName;
  document.getElementById("modalUploadDate").innerText = `Diunggah pada ${prompt.uploadDate}`;
  document.getElementById("modalViews").innerText = `Dilihat: ${formatNumber(prompt.viewCount + 1)}`;
  document.getElementById("modalCopies").innerText = `Disalin: ${formatNumber(prompt.copyCount)}`;

  if (prompt.isVerified) {
    document.getElementById("modalVerified").classList.remove("hidden");
  } else {
    document.getElementById("modalVerified").classList.add("hidden");
  }

  // Integrasi Clipboard
  const btnSalin = document.getElementById("btnSalinPrompt");
  btnSalin.onclick = () => {
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      if (isRealFirebase) {
        db.collection("prompts").doc(prompt.id).update({
          copyCount: firebase.firestore.FieldValue.increment(1)
        });
      }
      btnSalin.innerText = "Disalin!";
      showToast("Teks prompt berhasil disalin.");
      setTimeout(() => { btnSalin.innerText = "Salin Prompt"; }, 2000);
    });
  };

  // Simpan Koleksi Firestore (Relasi Subcollection)
  const btnSimpan = document.getElementById("btnSimpanKoleksi");
  btnSimpan.onclick = () => {
    if (!currentUser) {
      showToast("Silakan masuk terlebih dahulu untuk menyimpan ke koleksi pribadi.", "danger");
      return;
    }
    if (isRealFirebase) {
      db.collection("users").doc(currentUser.uid).collection("saved").doc(prompt.id).set({
        savedAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        showToast("Ditambahkan ke koleksi Anda.");
      });
    }
  };

  modal.classList.add("active");
}

// ============================================================
// PUBLIC PROMPT ENTRY MODULE (KIRIM TANPA HARUS LOGIN)
// ============================================================
let publicUploadedImgFile = null;

function openPublicPromptModal() {
  const modal = document.getElementById("publicPromptModal");
  if (!modal) return;
  
  const creatorInput = document.getElementById("pubCreatorName");
  if (creatorInput) {
    if (currentUser) {
      creatorInput.value = currentUser.displayName;
      creatorInput.disabled = true;
    } else {
      creatorInput.value = "";
      creatorInput.disabled = false;
    }
  }
  
  modal.classList.add("active");
}

function previewPublicUploadImage(input) {
  const preview = document.getElementById("pubImgPreview");
  if (input.files && input.files[0]) {
    publicUploadedImgFile = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(publicUploadedImgFile);
  }
}

function handlePublicPromptSubmit(e) {
  e.preventDefault();
  const creatorName = document.getElementById("pubCreatorName").value || "Anonim";
  const title = document.getElementById("pubTitle").value;
  const category = document.getElementById("pubCategory").value;
  const description = document.getElementById("pubDesc").value;
  const promptText = document.getElementById("pubPromptText").value;
  const tagsStr = document.getElementById("pubTags").value;

  const btn = document.getElementById("pubSubmitBtn");
  setLoadingState(btn, true);

  if (!publicUploadedImgFile) {
    showToast("Unggah gambar visual ilustrasi wajib disertakan.", "danger");
    setLoadingState(btn, false);
    return;
  }

  // Unggah media nyata ke Firebase Storage
  uploadMediaToFirebase(publicUploadedImgFile, "prompts").then(imgUrl => {
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    const newDocId = "p_pub_" + Date.now();

    const dataPayload = {
      title,
      category,
      description,
      promptText,
      imageUrl: imgUrl, // Arah rujukan otomatis (Assets/img atau URL Firebase Storage)
      tags,
      creatorId: currentUser ? currentUser.uid : "guest",
      creatorName: creatorName,
      uploadDate: "24 Jun 2026",
      viewCount: 0,
      copyCount: 0,
      isPublished: true, // Langsung dapat dilihat oleh publik secara real-time
      isVerified: false,
      status: "Aktif"
    };

    if (isRealFirebase) {
      db.collection("prompts").doc(newDocId).set(dataPayload).then(() => {
        setLoadingState(btn, false);
        document.getElementById("publicPromptForm").reset();
        document.getElementById("pubImgPreview").classList.add("hidden");
        document.getElementById("publicPromptModal").classList.remove("active");
        showToast("Sukses menerbitkan prompt baru secara realtime!");
      });
    }
  });
}

// ============================================================
// LOGIN MODULE
// ============================================================
function initLoginPage() {
  const toggleBtn = document.getElementById("passwordToggleBtn");
  const passInput = document.getElementById("loginPassword");
  if (toggleBtn && passInput) {
    toggleBtn.onclick = () => {
      const type = passInput.getAttribute("type") === "password" ? "text" : "password";
      passInput.setAttribute("type", type);
    };
  }

  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("errorMessage");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const pass = passInput.value;
      
      const btn = document.getElementById("loginBtn");
      setLoadingState(btn, true);

      if (isRealFirebase) {
        auth.signInWithEmailAndPassword(email, pass).then(cred => {
          db.collection("users").doc(cred.user.uid).get().then(doc => {
            const role = doc.data().role;
            if (role === "admin") window.location.href = "admin.html";
            else window.location.href = "dashboard.html";
          });
        }).catch(err => {
          setLoadingState(btn, false);
          errorDiv.innerText = errorToIndonesian(err.code);
          errorDiv.classList.remove("hidden");
        });
      }
    };
  }
}

// ============================================================
// SIGNUP MODULE
// ============================================================
function initSignupPage() {
  const passInput = document.getElementById("signupPassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  if (passInput) {
    passInput.oninput = () => {
      const val = passInput.value;
      strengthBar.className = "strength-bar";
      if (val.length === 0) {
        strengthText.innerText = "Kekuatan Sandi";
      } else if (val.length < 6) {
        strengthBar.classList.add("weak");
        strengthText.innerText = "Lemah";
      } else if (val.length < 10) {
        strengthBar.classList.add("medium");
        strengthText.innerText = "Sedang";
      } else {
        strengthBar.classList.add("strong");
        strengthText.innerText = "Kuat";
      }
    };
  }

  const form = document.getElementById("signupForm");
  const errorDiv = document.getElementById("errorMessage");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const pass = passInput.value;
      const confirmPass = document.getElementById("signupConfirmPassword").value;

      if (pass !== confirmPass) {
        errorDiv.innerText = "Konfirmasi kata sandi tidak sesuai.";
        errorDiv.classList.remove("hidden");
        return;
      }

      const btn = document.getElementById("signupBtn");
      setLoadingState(btn, true);

      if (isRealFirebase) {
        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
          const uDoc = { displayName: name, email, role: "user", joinDate: "24 Jun 2026", promptCount: 0, totalViews: 0 };
          db.collection("users").doc(cred.user.uid).set(uDoc).then(() => {
            window.location.href = "dashboard.html";
          });
        }).catch(err => {
          setLoadingState(btn, false);
          errorDiv.innerText = errorToIndonesian(err.code);
          errorDiv.classList.remove("hidden");
        });
      }
    };
  }
}

// ============================================================
// FORGOT PASSWORD MODULE
// ============================================================
function initForgotPasswordPage() {
  const form = document.getElementById("forgotPasswordForm");
  const errorDiv = document.getElementById("errorMessage");
  const successCard = document.getElementById("successCard");

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("forgotEmail").value;
      const btn = document.getElementById("forgotBtn");
      setLoadingState(btn, true);

      if (isRealFirebase) {
        auth.sendPasswordResetEmail(email).then(() => {
          form.classList.add("hidden");
          successCard.classList.remove("hidden");
        }).catch(err => {
          setLoadingState(btn, false);
          errorDiv.innerText = errorToIndonesian(err.code);
          errorDiv.classList.remove("hidden");
        });
      }
    };
  }
}

// ============================================================
// MEMBER DASHBOARD MODULE (REAL-TIME LISTENER SYSTEM)
// ============================================================
let dashboardUploadedImgFile = null;

function initDashboardPage() {
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMessageText").innerText = `Selamat datang, ${currentUser.displayName}`;
  
  // Real-time listener untuk prompt buatan pribadi
  db.collection("prompts").where("creatorId", "==", currentUser.uid).onSnapshot(snapshot => {
    let myPrompts = [];
    snapshot.forEach(doc => { myPrompts.push({ id: doc.id, ...doc.data() }); });
    renderMyPromptsUI(myPrompts);
    updateDashboardMetrics(myPrompts);
    renderAnalytics(myPrompts);
  });

  // Real-time listener untuk prompt koleksi tersimpan
  db.collection("users").doc(currentUser.uid).collection("saved").onSnapshot(snapshot => {
    let savedIds = [];
    snapshot.forEach(doc => { savedIds.push(doc.id); });
    renderSavedPromptsUI(savedIds);
  });

  document.getElementById("settingsName").value = currentUser.displayName;
  document.getElementById("settingsBio").value = currentUser.bio || "";
  document.getElementById("settingsWebsite").value = currentUser.website || "";
}

function updateDashboardMetrics(myPrompts) {
  const totalViews = myPrompts.reduce((sum, p) => sum + p.viewCount, 0);
  const totalCopies = myPrompts.reduce((sum, p) => sum + p.copyCount, 0);
  const activeCount = myPrompts.filter(p => p.isPublished).length;

  document.getElementById("statTotalPrompts").innerText = myPrompts.length;
  document.getElementById("statTotalViews").innerText = formatNumber(totalViews);
  document.getElementById("statTotalCopies").innerText = formatNumber(totalCopies);
  document.getElementById("statActivePrompts").innerText = activeCount;
}

function renderMyPromptsUI(myPrompts) {
  const grid = document.getElementById("myPromptsGrid");
  if (!grid) return;

  if (myPrompts.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Belum ada prompt yang diunggah.</div>`;
  } else {
    grid.innerHTML = myPrompts.map(p => {
      const renderedImg = tempImageCache[p.id] || p.imageUrl;
      return `
        <div class="prompt-card">
          <img src="${renderedImg}" alt="${p.title}" onerror="handleImageError(this)">
          <div class="card-body">
            <span class="category-tag">${p.category}</span>
            <span class="status-badge" style="background: rgba(0,0,0,0.05); color: var(--color-text-muted);">${p.status}</span>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.description}</p>
            <div class="action-btn-group mt-3" style="width:100%; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <button class="btn-secondary" style="font-size:12px; padding:6px;" onclick="initEditPrompt('${p.id}')">Edit</button>
              <button class="btn-danger" style="font-size:12px; padding:6px;" onclick="deletePrompt('${p.id}')">Hapus</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
}

function renderSavedPromptsUI(savedIds) {
  const grid = document.getElementById("savedPromptsGrid");
  if (!grid) return;

  if (savedIds.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Belum ada koleksi tersimpan.</div>`;
    return;
  }

  db.collection("prompts").where(firebase.firestore.FieldPath.documentId(), "in", savedIds.slice(0, 10)).get().then(snap => {
    let list = [];
    snap.forEach(doc => { list.push({ id: doc.id, ...doc.data() }); });
    grid.innerHTML = list.map(p => {
      const renderedImg = tempImageCache[p.id] || p.imageUrl;
      return `
        <div class="prompt-card">
          <img src="${renderedImg}" alt="${p.title}" onerror="handleImageError(this)">
          <div class="card-body">
            <span class="category-tag">${p.category}</span>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.description}</p>
            <div class="action-btn-group mt-3" style="width:100%; display:grid; grid-template-columns:1.2fr 0.8fr; gap:8px;">
              <button class="btn-primary" style="font-size:12px; padding:6px;" onclick="openModal('${p.id}')">Lihat</button>
              <button class="btn-secondary" style="font-size:12px; padding:6px; color:var(--color-danger);" onclick="removeSavedPrompt('${p.id}')">Hapus</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  });
}

function removeSavedPrompt(id) {
  if (isRealFirebase && currentUser) {
    db.collection("users").doc(currentUser.uid).collection("saved").doc(id).delete()
      .then(() => showToast("Koleksi pribadi dilepaskan."));
  }
}

function previewUploadImage(input) {
  const preview = document.getElementById("uploadImgPreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  if (input.files && input.files[0]) {
    dashboardUploadedImgFile = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
      placeholder.classList.add("hidden");
    };
    reader.readAsDataURL(dashboardUploadedImgFile);
  }
}

function handlePromptSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("editPromptId").value;
  const title = document.getElementById("promptTitleInput").value;
  const category = document.getElementById("promptCategorySelect").value;
  const description = document.getElementById("promptDescInput").value;
  const promptText = document.getElementById("promptTextInput").value;
  const tagsStr = document.getElementById("promptTagsInput").value;
  const isPublished = document.getElementById("promptPublishCheckbox").checked;

  const btn = document.getElementById("btnSubmitPrompt");
  setLoadingState(btn, true);

  const processSubmission = (imageUrl) => {
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    const payload = {
      title,
      category,
      description,
      promptText,
      tags,
      isPublished,
      status: isPublished ? "Aktif" : "Tersembunyi",
      imageUrl: imageUrl
    };

    if (id) {
      db.collection("prompts").doc(id).update(payload).then(() => {
        showToast("Perubahan prompt berhasil diterapkan secara realtime.");
        finalizeSubmit(btn);
      });
    } else {
      const newId = "p_member_" + Date.now();
      const fullNewPayload = {
        ...payload,
        creatorId: currentUser.uid,
        creatorName: currentUser.displayName,
        uploadDate: "24 Jun 2026",
        viewCount: 0,
        copyCount: 0,
        isVerified: false
      };
      db.collection("prompts").doc(newId).set(fullNewPayload).then(() => {
        showToast("Prompt berhasil dipublikasikan secara nyata.");
        finalizeSubmit(btn);
      });
    }
  };

  if (dashboardUploadedImgFile) {
    uploadMediaToFirebase(dashboardUploadedImgFile, "prompts").then(imgUrl => {
      processSubmission(imgUrl);
    });
  } else {
    const existingPrompt = db_prompts.find(p => p.id === id);
    processSubmission(existingPrompt ? existingPrompt.imageUrl : "assets/img/default.jpg");
  }
}

function finalizeSubmit(btn) {
  setLoadingState(btn, false);
  document.getElementById("createPromptForm").reset();
  document.getElementById("uploadImgPreview").classList.add("hidden");
  document.getElementById("uploadPlaceholder").classList.remove("hidden");
  dashboardUploadedImgFile = null;
  switchDashboardTab("prompts");
}

function renderAnalytics(myPrompts) {
  const tableBody = document.getElementById("analyticsTableBody");
  const chart = document.getElementById("analyticsBarChart");
  
  if (!tableBody) return;

  if (myPrompts.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada data.</td></tr>`;
    chart.innerHTML = `<span style="color:var(--color-text-muted);">Diagram analitik akan muncul saat prompt diterbitkan.</span>`;
  } else {
    tableBody.innerHTML = myPrompts.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td>${p.category}</td>
        <td>${formatNumber(p.viewCount)}</td>
        <td>${formatNumber(p.copyCount)}</td>
        <td>${p.uploadDate}</td>
        <td><span class="status-badge" style="background: rgba(0,0,0,0.05); color:var(--color-text-muted);">${p.status}</span></td>
      </tr>
    `).join("");

    const topPrompts = [...myPrompts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
    const maxVal = Math.max(...topPrompts.map(p => p.viewCount), 1);

    chart.innerHTML = topPrompts.map(p => {
      const percentage = (p.viewCount / maxVal) * 100;
      return `
        <div class="chart-bar-item">
          <div class="bar-fill" style="height: ${percentage}%;"></div>
          <span class="bar-label" title="${p.title}">${p.title}</span>
        </div>
      `;
    }).join("");
  }
}

// ============================================================
// ADMIN PANEL ENGINE (REAL-TIME DATABASE MANAGEMENT)
// ============================================================
function initAdminPage() {
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "moderator")) {
    alert("Akses ditolak. Halaman dibatasi khusus Admin.");
    window.location.href = "index.html";
    return;
  }

  loadAdminStats();
  renderActivityFeed();
  renderAdminPrompts();
  renderAdminUsers();
  renderAdminSubscribers();
  loadSiteSettings();
}

function renderAdminPrompts() {
  const tbody = document.getElementById("adminPromptsTableBody");
  if (!tbody) return;

  tbody.innerHTML = db_prompts.map(p => {
    const renderedImg = tempImageCache[p.id] || p.imageUrl;
    return `
      <tr>
        <td><input type="checkbox" class="admin-prompt-select" value="${p.id}" onchange="checkBulkSelection()"></td>
        <td><img src="${renderedImg}" alt="${p.title}" style="width:50px; height:35px; object-fit:cover; border-radius:4px;" onerror="handleImageError(this)"></td>
        <td><strong>${p.title}</strong></td>
        <td>${p.category}</td>
        <td>${p.creatorName}</td>
        <td>${p.uploadDate}</td>
        <td><span class="status-badge active">${p.status}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action success" onclick="adminVerifyPrompt('${p.id}')">Verifikasi</button>
            <button class="btn-table-action danger" onclick="adminDeletePrompt('${p.id}')">Hapus</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function adminVerifyPrompt(id) {
  if (isRealFirebase) {
    db.collection("prompts").doc(id).update({ isVerified: true })
      .then(() => showToast("Prompt berhasil diverifikasi secara realtime."));
  }
}

function adminDeletePrompt(id) {
  showConfirmDialog("Hapus Permanen?", "Tindakan ini akan menghapus data di database awan secara permanen.", () => {
    if (isRealFirebase) {
      db.collection("prompts").doc(id).delete()
        .then(() => showToast("Sukses menghapus data dari server."));
    }
  });
}

function renderAdminUsers() {
  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  db.collection("users").onSnapshot(snapshot => {
    let users = [];
    snapshot.forEach(doc => { users.push({ uid: doc.id, ...doc.data() }); });
    tbody.innerHTML = users.map(u => `
      <tr>
        <td><strong>${u.displayName}</strong></td>
        <td>${u.email}</td>
        <td>${(u.role || "user").toUpperCase()}</td>
        <td>${u.joinDate || "N/A"}</td>
        <td>${u.promptCount || 0}</td>
        <td><span class="status-badge active">Aktif</span></td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" onclick="showToast('Fitur suspend siap dikonfigurasikan.')">Suspend</button>
          </div>
        </td>
      </tr>
    `).join("");
  });
}

function renderAdminSubscribers() {
  const tbody = document.getElementById("adminNewsletterTableBody");
  if (!tbody) return;

  db.collection("newsletters").onSnapshot(snapshot => {
    let list = [];
    snapshot.forEach(doc => { list.push({ id: doc.id, ...doc.data() }); });
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--color-text-muted);">Tidak ada pelanggan terdaftar.</td></tr>`;
    } else {
      tbody.innerHTML = list.map(s => `
        <tr>
          <td>${s.email}</td>
          <td>24 Jun 2026</td>
          <td><span class="status-badge active">${s.status || "Aktif"}</span></td>
          <td>
            <button class="btn-table-action danger" onclick="deleteSubscriber('${s.id}')">Hapus</button>
          </td>
        </tr>
      `).join("");
    }
  });
}

function deleteSubscriber(id) {
  if (isRealFirebase) {
    db.collection("newsletters").doc(id).delete().then(() => showToast("Berhasil menghapus langganan."));
  }
}

function loadSiteSettings() {
  if (!isRealFirebase) return;
  db.collection("siteSettings").doc("main").onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("siteName").value = data.siteName || "";
      document.getElementById("contactEmail").value = data.contactEmail || "";
      document.getElementById("siteDesc").value = data.siteDesc || "";
      document.getElementById("welcomeMsg").value = data.welcomeMsg || "";
      document.getElementById("maxImgSize").value = data.maxImgSize || 2048;
      document.getElementById("maintenanceMode").checked = data.maintenanceMode || false;
      document.getElementById("registrationOpen").checked = data.registrationOpen || false;
      document.getElementById("moderationEnabled").checked = data.moderationEnabled || false;
    }
  });
}

// ============================================================
// MOBILE NAVBAR NAVIGATION TOGGLE & SCROLL DETECTOR
// ============================================================
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");
if (toggle && menu) {
  toggle.onclick = () => { menu.classList.toggle("active"); };
}

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNavbar");
  if (navbar) {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
});
