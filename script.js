
// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAeaIWRMFWAaMZ7uDwBynhoG5ToSGwTb2s",
  authDomain: "bagiprompt-b68ba.firebaseapp.com",
  projectId: "bagiprompt-b68ba",
  storageBucket: "bagiprompt-b68ba.firebasestorage.app",
  messagingSenderId: "905297020074",
  appId: "1:905297020074:web:74296ed233f4120a857cd3",
  measurementId: "G-WFB5YNRJ3M"
};

// --- DATA SAMPLE MANDATORI ---
const SAMPLE_PROMPTS = [
  {
    id: "p1",
    title: "Kota Futuristik Malam Hari",
    category: "Midjourney",
    description: "Prompt untuk menghasilkan visual kota cyberpunk dengan pencahayaan neon dramatis.",
    promptText: "Cyberpunk Tokyo street at night, neon glowing signs, rain reflection on asphalt, flying futuristic cars, high detail, volumetric lighting, unreal engine 5 render, cinematic composition, 8k resolution --ar 16:9 --style raw --v 6.0",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Midjourney+Cyberpunk",
    tags: ["cyberpunk", "neon", "tokyo", "scifi"],
    creatorId: "u1",
    creatorName: "Ahmad Dani",
    uploadDate: "12 Jan 2026",
    viewCount: 1200,
    copyCount: 340,
    isPublished: true,
    isVerified: true,
    status: "Aktif"
  },
  {
    id: "p2",
    title: "Logo Startup Teknologi Minimalis",
    category: "DALL-E",
    description: "Pembuatan aset logo korporat bertema kecerdasan buatan berbentuk sirkuit otak.",
    promptText: "A minimal modern vector logo for an artificial intelligence startup, clean lines, geometric shape resembling both a brain and a circuit board, vibrant indigo accent on pure white background, corporate design style, flat vector, Behance portfolio showcase",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=DALL-E+Logo",
    tags: ["logo", "minimalist", "startup", "circuit"],
    creatorId: "u2",
    creatorName: "Siti Rahma",
    uploadDate: "15 Jan 2026",
    viewCount: 890,
    copyCount: 156,
    isPublished: true,
    isVerified: true,
    status: "Aktif"
  },
  {
    id: "p3",
    title: "Deskripsi Produk Jam Tangan Mewah",
    category: "ChatGPT",
    description: "Kerangka salinan iklan jam tangan titanium mewah untuk target pasar eksekutif.",
    promptText: "Tuliskan deskripsi produk yang elegan dan persuasif untuk jam tangan mewah pria bernama 'Aethelgard Chronograph'. Target audiens adalah eksekutif muda sukses. Fokus pada detail pengerjaan tangan, material titanium, daya tahan air, dan prestise yang dihadirkannya. Gunakan gaya bahasa profesional, mewah, namun tetap modern.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=ChatGPT+Copywriting",
    tags: ["copywriting", "luxury", "watch", "persuasive"],
    creatorId: "u3",
    creatorName: "Budi Santoso",
    uploadDate: "18 Jan 2026",
    viewCount: 450,
    copyCount: 112,
    isPublished: true,
    isVerified: false,
    status: "Aktif"
  },
  {
    id: "p4",
    title: "Potret Fantasi Karakter Elf",
    category: "Stable Diffusion",
    description: "Menghasilkan potret fantasi detail tinggi dengan gaun zirah keemasan.",
    promptText: "Ethereal female elf portrait, silver hair braided with glowing leaves, deep emerald eyes, soft dynamic natural lighting, photorealistic skin texture, highly detailed armor with gold filigree, cinematic depth of field, artstation trending, masterpiece, 8k",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Stable+Diffusion+Elf",
    tags: ["fantasy", "elf", "portrait", "realism"],
    creatorId: "u1",
    creatorName: "Ahmad Dani",
    uploadDate: "20 Jan 2026",
    viewCount: 2100,
    copyCount: 520,
    isPublished: true,
    isVerified: true,
    status: "Aktif"
  },
  {
    id: "p5",
    title: "Iklan Media Sosial Produk Kecantikan",
    category: "Copywriting",
    description: "Instruksi draf Carousel Instagram peluncuran produk serum pelembab wajah organik.",
    promptText: "Buat draf naskah iklan Instagram Carousel sebanyak 4 slide untuk produk serum pelembab wajah organik baru bernama 'PureGlow'. Slide 1: Hook memikat tentang kulit kusam. Slide 2: Edukasi bahan aktif alami. Slide 3: Testimoni/Hasil nyata 14 hari. Slide 4: Call to action penawaran diskon rilis perdana.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Instagram+Ad+Prompt",
    tags: ["instagram", "marketing", "skincare", "carousel"],
    creatorId: "u2",
    creatorName: "Siti Rahma",
    uploadDate: "22 Jan 2026",
    viewCount: 720,
    copyCount: 198,
    isPublished: true,
    isVerified: false,
    status: "Aktif"
  },
  {
    id: "p6",
    title: "Generator Password Aman dengan JavaScript",
    category: "Code",
    description: "Fungsi enkripsi generator sandi kustom dengan proteksi API kriptografi.",
    promptText: "Tulis fungsi JavaScript yang aman untuk membuat password acak dengan panjang tertentu. Fungsi harus menerima parameter panjang password serta opsi untuk menyertakan huruf besar, huruf kecil, angka, dan karakter spesial. Sertakan komentar penjelas yang mendalam tentang keamanan enkripsi Math.random versus crypto.getRandomValues.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=JS+Security+Code",
    tags: ["javascript", "security", "utility", "encryption"],
    creatorId: "u3",
    creatorName: "Budi Santoso",
    uploadDate: "25 Jan 2026",
    viewCount: 1150,
    copyCount: 410,
    isPublished: true,
    isVerified: true,
    status: "Aktif"
  },
  {
    id: "p7",
    title: "UI Kit Dashboard Analitik Modern",
    category: "Design",
    description: "Instruksi visualisasi antarmuka aplikasi pemantauan transaksi berbasis awan.",
    promptText: "Generate a prompt for a modern SaaS analytics dashboard interface UI design on Figma. Clean layout, dark violet accents, frosted glass metrics cards, smooth linear area charts, side navigation panel with active states, clear typography hierarchy, white space, light theme design trends 2026.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Figma+UI+Design",
    tags: ["figma", "dashboard", "uxui", "saas"],
    creatorId: "u1",
    creatorName: "Ahmad Dani",
    uploadDate: "27 Jan 2026",
    viewCount: 1300,
    copyCount: 290,
    isPublished: true,
    isVerified: false,
    status: "Aktif"
  },
  {
    id: "p8",
    title: "Skrip Cinematic Intro Brand",
    category: "Video",
    description: "Format skrip visualisasi berdurasi singkat untuk perkenalan produk kopi lokal.",
    promptText: "Tulis naskah video berdurasi 30 detik untuk intro cinematic sebuah brand kopi lokal premium 'Kopi Swarga'. Naskah harus memuat petunjuk visual (scene by scene), arahan musik/sound effects (SFX), dan naskah voice over (VO) yang menceritakan tentang perjalanan biji kopi dari perkebunan pegunungan hingga cangkir konsumen.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Cinematic+Script",
    tags: ["cinematic", "storytelling", "coffee", "commercial"],
    creatorId: "u2",
    creatorName: "Siti Rahma",
    uploadDate: "28 Jan 2026",
    viewCount: 480,
    copyCount: 95,
    isPublished: true,
    isVerified: false,
    status: "Aktif"
  },
  {
    id: "p9",
    title: "Email Kampanye Peluncuran Produk Baru",
    category: "Marketing",
    description: "Draf surat penjualan B2B dingin berkonversi tinggi menyasar direktur operasional.",
    promptText: "Buat email marketing dingin (cold email campaign) yang ditujukan kepada manajer operasional untuk menawarkan software otomatisasi alur kerja SaaS. Email harus memiliki baris subjek dengan open-rate tinggi, struktur paragraf yang singkat, menyertakan poin rasa sakit (pain points), bukti sosial singkat, dan ajakan bertindak (CTA) untuk demo 15 menit.",
    imageUrl: "https://placehold.co/600x400/e0e7ff/4F46E5?text=Cold+Email+Campaign",
    tags: ["email", "outreach", "b2b", "sales"],
    creatorId: "u3",
    creatorName: "Budi Santoso",
    uploadDate: "29 Jan 2026",
    viewCount: 610,
    copyCount: 145,
    isPublished: true,
    isVerified: true,
    status: "Aktif"
  }
];

