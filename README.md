<<<<<<< HEAD
# Aplikasi Pemesanan Buku Online - Tugas UTS Pemrograman Web 1

Aplikasi web front-end sederhana untuk pemesanan buku toko online. Aplikasi ini dibangun menggunakan **HTML5 (Semantik)**, **CSS3**, dan **JavaScript (DOM Manipulation)** tanpa bantuan *framework* atau database backend, memanfaatkan data JSON lokal dari `data.js`.

## 📁 Struktur Folder Project

```
tugas-uts-web1/
├── index.html            # Halaman Utama (Login & Modal)
├── dashboard.html        # Dashboard Menu Utama
├── stok.html             # Katalog Stok & Tambah Data via DOM
├── checkout.html         # Form Pemesanan & Kalkulasi Total
├── tracking.html         # Pengecekan Delivery Order (DO)
├── README.md             # Dokumentasi Proyek
├── css/
│   └── style.css         # Styling global aplikasi
├── js/
│   ├── data.js           # Data dummy JSON (Pengguna, Katalog, Tracking)
│   └── script.js         # Logika interaktivitas & Manipulasi DOM
└── img/                  # Sampul buku & Aset Gambar
    ├── pengantar_komunikasi.jpg
    ├── manajemen_keuangan.jpg
    ├── kepemimpinan.jpg
    ├── mikrobiologi.jpg
    └── paud_perkembangan.jpeg

```

## 🚀 Fitur Utama & Indikator Penilaian

1. **Struktur HTML Semantik & Valid (`index.html`, `dashboard.html`, dll.)**

   * Menggunakan elemen HTML5 semantik seperti `<header>`, `<nav>`, `<main>`, `<table>`, dan `<form>`.

2. **Pengelolaan Gaya Antar Muka (`css/style.css`)**

   * Layout responsif, rapi, modern, dan konsisten di seluruh halaman web.

3. **Autentikasi & Modal Box (`index.html`)**

   * Validasi formulir login berbasis data pengguna di `data.js`.

   * Pop-up alert untuk umpan balik error (Email/Password salah).

   * Modal Box untuk fitur *"Lupa Password"* dan *"Daftar Akun"*.

4. **Greeting Dinamis Berdasarkan Waktu (`dashboard.html`)**

   * Menampilkan ucapan selamat (Pagi / Siang / Sore / Malam) sesuai dengan waktu lokal browser.

5. **Katalog Stok Dinamis & Manipulasi DOM (`stok.html`)**

   * Menampilkan daftar katalog buku secara dinamis dari `dataKatalogBuku` (`data.js`).

   * Fitur menambahkan baris stok buku baru secara real-time ke dalam tabel menggunakan JavaScript DOM Manipulation.

6. **Form Pemesanan & Kalkulasi Otomatis (`checkout.html`)**

   * Pilihan buku otomatis terhubung dengan data katalog.

   * Perhitungan total biaya pemesanan secara langsung berbasis jumlah barang yang dipesan.

7. **Tracking Pengiriman & Riwayat Perjalanan (`tracking.html`)**

   * Pencarian nomor *Delivery Order* (DO) interaktif.

   * Menampilkan status pengiriman, rincian paket, ekspedisi, serta riwayat *timeline* perjalanan paket.

## 🔑 Data Uji Coba (Kredensial & Resi DO)

### 1. Akun Login (`index.html`)

| Role | Email | Password | Nama | 
| ----- | ----- | ----- | ----- | 
| **User** | `rina@gmail.com` | `rina123` | Rina Wulandari | 
| **User** | `agus@gmail.com` | `agus123` | Agus Pranoto | 
| **Admin** | `siti@gmail.com` | `siti123` | Siti Marlina | 

### 2. Nomor Delivery Order / Resi (`tracking.html`)

* `20230012` (Atas nama Rina Wulandari - Status: Dalam Perjalanan)

* `20230013` (Atas nama Agus Pranoto - Status: Dikirim/Selesai)
=======
# TugasUtsWeb
>>>>>>> f039e1e7a3f646ec5c1e47890adb275ec6b3332f
