# Menyambungkan LISTRIKU ke Google Sheet

Lakukan sekali saja, sekitar 10 menit. Yang dibutuhkan: akun Google.

## 1. Buat Google Sheet
1. Buka sheets.google.com, buat spreadsheet kosong.
2. Beri nama, misalnya **Rekap LISTRIKU**.

## 2. Pasang kode penerima
1. Di spreadsheet itu, klik **Ekstensi > Apps Script**.
2. Hapus isi editor, lalu tempel seluruh isi file **Kode.gs**.
3. Klik ikon simpan.

## 3. Terbitkan sebagai Web App
1. Klik **Terapkan (Deploy) > Deployment baru**.
2. Klik ikon roda gigi di samping "Pilih jenis", pilih **Aplikasi web**.
3. Isi:
   - Jalankan sebagai: **Saya**
   - Yang memiliki akses: **Siapa saja**
4. Klik **Terapkan**. Google akan meminta izin: pilih akunmu, klik **Lanjutan > Buka (tidak aman)**, lalu **Izinkan**. Peringatan ini wajar untuk skrip buatan sendiri.
5. Salin **URL aplikasi web** (berakhiran `/exec`).

## 4. Tempel URL ke web
1. Buka file **js/data.js**.
2. Isi baris `sheetURL: ''` dengan URL tadi, misalnya:
   `sheetURL: 'https://script.google.com/macros/s/XXXX/exec',`
3. Simpan, lalu unggah ulang folder web.

## 5. Uji
1. Buka web LISTRIKU (versi online, bukan pratinjau Claude), isi identitas, kerjakan satu langkah.
2. Dalam beberapa detik, tab **Rekap** muncul di spreadsheet dengan baris siswa itu.
3. Di Menu Utama web akan tertulis "Semua jawaban sudah terkirim ke guru ✓".

## Catatan
- Tab **Rekap**: 1 baris per siswa, urut kelas lalu absen. Kolom Status menunjukkan langkah terakhir.
- Tab **Butir Tes**: nilai 1/0 tiap butir pre-test dan post-test, siap untuk analisis validitas butir dan KR-20.
- Kalau kode di Kode.gs diubah, terbitkan ulang lewat **Terapkan > Kelola deployment > Edit > Versi baru** supaya URL-nya tetap sama.
- Token `listriku-2026` di Kode.gs harus sama dengan `sheetToken` di js/data.js.