// --- FALLBACK PERSISTENCE ENGINE (LOCAL STORAGE) ---
const storageKeyPrefix = "bagiprompt_";
function getStoredData(key, fallback) {
  const item = localStorage.getItem(storageKeyPrefix + key);
  return item ? JSON.parse(item) : fallback;
}
function setStoredData(key, data) {
  localStorage.setItem(storageKeyPrefix + key, JSON.stringify(data));
}

// Inisialisasi basis data mock
let db_prompts = getStoredData("prompts", SAMPLE_PROMPTS);
let db_users = getStoredData("users", [
  { uid: "u1", displayName: "Ahmad Dani", email: "dani@bagiprompt.id", role: "admin", joinDate: "10 Jan 2026", promptCount: 3, totalViews: 4600 },
  { uid: "u2", displayName: "Siti Rahma", email: "siti@bagiprompt.id", role: "moderator", joinDate: "11 Jan 2026", promptCount: 3, totalViews: 2090 },
  { uid: "u3", displayName: "Budi Santoso", email: "budi@bagiprompt.id", role: "user", joinDate: "12 Jan 2026", promptCount: 3, totalViews: 2210 }
]);
let db_newsletter = getStoredData("newsletter", []);
let db_saved = getStoredData("saved_prompts", {});
let db_reports = getStoredData("reports", []);
let db_settings = getStoredData("settings", {
  siteName: "bagiprompt.id",
  contactEmail: "hubungi@bagiprompt.id",
  siteDesc: "Koleksi Prompt AI Berkualitas Tinggi",
  welcomeMsg: "Temukan dan gunakan prompt terbaik untuk proyek kreatifmu",
  maxImgSize: 2048,
  maintenanceMode: false,
  registrationOpen: true,
  moderationEnabled: false
});

// ============================================================
// FIREBASE ENGINE AND STATE INITIALIZATION
// ============================================================
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
    console.warn("Kesalahan inisialisasi Firebase. Beralih otomatis ke Engine Simulasi LocalStorage.", e);
  }
}

