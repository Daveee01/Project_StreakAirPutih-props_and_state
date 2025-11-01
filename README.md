# Streak Minum Air Putih (React + TypeScript)

Aplikasi sederhana untuk membantu pengguna membangun kebiasaan minum air putih setiap hari. Setiap kali minum, pengguna menekan tombol “Catat Hari Ini”. Aplikasi menghitung streak (jumlah hari berturut-turut), menampilkan progres harian menuju target (mis. 8 gelas), dan memperlihatkan riwayat 14 hari terakhir. Data disimpan di browser (localStorage) sehingga tetap ada saat halaman ditutup.

## Komponen Utama
- HabitButton
  - Tugas: tombol aksi untuk menambah catatan minum pada hari ini.
  - Props: `todayCount`, `todayLimit`, `onIncrement`.
- StreakBar
  - Tugas: menampilkan streak saat ini dan rekor terbaik, plus progress bar perbandingan keduanya.
  - Props: `currentStreak`, `bestStreak`.
- History
  - Tugas: kalender mini 14 hari yang memperlihatkan hari-hari yang terisi.
  - Props: `days` berupa array objek `{ date: string; count: number }`.
- GoalBadge
  - Tugas: indikator persentase progres harian menuju target (0–100%).
  - Props: `percent` (0..1).

## Letak Penggunaan Props dan State
- State disimpan terpusat di `App.tsx`:
  - `days: Record<string, number>` — jumlah catatan minum per tanggal `YYYY-MM-DD`.
  - `bestStreak: number` — rekor streak terbaik (persist di `localStorage`).
  - State turunan (derived):
    - `todayCount` — jumlah minum hari ini.
    - `currentStreak` — streak terkini yang dihitung dari `days`.
    - `percent` — progres harian: `todayCount / DAILY_GOAL` (dibatasi 0..1).
    - `last14` — data 14 hari terakhir untuk komponen History.
- Props mengalir dari `App` (atas) ke komponen (bawah):
  - `HabitButton` menerima `todayCount`, `todayLimit`, dan callback `onIncrement()` untuk mengubah state di `App`.
  - `StreakBar` menerima `currentStreak` dan `bestStreak` untuk ditampilkan.
  - `History` menerima `days` (14 hari) untuk dirender sebagai grid.
  - `GoalBadge` menerima `percent` untuk progress ring.

## Alur Singkat
1. Pengguna menekan `HabitButton` → memanggil `onIncrement()`.
2. `App` menambah `days[today]`, menghitung ulang `currentStreak`, dan memperbarui `bestStreak` bila perlu.
3. State disimpan ke `localStorage`. Komponen lain menerima data terbaru melalui props dan otomatis diperbarui.

## Menjalankan Proyek
```bash
npm install
npm run dev
```

Catatan: Target harian default adalah 8 (bisa diubah di `App.tsx`, konstanta `DAILY_GOAL`). Format tanggal mengikuti zona waktu lokal perangkat.
