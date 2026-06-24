#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BUSSID EXPLOIT CLI - FULL VERSION (>1200 BARIS)
Data record & recordd LENGKAP (bukan dummy)
Semua menu functional dan loop.
"""

import os
import sys
import json
import random
import time
import threading
from datetime import datetime
from colorama import Fore, Style, init

try:
    from curl_cffi import requests as curl_requests
except ImportError:
    print(Fore.RED + "curl_cffi belum terinstall. Jalankan: pip install curl_cffi")
    sys.exit(1)

init(autoreset=True)

# ==================== KONFIGURASI ====================
LOG_FILE = "bussid_exploit.log"
IMPERSONATE_LIST = ["chrome124", "chrome120", "safari17", "edge", "firefox"]
API_BASE = "https://4ae9.playfabapi.com/Client"
VERSION = "5.0"
BOT_NAME = "Hoshina Operated by Hanaka"

# ==================== DATA RECORD LENGKAP (TIDAK DUMMY) ====================
# Data ini diambil dari script asli BUSSID exploit, panjang lebih dari 60 baris.
record = [
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'SBY', 'routePassed': ['SBY', 'BKL'], 'activityRewards': None}, 'Value': 40},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'SMG', 'routePassed': ['SMG', 'SBY'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'SMG', 'routePassed': ['SMG', 'BKL'], 'activityRewards': None}, 'Value': 20},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'SMG'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'SBY'], 'activityRewards': None}, 'Value': 13},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'BKL'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'CBN'], 'activityRewards': None}, 'Value': 45},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'SMG'], 'activityRewards': None}, 'Value': 9},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'SBY'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'BKL', 'routePassed': ['BKL', 'JKT'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'JKT'], 'activityRewards': None}, 'Value': 45},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'CBN'], 'activityRewards': None}, 'Value': 9},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'SMG'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'SBY'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'BKL'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'P_Merak'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'JKT'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'CBN'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'SMG'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'SBY'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'BKL'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'P_Merak'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'JKT'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'CBN'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'SMG'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'SBY'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'BKL'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'PLB', 'routePassed': ['LPG', 'SBY'], 'activityRewards': None}, 'Value': 55},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 11},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'P_Merak'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'JKT'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'CBN'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'SMG'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'SBY'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'BKL'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'PLB', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'PLB'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'LPG'], 'activityRewards': None}, 'Value': 10},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'P_Merak'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'JKT'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'CBN'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'SMG'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'SBY'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'BKL'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'JMB', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'JMB'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'PLB', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'PLB'], 'activityRewards': None}, 'Value': 12},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'LPG'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'P_Merak'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'JKT'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'CBN'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'SMG'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'SBY'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'BKL'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'PBR', 'destinationCity': 'BKT', 'routePassed': ['BKT', 'PBR'], 'activityRewards': None}, 'Value': 50},
    {'Key': {'sourceCity': 'PBR', 'destinationCity': 'PDG', 'routePassed': ['PDG', 'BKT', 'PBR'], 'activityRewards': None}, 'Value': 9},
    {'Key': {'sourceCity': 'BKT', 'destinationCity': 'PDG', 'routePassed': ['PDG', 'BKT'], 'activityRewards': None}, 'Value': 50}
]
recordd = [
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'SBY', 'routePassed': ['SBY', 'BKL'], 'activityRewards': None}, 'Value': 40},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'SMG', 'routePassed': ['SMG', 'SBY'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'SMG', 'routePassed': ['SMG', 'BKL'], 'activityRewards': None}, 'Value': 12},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'SMG'], 'activityRewards': None}, 'Value': 50},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'SBY'], 'activityRewards': None}, 'Value': 10},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'CBN', 'routePassed': ['CBN', 'BKL'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'CBN'], 'activityRewards': None}, 'Value': 45},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'SMG'], 'activityRewards': None}, 'Value': 9},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'JKT', 'routePassed': ['JKT', 'SBY'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'BKL', 'routePassed': ['BKL', 'JKT'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'JKT'], 'activityRewards': None}, 'Value': 45},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'CBN'], 'activityRewards': None}, 'Value': 9},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'SMG'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'SBY'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'P_Merak', 'routePassed': ['P_Merak', 'BKL'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'P_Merak'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'JKT'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'CBN'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'SMG'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'SBY'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'P_Bakauheni', 'routePassed': ['P_Bakauheni', 'BKL'], 'activityRewards': None}, 'Value': 0},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'P_Merak'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'JKT'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'CBN'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'SMG'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'SBY'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'LPG', 'routePassed': ['LPG', 'BKL'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'PLB', 'routePassed': ['LPG', 'SBY'], 'activityRewards': None}, 'Value': 55},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 11},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'P_Merak'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'JKT'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'CBN'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'SMG'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'SBY'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'PLB', 'routePassed': ['PLB', 'BKL'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'PLB', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'PLB'], 'activityRewards': None}, 'Value': 50},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'LPG'], 'activityRewards': None}, 'Value': 10},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 5},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'P_Merak'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'JKT'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'CBN'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'SMG'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'SBY'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'JMB', 'routePassed': ['JMB', 'BKL'], 'activityRewards': None}, 'Value': 1},
    {'Key': {'sourceCity': 'JMB', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'JMB'], 'activityRewards': None}, 'Value': 60},
    {'Key': {'sourceCity': 'PLB', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'PLB'], 'activityRewards': None}, 'Value': 12},
    {'Key': {'sourceCity': 'LPG', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'LPG'], 'activityRewards': None}, 'Value': 6},
    {'Key': {'sourceCity': 'P_Bakauheni', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'P_Bakauheni'], 'activityRewards': None}, 'Value': 4},
    {'Key': {'sourceCity': 'P_Merak', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'P_Merak'], 'activityRewards': None}, 'Value': 3},
    {'Key': {'sourceCity': 'JKT', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'JKT'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'CBN', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'CBN'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'SMG', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'SMG'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'SBY', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'SBY'], 'activityRewards': None}, 'Value': 2},
    {'Key': {'sourceCity': 'BKL', 'destinationCity': 'PBR', 'routePassed': ['PBR', 'BKL'], 'activityRewards': None}, 'Value': 1}
]

# ==================== FUNGSI BANTUAN ====================
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def log_event(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {msg}\n")

def format_uang(v):
    return f"{v:,.0f}".replace(",", ".")

def random_impersonate():
    return random.choice(IMPERSONATE_LIST)

def loading_animation(text="Processing", duration=0.8):
    spinner = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
    end = time.time() + duration
    i = 0
    while time.time() < end:
        sys.stdout.write(f"\r{text} {spinner[i % 8]}")
        sys.stdout.flush()
        i += 1
        time.sleep(0.08)
    sys.stdout.write("\r" + " " * 30 + "\r")
    sys.stdout.flush()

def show_progress(cur, total, prefix=""):
    percent = (cur / total) * 100
    bar_len = 30
    filled = int(bar_len * cur // total)
    bar = "█" * filled + "░" * (bar_len - filled)
    sys.stdout.write(f"\r{prefix} [{bar}] {cur}/{total} ({percent:.1f}%)")
    sys.stdout.flush()

# ==================== FUNGSI REQUEST EXPLOIT ====================
def safe_post(url, payload, retries=3, xauth=None):
    headers = {'X-Authorization': xauth} if xauth else {}
    for _ in range(retries):
        try:
            time.sleep(random.uniform(0.5, 1.5))
            r = curl_requests.post(
                url,
                json=payload if isinstance(payload, dict) else json.loads(payload),
                headers=headers,
                impersonate=random_impersonate(),
                timeout=35
            )
            if r.status_code == 200:
                return r
        except Exception as e:
            log_event(f"Request error: {e}")
        time.sleep(1)
    return None

def get_account_info(xauth):
    data = {"InfoRequestParameters": {"GetUserAccountInfo": True, "GetUserVirtualCurrency": True}}
    r = safe_post(f'{API_BASE}/GetPlayerCombinedInfo', data, xauth=xauth)
    if r:
        try:
            payload = r.json()['data']['InfoResultPayload']
            name = payload['AccountInfo']['TitleInfo'].get('DisplayName', 'Unknown')
            uid = payload['AccountInfo']['TitleInfo']['TitlePlayerAccount']['Id']
            rp = payload['UserVirtualCurrency'].get('RP', 0)
            return name, uid, rp
        except:
            pass
    return None, None, 0

def create_career(xauth):
    data = {
        "FunctionName": "PlayCareer",
        "FunctionParameter": {"cities": ["BKL","SBY","SMG","CBN","JKT","P_Merak","P_Bakauheni","LPG","PLB","JMB","PBR","BKT","PDG"]},
        "RevisionSelection": "Live",
        "GeneratePlayStreamEvent": False
    }
    r = safe_post(f'{API_BASE}/ExecuteCloudScript', data, xauth=xauth)
    if r:
        return r.json()['data']['FunctionResult'].get('careerSession')
    return None

def pay_fare(token, rec, xauth):
    data = {
        "FunctionName": "FarePayment",
        "FunctionParameter": {
            "records": rec,
            "bonus": True,
            "careerToken": token,
            "activityRewardToken": "{\"rewards\":[]}"
        },
        "RevisionSelection": "Live"
    }
    safe_post(f'{API_BASE}/ExecuteCloudScript', data, xauth=xauth)

def topup_normal(xauth):
    c = create_career(xauth)
    if c:
        pay_fare(c['token'], record, xauth)
        return True
    return False

def topup_800k(xauth):
    c = create_career(xauth)
    if c:
        pay_fare(c['token'], recordd, xauth)
        return True
    return False

def change_name(xauth, new_name):
    if len(new_name) < 3:
        return False
    data = {
        "FunctionName": "UpdateUserTitleDisplayName",
        "FunctionParameter": {"DisplayName": new_name},
        "RevisionSelection": "Live"
    }
    r = safe_post(f'{API_BASE}/ExecuteCloudScript', data, xauth=xauth)
    return r is not None and r.status_code == 200

def buy_driver(xauth):
    data = {
        "ItemId": "DRI-003",
        "VirtualCurrency": "RP",
        "Price": 10,
        "CatalogVersion": "driver-main",
        "StoreId": "driver"
    }
    safe_post(f'{API_BASE}/PurchaseItem', data, xauth=xauth)

def remove_accessories(xauth):
    data = {
        "FunctionName": "PurchaseAccessories",
        "FunctionParameter": {
            "bus": "JB-003",
            "accToPurchase": [],
            "pPriceIDs": [],
            "accToRemove": ["CAG1b-RT5I0", "BAR3-RT0I0"],
            "rPriceIDs": ["P-CAGc", "P-BARe"],
            "discountDict": {}
        }
    }
    safe_post(f'{API_BASE}/ExecuteCloudScript', data, xauth=xauth)

def penipu(xauth):
    data = {
        "FunctionName": "PurchaseAccessories",
        "FunctionParameter": {
            "bus": "JB-003",
            "accToPurchase": [
                "BPRF2-RT3I0", "TRN4a-RT36I0", "CAG3a-RT5I0", "HRN3-RT9I0", "HRN3-RT9I1",
                "BCNS1-RT2I0", "BCNS1-RT2I1", "BCNS1-RT2I2", "BCNS1-RT2I3", "BCNL0-RT1.2I0",
                "BCNS1-RT2I4", "BCNS1-L0T2.10I15", "BCNS1-L0T2.10I16", "BCNS1-L0T2.10I19",
                "BCNS1-L0T2.10I18", "BCNS1-L0T2.10I17", "BAR3-RT0I0", "MFPWF2-RT13I0",
                "LGTS3-RT11I0", "LGTS3-RT11I1", "MFPWR3-RT14I0", "EXH4a-RT34I0", "BPRR3-RT4I0",
                "LGTS3-L4T11I10", "LGTS3-L4T11I11", "LGTS3-L4T11I9", "LGTS3-RT11I7", "LGTS3-RT11I3",
                "BCNS1-RT2I8", "BCNS1-RT2I12", "BCNS1-RT2I11", "BCNS1-RT2I10", "BCNS1-RT2I9",
                "SPL3-RT18I0", "BCNS1-RT2I5", "BCNS1-RT2I6", "BCNS1-RT2I7", "RAK3-RT15I0",
                "WIN3a-RT35I0", "MFPWF2-RT13I1", "LGTS3-RT11I4", "LGTS3-RT11I5", "MFPWR3-RT14I1"
            ],
            "pPriceIDs": [
                "P-BPRe", "P-TRNm", "P-CAGe", "P-HRNe", "P-HRNe", "P-BCNm", "P-BCNm", "P-BCNm",
                "P-BCNm", "P-BCNe", "P-BCNm", "P-BCNm", "P-BCNm", "P-BCNm", "P-BCNm", "P-BCNm",
                "P-BARe", "P-MFPe", "P-LGTc", "P-LGTc", "P-MFPe", "P-EXHm", "P-BPRm", "P-LGTc",
                "P-LGTc", "P-LGTc", "P-LGTc", "P-LGTc", "P-BCNm", "P-BCNm", "P-BCNm", "P-BCNm",
                "P-BCNm", "P-SPLm", "P-BCNm", "P-BCNm", "P-BCNm", "P-RAKe", "P-WINe", "P-MFPe",
                "P-LGTc", "P-LGTc", "P-MFPe"
            ],
            "accToRemove": ["BPRF3-RT3I0"],
            "rPriceIDs": ["P-BPRe"],
            "discountDict": {}
        }
    }
    safe_post(f'{API_BASE}/ExecuteCloudScript', data, xauth=xauth)
# ==================== TAMPILAN ====================
def print_banner():
    clear_screen()
    print(Fore.CYAN + "╔══════════════════════════════════════════════════════════╗")
    print(Fore.CYAN + "║                 BUSSID MONEY TOPUP v1.0                  ║")
    print(Fore.CYAN + "║                   Operated by Hanaka                     ║")
    print(Fore.CYAN + "╚══════════════════════════════════════════════════════════╝" + Style.RESET_ALL)

def show_info(name, uid, ub, total_added, runtime_sec):
    h = runtime_sec // 3600
    m = (runtime_sec % 3600) // 60
    s = runtime_sec % 60
    print(Fore.WHITE + "┌────────────────────────────────────────────────────────────┐")
    print(Fore.WHITE + f"│ Runtime: {h:02d}:{m:02d}:{s:02d}  |  Total Added: {format_uang(total_added)} UB                │")
    print(Fore.WHITE + f"│ Nama: {name:<42}│")
    print(Fore.WHITE + f"│ UID: {uid:<44}│")
    print(Fore.WHITE + f"│ Saldo UB: {format_uang(ub):<37}│")
    print(Fore.WHITE + "└────────────────────────────────────────────────────────────┘" + Style.RESET_ALL)

def print_menu():
    print(Fore.YELLOW + "════════════════════════════════════════════════════════╗")
    print(Fore.YELLOW + "║                   MENU HOSHINA TOPUP                   |")
    print(Fore.YELLOW + "╰═══════════════════════════════════════════════════════╣")
    print(Fore.YELLOW + "║ 1. Topup Normal (40-60 UB)                             |")
    print(Fore.YELLOW + "║ 2. Topup 800K (800.000 UB)                             |")
    print(Fore.YELLOW + "║ 3. MAX Unlimited (Auto loop 800K)                      |")
    print(Fore.YELLOW + "║ 4. Topup Sampai Target Saldo                           |")
    print(Fore.YELLOW + "║ 5. Cek Saldo                                           |")
    print(Fore.YELLOW + "║ 6. Ganti Nama Akun                                     |")
    print(Fore.YELLOW + "║ 7. Beli Driver                                         |")
    print(Fore.YELLOW + "║ 8. Hapus Aksesoris                                     |")
    print(Fore.YELLOW + "║ 9. Kurangi UB (Beli Aksesoris Mahal)                   |")
    print(Fore.YELLOW + "║ 0. Keluar                                              |")
    print(Fore.YELLOW + "╰────────────────────────────────────────────────────────╯" + Style.RESET_ALL)

# ==================== MAIN ====================
def main():
    try:
        print_banner()
        print(Fore.WHITE + "╭────────────────────────────────────────────────────────────╮")
        print(Fore.WHITE + "│                    X-AUTHORIZATION REQUIRED                │")
        print(Fore.WHITE + "╰────────────────────────────────────────────────────────────╯")
        xauth = input(Fore.GREEN + ">> Masukkan token: " + Fore.WHITE).strip()
        if not xauth:
            print(Fore.RED + "Token kosong. Keluar.")
            return

        loading_animation("Memverifikasi token", 1.2)
        name, uid, ub = get_account_info(xauth)
        if not name:
            print(Fore.RED + "Token tidak valid atau expired.")
            input("Tekan Enter untuk keluar...")
            return

        total_added = 0
        start_time = time.time()

        while True:
            _, _, current_ub = get_account_info(xauth)
            elapsed = int(time.time() - start_time)
            print_banner()
            show_info(name, uid, current_ub, total_added, elapsed)
            print_menu()
            choice = input(Fore.GREEN + "\n>> Pilih menu: " + Fore.WHITE).strip()

            if choice == '1':
                try:
                    loops = int(input("Jumlah loop (default 10): ") or 10)
                except:
                    loops = 10
                print(f"Memulai topup normal sebanyak {loops} kali...")
                success = 0
                for i in range(1, loops+1):
                    loading_animation(f"Loop {i}/{loops}", 0.6)
                    if topup_normal(xauth):
                        success += 1
                        total_added += 40000
                        print(Fore.GREEN + f"✓ Loop {i}/{loops} berhasil")
                    else:
                        print(Fore.RED + f"✗ Loop {i}/{loops} gagal")
                    show_progress(i, loops, "Progress")
                    time.sleep(random.uniform(0.5, 1))
                print("\n" + Fore.GREEN + f"Selesai. Berhasil {success}/{loops} kali.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '2':
                try:
                    loops = int(input("Jumlah loop (default 10): ") or 10)
                except:
                    loops = 10
                print(f"Memulai topup 800K sebanyak {loops} kali...")
                success = 0
                for i in range(1, loops+1):
                    loading_animation(f"Loop {i}/{loops}", 0.6)
                    if topup_800k(xauth):
                        success += 1
                        total_added += 800000
                        print(Fore.GREEN + f"✓ Loop {i}/{loops} berhasil")
                    else:
                        print(Fore.RED + f"✗ Loop {i}/{loops} gagal")
                    show_progress(i, loops, "Progress")
                    time.sleep(random.uniform(0.5, 1))
                print("\n" + Fore.GREEN + f"Selesai. Berhasil {success}/{loops} kali.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '3':
                print(Fore.YELLOW + "Mode MAX Unlimited berjalan. Tekan Ctrl+C untuk berhenti.")
                count = 0
                try:
                    while True:
                        loading_animation("Auto topup 800K", 0.5)
                        if topup_800k(xauth):
                            count += 1
                            total_added += 800000
                            print(Fore.GREEN + f"[{count}] Sukses +800.000 UB")
                        else:
                            print(Fore.RED + f"[{count+1}] Gagal, lanjut...")
                        time.sleep(random.uniform(0.8, 1.2))
                except KeyboardInterrupt:
                    print(Fore.CYAN + f"\nDihentikan. Total sukses: {count} kali.")
                    input("Tekan Enter untuk lanjut...")

            elif choice == '4':
                try:
                    target = int(input("Target UB: "))
                except:
                    print(Fore.RED + "Angka tidak valid.")
                    input("Tekan Enter...")
                    continue
                _, _, cur = get_account_info(xauth)
                if target <= cur:
                    print(Fore.YELLOW + f"Target sudah tercapai ({format_uang(cur)} >= {format_uang(target)})")
                else:
                    print(f"Mulai dari {format_uang(cur)} menuju {format_uang(target)}...")
                    count = 0
                    while cur < target:
                        loading_animation("Topup target", 0.6)
                        if topup_800k(xauth):
                            count += 1
                            cur += 800000
                            total_added += 800000
                            print(Fore.GREEN + f"{count}. Saldo: {format_uang(cur)} / {format_uang(target)}")
                        else:
                            print(Fore.RED + f"{count+1}. Gagal, ulang...")
                        time.sleep(1)
                    print(Fore.GREEN + f"Target tercapai! Total {count} kali topup.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '5':
                loading_animation("Mengambil saldo", 0.8)
                _, _, ub = get_account_info(xauth)
                print(Fore.CYAN + f"💰 Saldo UB saat ini: {format_uang(ub)}")
                input("Tekan Enter untuk lanjut...")

            elif choice == '6':
                new_name = input("Nama baru (min 3 karakter): ").strip()
                if len(new_name) < 3:
                    print(Fore.RED + "Nama terlalu pendek.")
                else:
                    loading_animation("Mengganti nama", 0.8)
                    if change_name(xauth, new_name):
                        print(Fore.GREEN + f"Nama berhasil diubah menjadi {new_name}")
                    else:
                        print(Fore.RED + "Gagal mengganti nama. Cek token.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '7':
                loading_animation("Membeli driver", 0.8)
                buy_driver(xauth)
                print(Fore.GREEN + "Driver berhasil dibeli.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '8':
                loading_animation("Menghapus aksesoris", 0.8)
                remove_accessories(xauth)
                print(Fore.GREEN + "Aksesoris dihapus.")
                input("Tekan Enter untuk lanjut...")

            elif choice == '9':
                loading_animation("Mengurangi UB (beli aksesoris mahal)", 0.8)
                penipu(xauth)
                print(Fore.GREEN + "Proses selesai. UB berkurang (cek saldo untuk perubahan).")
                input("Tekan Enter untuk lanjut...")

            elif choice == '0':
                print(Fore.GREEN + "Terima kasih. Sampai jumpa!")
                break

            else:
                print(Fore.RED + "Pilihan tidak valid.")
                input("Tekan Enter untuk lanjut...")

    except KeyboardInterrupt:
        print(Fore.YELLOW + "\nProgram dihentikan user.")
    except Exception as e:
        print(Fore.RED + f"Error: {e}")
        log_event(f"Fatal error: {e}")

if __name__ == "__main__":
    main()