// State Aplikasi
let currentUser = getStoredData("session", null);
let activeCategory = "Semua";
let currentSearch = "";
let currentFilter = "Semua";
let currentSort = "Terbaru";
let visiblePromptsCount = 6;

// ============================================================
// UTILITIES
// ============================================================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.className = "toast-notification show";
  if (type === "danger") {
    toast.style.background = "var(--color-danger)";
  } else {
    toast.style.background = "var(--color-accent)";
  }
  setTimeout(() => {
    toast.className = "toast-notification";
  }, 3000);
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
  yes.onclick = () => {
    onConfirm();
    close();
  };
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

function errorToIndonesian(code) {
  switch (code) {
    case "auth/invalid-email": return "Format alamat email tidak valid.";
    case "auth/user-disabled": return "Akun ini telah dinonaktifkan.";
    case "auth/user-not-found": return "Akun dengan email ini tidak ditemukan.";
    case "auth/wrong-password": return "Kata sandi salah.";
    case "auth/email-already-in-use": return "Alamat email ini sudah terdaftar.";
    case "auth/weak-password": return "Kata sandi minimal berisi 6 karakter.";
    default: return "Terjadi kesalahan sistem. Silakan coba kembali.";
  }
}

// ============================================================
// CORE AUTH LOGIC
// ============================================================
if (isRealFirebase) {
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(doc => {
        if (doc.exists) {
          currentUser = { uid: user.uid, ...doc.data() };
        } else {
          currentUser = { uid: user.uid, displayName: user.displayName || "Pengguna", email: user.email, role: "user" };
        }
        setStoredData("session", currentUser);
        updateNavCta();
        runPageSpecificInit();
      });
    } else {
      currentUser = null;
      setStoredData("session", null);
      updateNavCta();
      runPageSpecificInit();
    }
  });
} else {
  // Jalankan inisialisasi tanpa Firebase
  document.addEventListener("DOMContentLoaded", () => {
    updateNavCta();
    runPageSpecificInit();
  });
}

function updateNavCta() {
  const area = document.getElementById("navCtaArea");
  if (!area) return;
  if (currentUser) {
    let dashboardLink = "dashboard.html";
    if (currentUser.role === "admin" || currentUser.role === "moderator") {
      dashboardLink = "admin.html";
    }
    area.innerHTML = `
      <a href="${dashboardLink}" class="btn-secondary btn-nav">Panel Kontrol</a>
      <button onclick="handleLogout()" class="btn-primary btn-nav">Keluar</button>
    `;
    const badge = document.getElementById("navUserBadge");
    if (badge) {
      document.getElementById("userInitials").innerText = getInitials(currentUser.displayName);
      document.getElementById("dropdownUserName").innerText = currentUser.displayName;
      document.getElementById("dropdownUserEmail").innerText = currentUser.email;
    }
  } else {
    area.innerHTML = `<a href="login.html" class="btn-primary btn-nav">Masuk</a>`;
  }
}

function handleLogout() {
  if (isRealFirebase) {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  } else {
    currentUser = null;
    setStoredData("session", null);
    showToast("Berhasil keluar.");
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  }
}

// ============================================================
// ROUTER & INITIALIZERS
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
// INDEX PAGE MODULE
// ============================================================
function initIndexPage() {
  loadLiveCounter();
  renderFeaturedCreators();
  loadTrendingPrompts();
  filterAndRenderPrompts();

  // Pencarian dengan Debounce
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", debounce((e) => {
      currentSearch = e.target.value.toLowerCase();
      visiblePromptsCount = 6;
      filterAndRenderPrompts();
    }, 300));
  }

  // Kategori
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

  // Urutan & Tipe Filter
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

  // Muat Lebih Banyak
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      visiblePromptsCount += 6;
      filterAndRenderPrompts();
    };
  }

  // Formulir Hubungi Kami / Newsletter
  const nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    nlForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value;
      if (isRealFirebase) {
        db.collection("newsletters").add({ email, subscribedAt: new Date(), status: "Aktif" });
      } else {
        db_newsletter.push({ email, subscribedAt: "2026-06-24", status: "Aktif" });
        setStoredData("newsletter", db_newsletter);
      }
      showToast("Berhasil terdaftar ke newsletter.");
      nlForm.reset();
    };
  }

  // Modal Setup
  const modal = document.getElementById("promptModal");
  const modalClose = document.getElementById("modalCloseBtn");
  if (modalClose) {
    modalClose.onclick = () => modal.classList.remove("active");
  }
  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
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
  container.innerHTML = db_users.slice(0, 3).map(u => `
    <div class="creator-card glass-card">
      <div class="creator-avatar">${getInitials(u.displayName)}</div>
      <h3 class="card-title">${u.displayName}</h3>
      <p class="card-desc">${u.role.toUpperCase()}</p>
      <div class="card-meta" style="justify-content:center; gap:20px;">
        <span>${u.promptCount} Prompt</span>
        <span>${formatNumber(u.totalViews)} Views</span>
      </div>
    </div>
  `).join("");
}

