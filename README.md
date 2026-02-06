**Smart Ledger API**

API ini merupakan hasil pengembangan dan perbaikan dari Daily Schedule API yang telah dilengkapi dengan fitur pencatatan jadwal harian, hutang, dan pengeluaran harian, sehingga pengguna dapat mengelola aktivitas sekaligus memantau kondisi keuangan secara lebih terstruktur. Selain itu, API ini juga terintegrasi dengan bot Telegram yang berfungsi untuk mengirimkan notifikasi terkait jadwal, hutang, dan pengeluaran, serta dirancang untuk digunakan pada aplikasi web maupun mobile.

**Cara Menjalankan Project**

1. Clone repository ini.
2. Masuk ke folder project, lalu jalankan perintah npm install
   (pastikan Node.js dan npm sudah terpasang).
3. Buat file .env di root project.
4. Lakukan migrasi database dengan cara jalankan:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Jalankan project dengan perintah npm start.

**Isi .env**

```env
DATABASE_URL=""
JWT_SECRET=""
PORT=
TELEGRAM_TOKEN=""
```

Jika ingin akses swaggernya langsung bisa klik link di bawah ini 👇👇👇
https://apimyschedule.projectbase.my.id/swagger/
