# Expense & Income Tracker App

Aplikasi pencatatan keuangan pribadi berbasis *mobile* untuk memantau arus kas harian (pemasukan dan pengeluaran) secara praktis, cepat, dan transparan. Proyek ini dibangun menggunakan **React Native** dengan **Expo** untuk mempermudah pengembangan dan pengujian langsung melalui perangkat seluler via Expo Go.

---

## Fitur Utama

- **Catat Transaksi**: Tambah pengeluaran dan pemasukan lengkap dengan jumlah nominal, kategori, tanggal, serta catatan transaksi.
- **Kategori Fleksibel**: Pengelompokan pengeluaran (makanan, transportasi, tagihan, belanja) dan pemasukan (gaji, bonus, investasi).
- **Ringkasan Saldo (Dashboard)**: Visualisasi total pemasukan, total pengeluaran, serta sisa saldo secara *real-time*.
- **Riwayat Transaksi**: Daftar riwayat mutasi keuangan yang mudah ditinjau, diubah, maupun dihapus.
- **Penyimpanan Lokal**: Penyimpanan data aman dan instan secara lokal di perangkat tanpa wajib koneksi internet setiap saat.

---

## Tech Stack

| Komponen | Teknologi |
| --- | --- |
| **Framework** | React Native |
| **Tooling & Runtime** | Expo (Expo Go) |
| **Language** | JavaScript / TypeScript |
| **State / Storage** | React Hooks / AsyncStorage |
| **Icons & UI** | Expo Vector Icons |

---

## Prasyarat Lingkungan (Prerequisites)

Sebelum menjalankan aplikasi, pastikan sistem lokal Anda telah terpasang:

1. **Node.js** (versi LTS terbaru) & **npm** / **yarn** / **pnpm**
2. **Git**
3. **Expo Go App** terpasang di perangkat fisik (unduh gratis via Play Store atau App Store)

---

## Panduan Instalasi & Menjalankan Aplikasi

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username-anda/nama-repo.git](https://github.com/username-anda/nama-repo.git)
   cd nama-repo

**npm install**
atau jika menggunakan yarn:
**yarn install**

**npx expo start**


# M-App-Kasku

Aplikasi pencatatan keuangan pribadi (*expense & income tracker*) berbasis React Native (Expo) dengan arsitektur modular yang memisahkan komponen UI, *screens*, *repositories*, dan *business logic services*.

---

## Struktur Direktori

```text
├── assets/                          # Aset gambar, ikon, dan font bawaan Expo
├── src/
│   ├── components/                  # Komponen UI modular
│   │   ├── ConfirmModal.jsx         # Modal konfirmasi aksi
│   │   ├── SummaryCard.jsx          # Kartu ringkasan total pemasukan & pengeluaran
│   │   └── TransactionItem.jsx      # Baris item riwayat transaksi
│   ├── database/                    # Inisialisasi basis data lokal
│   │   └── database.js              # Konfigurasi / skema koneksi database
│   ├── navigation/                  # Manajemen routing & navigasi aplikasi
│   │   └── AppNavigator.jsx         # Konfigurasi screen stack / bottom tabs
│   ├── repositories/                # Abstraksi data layer (query & mutasi data)
│   │   └── transactionRepository.js # Operasi CRUD data transaksi ke database
│   ├── screens/                     # Tampilan halaman aplikasi
│   │   ├── AddTransactionScreen.jsx # Halaman tambah transaksi baru
│   │   ├── AuthScreen.jsx           # Halaman login / registrasi pengguna
│   │   ├── ChangePasswordScreen.jsx # Halaman ganti kata sandi
│   │   ├── DashboardScreen.jsx      # Layar utama ringkasan saldo & transaksi
│   │   ├── EditTransactionScreen.jsx# Halaman ubah transaksi
│   │   ├── FAQScreen.jsx            # Halaman bantuan / tanya jawab
│   │   └── ProfileScreen.jsx        # Halaman profil pengguna & pengaturan
│   ├── services/                    # Business logic layer
│   │   ├── authService.js           # Layanan autentikasi & sesi pengguna
│   │   └── transactionService.js    # Logika kalkulasi & proses transaksi
│   └── utils/                       # Helper & fungsi utilitas
│       ├── currency.js              # Pemformatan mata uang (Rupiah)
│       ├── date.js                  # Pemformatan tanggal & waktu
│       └── finance.js               # Perhitungan analitik & saldo keuangan
├── App.js                           # Root component / entry point
├── app.json                         # Konfigurasi Expo
└── package.json                     # Metadata proyek & dependensi