function loadTrendingPrompts() {
  const container = document.getElementById("trendingContainer");
  if (!container) return;
  const sorted = [...db_prompts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
  container.innerHTML = sorted.map(p => `
    <div class="prompt-card trending-card" onclick="openModal('${p.id}')">
      <img src="${p.imageUrl}" loading="lazy" alt="${p.title}">
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
  `).join("");
}

function filterAndRenderPrompts() {
  const gallery = document.getElementById("promptGallery");
  if (!gallery) return;

  let filtered = db_prompts.filter(p => p.isPublished);

  // Filter Kategori
  if (activeCategory !== "Semua") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Filter Pencarian
  if (currentSearch) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch) || p.tags.some(t => t.toLowerCase().includes(currentSearch)));
  }

  // Filter Tipe Select
  if (currentFilter === "Verified") {
    filtered = filtered.filter(p => p.isVerified);
  }

  // Sorting
  if (currentSort === "Terbaru") {
    filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  } else if (currentSort === "Terpopuler") {
    filtered.sort((a, b) => b.viewCount - a.viewCount);
  } else if (currentSort === "Paling Banyak Disalin") {
    filtered.sort((a, b) => b.copyCount - a.copyCount);
  }

  // Render Counts
  const totalCount = filtered.length;
  const renderLimit = Math.min(visiblePromptsCount, totalCount);
  document.getElementById("resultsCount").innerText = `Menampilkan ${renderLimit} dari ${totalCount} prompt`;

  const shown = filtered.slice(0, renderLimit);
  if (shown.length === 0) {
    gallery.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Tidak ada prompt yang cocok dengan pencarian Anda.</div>`;
  } else {
    gallery.innerHTML = shown.map(p => `
      <div class="prompt-card" onclick="openModal('${p.id}')">
        <img src="${p.imageUrl}" loading="lazy" alt="${p.title}">
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
    `).join("");
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

  // Naikkan jumlah tayangan
  prompt.viewCount++;
  setStoredData("prompts", db_prompts);

  document.getElementById("modalImage").src = prompt.imageUrl;
  document.getElementById("modalCategory").innerText = prompt.category;
  document.getElementById("modalTitle").innerText = prompt.title;
  document.getElementById("modalDesc").innerText = prompt.description;
  document.getElementById("modalPromptText").innerText = prompt.promptText;
  document.getElementById("modalCreatorAvatar").innerText = getInitials(prompt.creatorName);
  document.getElementById("modalCreatorName").innerText = prompt.creatorName;
  document.getElementById("modalUploadDate").innerText = `Diunggah pada ${prompt.uploadDate}`;
  document.getElementById("modalViews").innerText = `Dilihat: ${formatNumber(prompt.viewCount)}`;
  document.getElementById("modalCopies").innerText = `Disalin: ${formatNumber(prompt.copyCount)}`;

  if (prompt.isVerified) {
    document.getElementById("modalVerified").classList.remove("hidden");
  } else {
    document.getElementById("modalVerified").classList.add("hidden");
  }

  // Aksi Salin
  const btnSalin = document.getElementById("btnSalinPrompt");
  btnSalin.onclick = () => {
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      prompt.copyCount++;
      setStoredData("prompts", db_prompts);
      document.getElementById("modalCopies").innerText = `Disalin: ${formatNumber(prompt.copyCount)}`;
      btnSalin.innerText = "Disalin!";
      showToast("Teks prompt berhasil disalin.");
      setTimeout(() => { btnSalin.innerText = "Salin Prompt"; }, 2000);
    });
  };

  // Simpan Koleksi
  const btnSimpan = document.getElementById("btnSimpanKoleksi");
  btnSimpan.onclick = () => {
    if (!currentUser) {
      showToast("Silakan masuk untuk menyimpan koleksi.", "danger");
      return;
    }
    let saved = db_saved[currentUser.uid] || [];
    if (!saved.includes(prompt.id)) {
      saved.push(prompt.id);
      db_saved[currentUser.uid] = saved;
      setStoredData("saved_prompts", db_saved);
      showToast("Prompt berhasil disimpan ke koleksi.");
    } else {
      showToast("Prompt sudah ada di koleksi Anda.");
    }
  };

  // Share Buttons
  document.getElementById("shareCopyLink").onclick = () => {
    navigator.clipboard.writeText(window.location.origin + "/index.html?prompt=" + prompt.id);
    showToast("Tautan tersalin ke papan klip.");
  };
  document.getElementById("shareTwitter").onclick = () => {
    window.open(`https://twitter.com/intent/tweet?text=Temukan prompt AI berkualitas "${prompt.title}" di bagiprompt.id!`);
  };
  document.getElementById("shareWA").onclick = () => {
    window.open(`https://api.whatsapp.com/send?text=Temukan prompt AI berkualitas "${prompt.title}" di bagiprompt.id!`);
  };

  // Render Prompt Terkait
  const related = db_prompts.filter(p => p.category === prompt.category && p.id !== prompt.id).slice(0, 3);
  const relatedGrid = document.getElementById("relatedPromptsGrid");
  if (related.length === 0) {
    relatedGrid.innerHTML = `<div style="grid-column: 1/-1; font-size:12px; color:var(--color-text-muted);">Tidak ada prompt terkait lainnya.</div>`;
  } else {
    relatedGrid.innerHTML = related.map(p => `
      <div class="prompt-card" onclick="openModal('${p.id}')">
        <img src="${p.imageUrl}" alt="${p.title}">
        <div class="card-body" style="padding: 10px;">
          <h4 class="card-title" style="font-size:12px; margin: 4px 0;">${p.title}</h4>
        </div>
      </div>
    `).join("");
  }

  modal.classList.add("active");
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
      } else {
        setTimeout(() => {
          const user = db_users.find(u => u.email === email);
          if (user && pass.length >= 6) { // Simulasi login
            currentUser = user;
            setStoredData("session", currentUser);
            showToast("Berhasil masuk.");
            if (currentUser.role === "admin") {
              window.location.href = "admin.html";
            } else {
              window.location.href = "dashboard.html";
            }
          } else {
            setLoadingState(btn, false);
            errorDiv.innerText = "Email atau kata sandi tidak valid (Gunakan email demo seperti dani@bagiprompt.id & sandi min. 6 karakter).";
            errorDiv.classList.remove("hidden");
          }
        }, 800);
      }
    };
  }
}

