# Resep Pintar

Resep Pintar adalah aplikasi web sederhana untuk menemukan dan menyimpan resep masakan favorit Anda. Aplikasi ini menggunakan TheMealDB API untuk mengambil data resep dari berbagai kategori.

## Fitur

- Menampilkan daftar resep berdasarkan kategori (Dessert, Chicken, dll)
- Menampilkan detail resep lengkap dengan bahan dan langkah memasak
- Fitur pencarian resep
- Menyimpan resep favorit menggunakan localStorage
- Mode gelap/terang menggunakan sessionStorage
- Desain responsif untuk berbagai ukuran layar

## Teknologi yang Digunakan

- HTML5
- CSS3 dengan CSS Variables
- Vanilla JavaScript (ES6+)
- TheMealDB API

## Cara Menjalankan

1. Clone repositori ini
2. Buka file `index.html` di browser Anda
3. Atau gunakan server lokal seperti Live Server di VS Code

## Cara Deploy ke Vercel

1. Pastikan Anda memiliki akun Vercel
2. Install Vercel CLI: `npm i -g vercel`
3. Jalankan perintah `vercel` di direktori proyek
4. Ikuti petunjuk untuk menautkan proyek ke akun Vercel Anda
5. Setelah selesai, proyek akan di-deploy dan Anda akan mendapatkan URL live

Atau:

1. Push kode Anda ke repositori GitHub
2. Masuk ke dashboard Vercel
3. Klik "New Project"
4. Pilih repositori GitHub Anda
5. Konfigurasi pengaturan build (jika diperlukan)
6. Klik "Deploy"

## Tantangan & Solusi

1. **Tantangan**: Mengelola state aplikasi tanpa framework
   **Solusi**: Menggunakan modularisasi kode dengan memisahkan logika API, UI, dan penyimpanan ke dalam file terpisah.

2. **Tantangan**: Menangani error saat fetch data dari API
   **Solusi**: Mengimplementasikan try-catch pada setiap pemanggilan API dan menampilkan pesan error yang ramah kepada pengguna.

3. **Tantangan**: Menyimpan preferensi tema tanpa backend
   **Solusi**: Menggunakan sessionStorage untuk menyimpan preferensi tema dan menerapkannya saat halaman dimuat.

4. **Tantangan**: Membuat UI yang responsif tanpa framework CSS
   **Solusi**: Menggunakan CSS Grid dan Flexbox untuk membuat layout yang responsif, serta CSS Variables untuk memudahkan manajemen tema.

5. **Tantangan**: Mengoptimalkan performa saat memuat banyak data
   **Solusi**: Mengimplementasikan loading indicator dan menampilkan data secara bertahap untuk meningkatkan pengalaman pengguna.