# Mengganti foto dan tautan

## Tautan LinkedIn, GitHub, Instagram, dan email

Buka **`src/data/portfolioData.ts`**, lalu cari **`export const contacts`** di bagian bawah.

- `url`: alamat tujuan saat tautan diklik. Gunakan URL lengkap dengan `https://`.
- `label`: teks alamat yang tampil pada halaman.
- Email memakai `mailto:alamat@email.com` pada `url`.

Tombol “Start a conversation” juga mengambil alamat email dari daftar ini.

## Foto dan sertifikat

Simpan file di **`public/assets/`**:

| Nama file | Ditampilkan di |
| --- | --- |
| `itb-campus.jpg` | Foto kampus pada bagian Education / ITB |
| `mxc-last-day.jpg` | Foto pengalaman MXC pada showcase diagnostik jaringan |
| `ixplore-certificate.png` | Kartu i-Xplore Internship Certificate |
| `ixplore-certificate.pdf` | PDF asli yang dibuka saat kartu/tombol sertifikat diklik |
| `satu-innovation-top30.jpg` | Kartu SATU Innovation Hub 2026 |
| `relpool-dashboard.png` | Tampilan dashboard pada showcase RELPOOL |

Jika nama atau ekstensi foto berbeda, edit **`export const assets`** di bagian atas **`src/data/portfolioData.ts`**. Contoh: jika foto ITB berupa PNG bernama `kampus-itb.png`, ubah `education` menjadi `/assets/kampus-itb.png`.

Foto belum perlu tersedia sekarang. Slot menampilkan wireframe saat file belum ada. Sertifikat menggunakan `object-fit: contain` agar seluruh sertifikat terlihat. Refresh halaman setelah menambah file saat development; jika belum muncul, restart `npm run dev`. Untuk deployment, jalankan ulang `npm run build`.

Foto ITB, foto MXC, bukti SATU, dan sertifikat i-Xplore yang diberikan sudah dimasukkan. Pratinjau PNG sertifikat dibuat dari halaman pertama PDF; jika mengganti PDF, perbarui juga gambar pratinjaunya. Kartu SATU dapat diklik untuk membuka bukti penghargaan ukuran penuh.

## Animasi

GSAP berjalan otomatis saat halaman dibuka dan saat section masuk layar. Tidak ada tombol Play/Pause atau Putar intro. Pengaturan jeda dari versi sebelumnya tidak dipakai lagi. Sesuai permintaan pemilik, GSAP tetap menjalankan gerakan penuh walaupun pengaturan animasi sistem nonaktif. Garis paket pada diagram jaringan juga bergerak melalui GSAP.

Skrip animasi: **`src/scripts/animations.ts`**. Skrip kontrol tombol dan bahasa: **`src/scripts/portfolio.ts`**. Bootstrap: **`src/layouts/BaseLayout.astro`**.