function setLoadingState(button, isLoading) {
  if (!button) return;
  const text = button.querySelector(".btn-text");
  const spinner = button.querySelector(".btn-spinner");
  if (isLoading) {
    text.classList.add("hidden");
    spinner.classList.remove("hidden");
    button.disabled = true;
  } else {
    text.classList.remove("hidden");
    spinner.classList.add("hidden");
    button.disabled = false;
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
          const uDoc = { displayName: name, email, role: "user", joinDate: "2026-06-24", promptCount: 0, totalViews: 0 };
          db.collection("users").doc(cred.user.uid).set(uDoc).then(() => {
            window.location.href = "dashboard.html";
          });
        }).catch(err => {
          setLoadingState(btn, false);
          errorDiv.innerText = errorToIndonesian(err.code);
          errorDiv.classList.remove("hidden");
        });
      } else {
        setTimeout(() => {
          const exists = db_users.some(u => u.email === email);
          if (exists) {
            setLoadingState(btn, false);
            errorDiv.innerText = "Email sudah digunakan.";
            errorDiv.classList.remove("hidden");
          } else {
            const newUser = { uid: "u_" + Date.now(), displayName: name, email, role: "user", joinDate: "24 Jun 2026", promptCount: 0, totalViews: 0 };
            db_users.push(newUser);
            setStoredData("users", db_users);
            currentUser = newUser;
            setStoredData("session", currentUser);
            showToast("Pendaftaran sukses!");
            window.location.href = "dashboard.html";
          }
        }, 1000);
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
      } else {
        setTimeout(() => {
          form.classList.add("hidden");
          successCard.classList.remove("hidden");
        }, 800);
      }
    };
  }
}

// ============================================================
// DASHBOARD MODULE
// ============================================================
function initDashboardPage() {
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMessageText").innerText = `Selamat datang, ${currentUser.displayName}`;
  loadDashboardMetrics();
  loadMyPrompts();
  loadSavedPrompts();
  loadAnalytics();

  // Pre-fill profile settings
  document.getElementById("settingsName").value = currentUser.displayName;
  document.getElementById("settingsBio").value = currentUser.bio || "";
  document.getElementById("settingsWebsite").value = currentUser.website || "";
}

function switchDashboardTab(tab) {
  const tabs = document.querySelectorAll(".dash-tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  
  const targetBtn = Array.from(tabs).find(t => t.innerText.toLowerCase().includes(tab === "prompts" ? "prompt ku" : tab === "saved" ? "koleksi tersimpan" : tab === "create" ? "buat prompt baru" : tab === "analytics" ? "analitik" : "pengaturan"));
  if (targetBtn) targetBtn.classList.add("active");

  const panels = document.querySelectorAll(".tab-panel");
  panels.forEach(p => p.classList.remove("active"));

  if (tab === "prompts") document.getElementById("tabPanelPrompts").classList.add("active");
  else if (tab === "saved") document.getElementById("tabPanelSaved").classList.add("active");
  else if (tab === "create") document.getElementById("tabPanelCreate").classList.add("active");
  else if (tab === "analytics") document.getElementById("tabPanelAnalytics").classList.add("active");
  else if (tab === "settings") document.getElementById("tabPanelSettings").classList.add("active");
}

function loadDashboardMetrics() {
  const myPrompts = db_prompts.filter(p => p.creatorId === currentUser.uid);
  const totalViews = myPrompts.reduce((sum, p) => sum + p.viewCount, 0);
  const totalCopies = myPrompts.reduce((sum, p) => sum + p.copyCount, 0);
  const activeCount = myPrompts.filter(p => p.isPublished).length;

  document.getElementById("statTotalPrompts").innerText = myPrompts.length;
  document.getElementById("statTotalViews").innerText = formatNumber(totalViews);
  document.getElementById("statTotalCopies").innerText = formatNumber(totalCopies);
  document.getElementById("statActivePrompts").innerText = activeCount;
}

function loadMyPrompts() {
  const grid = document.getElementById("myPromptsGrid");
  if (!grid) return;
  const myPrompts = db_prompts.filter(p => p.creatorId === currentUser.uid);

  if (myPrompts.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Belum ada prompt yang diunggah. Mulai buat sekarang!</div>`;
  } else {
    grid.innerHTML = myPrompts.map(p => `
      <div class="prompt-card">
        <img src="${p.imageUrl}" alt="${p.title}">
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
    `).join("");
  }
}

function loadSavedPrompts() {
  const grid = document.getElementById("savedPromptsGrid");
  if (!grid) return;
  const savedIds = db_saved[currentUser.uid] || [];
  const savedList = db_prompts.filter(p => savedIds.includes(p.id));

  if (savedList.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">Belum ada koleksi tersimpan.</div>`;
  } else {
    grid.innerHTML = savedList.map(p => `
      <div class="prompt-card">
        <img src="${p.imageUrl}" alt="${p.title}">
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
    `).join("");
  }
}

function removeSavedPrompt(id) {
  let saved = db_saved[currentUser.uid] || [];
  saved = saved.filter(item => item !== id);
  db_saved[currentUser.uid] = saved;
  setStoredData("saved_prompts", db_saved);
  showToast("Prompt dihapus dari koleksi.");
  loadSavedPrompts();
}

// Penanganan Gambar Pratonton
function previewUploadImage(input) {
  const preview = document.getElementById("uploadImgPreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
      placeholder.classList.add("hidden");
    };
    reader.readAsDataURL(input.files[0]);
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
  const previewImg = document.getElementById("uploadImgPreview").src;

  const btn = document.getElementById("btnSubmitPrompt");
  setLoadingState(btn, true);

  setTimeout(() => {
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    const resolvedImage = previewImg || "https://placehold.co/600x400/e0e7ff/4F46E5?text=Prompt+Image";

    if (id) {
      // Mode Edit
      const index = db_prompts.findIndex(p => p.id === id);
      if (index !== -1) {
        db_prompts[index] = { ...db_prompts[index], title, category, description, promptText, tags, isPublished, imageUrl: resolvedImage };
      }
      showToast("Prompt berhasil diperbarui.");
    } else {
      // Mode Baru
      const newPrompt = {
        id: "p_" + Date.now(),
        title,
        category,
        description,
        promptText,
        imageUrl: resolvedImage,
        tags,
        creatorId: currentUser.uid,
        creatorName: currentUser.displayName,
        uploadDate: "24 Jun 2026",
        viewCount: 0,
        copyCount: 0,
        isPublished,
        isVerified: false,
        status: isPublished ? "Aktif" : "Tersembunyi"
      };
      db_prompts.push(newPrompt);
      // Update Creator Count
      const userIndex = db_users.findIndex(u => u.uid === currentUser.uid);
      if (userIndex !== -1) db_users[userIndex].promptCount++;
      setStoredData("users", db_users);
    }

    setStoredData("prompts", db_prompts);
    setLoadingState(btn, false);
    document.getElementById("createPromptForm").reset();
    document.getElementById("uploadImgPreview").classList.add("hidden");
    document.getElementById("uploadPlaceholder").classList.remove("hidden");
    
    switchDashboardTab("prompts");
    loadMyPrompts();
    loadDashboardMetrics();
  }, 1000);
}

function initEditPrompt(id) {
  const prompt = db_prompts.find(p => p.id === id);
  if (!prompt) return;

  document.getElementById("formPromptTitleHeader").innerText = "Edit Prompt";
  document.getElementById("editPromptId").value = prompt.id;
  document.getElementById("promptTitleInput").value = prompt.title;
  document.getElementById("promptCategorySelect").value = prompt.category;
  document.getElementById("promptDescInput").value = prompt.description;
  document.getElementById("promptTextInput").value = prompt.promptText;
  document.getElementById("promptTagsInput").value = prompt.tags.join(", ");
  document.getElementById("promptPublishCheckbox").checked = prompt.isPublished;

  const preview = document.getElementById("uploadImgPreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  preview.src = prompt.imageUrl;
  preview.classList.remove("hidden");
  placeholder.classList.add("hidden");

  switchDashboardTab("create");
}

function deletePrompt(id) {
  showConfirmDialog("Hapus Prompt?", "Tindakan ini bersifat permanen dan tidak dapat dibatalkan.", () => {
    db_prompts = db_prompts.filter(p => p.id !== id);
    setStoredData("prompts", db_prompts);
    showToast("Prompt berhasil dihapus.");
    loadMyPrompts();
    loadDashboardMetrics();
  });
}

function loadAnalytics() {
  const myPrompts = db_prompts.filter(p => p.creatorId === currentUser.uid);
  const tableBody = document.getElementById("analyticsTableBody");
  const chart = document.getElementById("analyticsBarChart");
  
  if (!tableBody) return;

  if (myPrompts.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada data analitik.</td></tr>`;
    chart.innerHTML = `<span style="color:var(--color-text-muted);">Mulai buat prompt untuk menyajikan diagram visual analitik.</span>`;
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

    // Render Pure CSS Bar Chart (Top 5 views)
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

function handleProfileUpdate(e) {
  e.preventDefault();
  const name = document.getElementById("settingsName").value;
  const bio = document.getElementById("settingsBio").value;
  const website = document.getElementById("settingsWebsite").value;

  currentUser.displayName = name;
  currentUser.bio = bio;
  currentUser.website = website;

  // Sync to database
  const index = db_users.findIndex(u => u.uid === currentUser.uid);
  if (index !== -1) {
    db_users[index] = { ...db_users[index], displayName: name, bio, website };
  }
  setStoredData("users", db_users);
  setStoredData("session", currentUser);
  updateNavCta();
  showToast("Profil Anda berhasil disimpan.");
}

function handlePasswordUpdate(e) {
  e.preventDefault();
  document.getElementById("passwordSettingsForm").reset();
  showToast("Kata sandi berhasil diperbarui.");
}

function saveNotificationPrefs() {
  showToast("Preferensi notifikasi disimpan.");
}

function handleAccountDeletion() {
  showConfirmDialog("Hapus Akun Permanen?", "Seluruh berkas Anda akan terhapus selamanya.", () => {
    db_users = db_users.filter(u => u.uid !== currentUser.uid);
    db_prompts = db_prompts.filter(p => p.creatorId !== currentUser.uid);
    setStoredData("users", db_users);
    setStoredData("prompts", db_prompts);
    handleLogout();
  });
}

// ============================================================
// ADMIN PANEL MODULE
// ============================================================
function initAdminPage() {
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "moderator")) {
    alert("Akses ditolak. Area terbatas.");
    window.location.href = "index.html";
    return;
  }

  loadAdminStats();
  renderActivityFeed();
  renderAdminPrompts();
  renderAdminUsers();
  renderAdminReports();
  renderAdminCategories();
  renderAdminSubscribers();

  // Load site settings pre-fill
  document.getElementById("siteName").value = db_settings.siteName;
  document.getElementById("contactEmail").value = db_settings.contactEmail;
  document.getElementById("siteDesc").value = db_settings.siteDesc;
  document.getElementById("welcomeMsg").value = db_settings.welcomeMsg;
  document.getElementById("maxImgSize").value = db_settings.maxImgSize;
  document.getElementById("maintenanceMode").checked = db_settings.maintenanceMode;
  document.getElementById("registrationOpen").checked = db_settings.registrationOpen;
  document.getElementById("moderationEnabled").checked = db_settings.moderationEnabled;
}

function switchAdminSection(section) {
  const sections = document.querySelectorAll(".admin-section");
  sections.forEach(s => s.classList.remove("active"));

  const buttons = document.querySelectorAll(".sidebar-menu .menu-item");
  buttons.forEach(b => b.classList.remove("active"));

  const matchBtn = Array.from(buttons).find(b => b.innerText.toLowerCase().includes(section === "overview" ? "ringkasan" : section === "prompts" ? "kelola prompt" : section === "users" ? "kelola pengguna" : section === "reports" ? "komentar" : section === "categories" ? "kategori" : section === "newsletter" ? "newsletter" : "pengaturan"));
  if (matchBtn) matchBtn.classList.add("active");

  if (section === "overview") document.getElementById("adminSecOverview").classList.add("active");
  else if (section === "prompts") document.getElementById("adminSecPrompts").classList.add("active");
  else if (section === "users") document.getElementById("adminSecUsers").classList.add("active");
  else if (section === "reports") document.getElementById("adminSecReports").classList.add("active");
  else if (section === "categories") document.getElementById("adminSecCategories").classList.add("active");
  else if (section === "newsletter") document.getElementById("adminSecNewsletter").classList.add("active");
  else if (section === "settings") document.getElementById("adminSecSettings").classList.add("active");
}

function loadAdminStats() {
  document.getElementById("adminStatTotalPrompts").innerText = db_prompts.length;
  document.getElementById("adminStatTotalUsers").innerText = db_users.length;
  document.getElementById("adminStatViewsToday").innerText = formatNumber(1850);
  document.getElementById("adminStatPendingPrompts").innerText = db_prompts.filter(p => p.status === "Menunggu Review").length;
}

function renderActivityFeed() {
  const feed = document.getElementById("activityFeed");
  if (!feed) return;
  const activities = [
    { text: "Budi Santoso mendaftar ke platform", time: "10 menit lalu" },
    { text: "Ahmad Dani mengajukan prompt baru: Kota Futuristik Malam Hari", time: "1 jam lalu" },
    { text: "Siti Rahma mengubah status promosi", time: "4 jam lalu" }
  ];
  feed.innerHTML = activities.map(a => `
    <li class="activity-item">
      <span>${a.text}</span>
      <span class="activity-time">${a.time}</span>
    </li>
  `).join("");
}

function renderAdminPrompts() {
  const tbody = document.getElementById("adminPromptsTableBody");
  if (!tbody) return;

  tbody.innerHTML = db_prompts.map(p => `
    <tr>
      <td><input type="checkbox" class="admin-prompt-select" value="${p.id}" onchange="checkBulkSelection()"></td>
      <td><img src="${p.imageUrl}" alt="${p.title}" style="width:50px; height:35px; object-fit:cover; border-radius:4px;"></td>
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
  `).join("");
}

function adminVerifyPrompt(id) {
  const index = db_prompts.findIndex(p => p.id === id);
  if (index !== -1) {
    db_prompts[index].isVerified = true;
    setStoredData("prompts", db_prompts);
    showToast("Prompt ditandai sebagai Terverifikasi.");
    renderAdminPrompts();
  }
}

function adminDeletePrompt(id) {
  showConfirmDialog("Hapus Permanen?", "Tindakan ini tidak dapat dibatalkan.", () => {
    db_prompts = db_prompts.filter(p => p.id !== id);
    setStoredData("prompts", db_prompts);
    showToast("Prompt berhasil dihapus secara permanen.");
    renderAdminPrompts();
    loadAdminStats();
  });
}

function renderAdminUsers() {
  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  tbody.innerHTML = db_users.map(u => `
    <tr>
      <td><strong>${u.displayName}</strong></td>
      <td>${u.email}</td>
      <td>${u.role.toUpperCase()}</td>
      <td>${u.joinDate}</td>
      <td>${u.promptCount}</td>
      <td><span class="status-badge active">Aktif</span></td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action" onclick="adminSuspendUser('${u.uid}')">Suspend</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function adminSuspendUser(uid) {
  showConfirmDialog("Suspend Pengguna?", "Pengguna ini tidak akan dapat masuk kembali.", () => {
    showToast("Pengguna ditangguhkan sementara.");
  });
}

function renderAdminReports() {
  const tbody = document.getElementById("adminReportsTableBody");
  if (!tbody) return;
  if (db_reports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--color-text-muted);">Tidak ada laporan pelanggaran.</td></tr>`;
  }
}

function renderAdminCategories() {
  const tbody = document.getElementById("adminCategoriesTableBody");
  if (!tbody) return;
  const categories = [
    { id: 1, name: "Midjourney", color: "#4F46E5", count: 2 },
    { id: 2, name: "DALL-E", color: "#10B981", count: 1 },
    { id: 3, name: "ChatGPT", color: "#F59E0B", count: 1 }
  ];
  tbody.innerHTML = categories.map(c => `
    <tr>
      <td>${c.id}</td>
      <td><strong>${c.name}</strong></td>
      <td><span style="display:inline-block; width:20px; height:20px; background:${c.color}; border-radius:40px;"></span></td>
      <td>${c.count} Prompt</td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action" onclick="showToast('Fitur edit kategori.')">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderAdminSubscribers() {
  const tbody = document.getElementById("adminNewsletterTableBody");
  if (!tbody) return;
  if (db_newsletter.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--color-text-muted);">Tidak ada pelanggan terdaftar.</td></tr>`;
  } else {
    tbody.innerHTML = db_newsletter.map(s => `
      <tr>
        <td>${s.email}</td>
        <td>${s.subscribedAt}</td>
        <td><span class="status-badge active">${s.status}</span></td>
        <td>
          <button class="btn-table-action danger" onclick="deleteSubscriber('${s.email}')">Hapus</button>
        </td>
      </tr>
    `).join("");
  }
}

function deleteSubscriber(email) {
  db_newsletter = db_newsletter.filter(s => s.email !== email);
  setStoredData("newsletter", db_newsletter);
  showToast("Pelanggan dihapus.");
  renderAdminSubscribers();
}

function handleBroadcastSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("btnSendBroadcast");
  setLoadingState(btn, true);
  setTimeout(() => {
    setLoadingState(btn, false);
    showToast("Email siaran berhasil dikirim!");
    document.getElementById("adminBroadcastForm").reset();
  }, 1200);
}

function exportNewsletterCSV() {
  if (db_newsletter.length === 0) {
    showToast("Data pelanggan kosong.", "danger");
    return;
  }
  let csv = "Email,Tanggal Daftar,Status\n";
  db_newsletter.forEach(s => { csv += `${s.email},${s.subscribedAt},${s.status}\n`; });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "subscribers.csv");
  a.click();
}

function handleSiteSettingsSubmit(e) {
  e.preventDefault();
  db_settings.siteName = document.getElementById("siteName").value;
  db_settings.contactEmail = document.getElementById("contactEmail").value;
  db_settings.siteDesc = document.getElementById("siteDesc").value;
  db_settings.welcomeMsg = document.getElementById("welcomeMsg").value;
  db_settings.maxImgSize = parseInt(document.getElementById("maxImgSize").value);
  db_settings.maintenanceMode = document.getElementById("maintenanceMode").checked;
  db_settings.registrationOpen = document.getElementById("registrationOpen").checked;
  db_settings.moderationEnabled = document.getElementById("moderationEnabled").checked;

  setStoredData("settings", db_settings);
  showToast("Konfigurasi sistem berhasil diperbarui.");
}

// Bulk Action Checkbox Logic
function toggleSelectAllPrompts(master) {
  const checks = document.querySelectorAll(".admin-prompt-select");
  checks.forEach(c => c.checked = master.checked);
  checkBulkSelection();
}

function checkBulkSelection() {
  const checks = document.querySelectorAll(".admin-prompt-select:checked");
  const bar = document.getElementById("bulkActionsBar");
  if (!bar) return;
  if (checks.length > 0) {
    document.getElementById("bulkSelectedText").innerText = `${checks.length} baris terpilih`;
    bar.classList.remove("hidden");
  } else {
    bar.classList.add("hidden");
  }
}

function handleBulkAction(action) {
  const checkedBoxes = document.querySelectorAll(".admin-prompt-select:checked");
  const ids = Array.from(checkedBoxes).map(c => c.value);
  
  showConfirmDialog("Jalankan Aksi Masal?", `Apakah Anda yakin ingin menjalankan tindakan ${action} pada ${ids.length} prompt ini?`, () => {
    if (action === "delete") {
      db_prompts = db_prompts.filter(p => !ids.includes(p.id));
    } else if (action === "approve") {
      db_prompts.forEach((p, idx) => { if (ids.includes(p.id)) db_prompts[idx].status = "Aktif"; });
    } else if (action === "hide") {
      db_prompts.forEach((p, idx) => { if (ids.includes(p.id)) db_prompts[idx].status = "Tersembunyi"; });
    }
    setStoredData("prompts", db_prompts);
    showToast("Tindakan masal berhasil diterapkan.");
    document.getElementById("bulkActionsBar").classList.add("hidden");
    document.getElementById("selectAllPrompts").checked = false;
    renderAdminPrompts();
    loadAdminStats();
  });
}

// ============================================================
// MOBILE NAVBAR NAVIGATION TOGGLE
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
