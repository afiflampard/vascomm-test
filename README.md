# Test Node (Bun + Express + Sequelize)

> Starter kit Node.js berbasis Bun untuk membangun REST API dengan Express, Sequelize (PostgreSQL), autentikasi (JWT & Google OAuth), dan dokumentasi API via Swagger UI.

## Fitur Utama

- **Runtime Bun**: Startup cepat, dev server dengan watch.
- **Express 5**: Routing sederhana untuk `auth`, `users`, dan `products`.
- **Sequelize**: ORM dengan migrasi dan seeder.
- **PostgreSQL**: Driver `pg` dan `pg-hstore`.
- **Auth**: JWT dan Google OAuth 2.0 (passport-google-oauth20).
- **Swagger UI**: Dokumentasi API di endpoint `/docs`.
- **Dotenv**: Manajemen environment variable.

## Prasyarat

- Bun v1.3.x atau lebih baru
- Node.js opsional (untuk ekosistem tooling)
- PostgreSQL terpasang & dapat diakses
- Akun Google OAuth (Client ID & Secret) jika ingin mencoba SSO Google

## Instalasi

```bash
bun install
```

## Konfigurasi Environment
Buat file `.env` di root proyek. Contoh variabel yang umumnya dibutuhkan:
```env
# Server
PORT=3000

# Database (sesuaikan dengan setup Anda)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boilerplate_db
DB_USER=postgres
DB_PASS=postgres
DB_DIALECT=postgres

# Auth
JWT_SECRET=your_jwt_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```
Catatan: Struktur tepat konfigurasi DB mengikuti setup Sequelize Anda (config dapat berada di `src/config` dan/atau `sequelize-cli`). Pastikan nilai variabel sesuai dengan konfigurasi tersebut.

## Menjalankan Aplikasi

- Development (auto-reload):
```bash
bun dev
```
- Production:
```bash
bun start
```
Aplikasi akan berjalan di `http://localhost:3000` (mengikuti `PORT`).

## Dokumentasi API (Swagger)

- Endpoint: `http://localhost:3000/docs`
- Spesifikasi disusun via `swagger-jsdoc` dari:
  - `./src/routes/*.js`
  - `./src/docs/schemas/*.js`

## Skrip yang Tersedia

- Start server produksi: `bun start`
- Start dev server (watch): `bun dev`
- Migrasi DB: `bun run migrate`
- Undo migrasi terakhir: `bun run migrate:undo`
- Jalankan semua seeder: `bun run seed`
- Undo semua seeder: `bun run seed:undo`

> Skrip migrasi/seeder menggunakan `sequelize-cli`. Pastikan konfigurasi `sequelize` dan koneksi database sudah benar.

## Migrasi & Seeder (Sequelize)

- Buat/mutakhirkan skema:

```bash
bun run migrate
```

- Batalkan migrasi terakhir:

```bash
bun run migrate:undo
```

- Jalankan semua seeder:

```bash
bun run seed
```

- Batalkan semua seeder:

```bash
bun run seed:undo
```

## Struktur Direktori (ringkas)

```text
src/
  auth/               # Strategi OAuth/Passport
  config/             # Konfigurasi aplikasi (port, dsb.)
  docs/               # Swagger spec & schemas
  models/             # Model Sequelize & index loader
  routes/             # Definisi route (users, products, auth)
  index.js            # Entry point Express
```

## Endpoint Utama

- `GET /` Health check sederhana
- `GET /docs` Swagger UI
- `/<resource>` sesuai routes:
  - `/auth` untuk autentikasi (termasuk Google OAuth)
  - `/users` untuk user-related endpoints
  - `/products` untuk product-related endpoints

Detail skema, parameter, dan response tersedia di Swagger UI.

## Otentikasi

- **JWT**: Gunakan header `Authorization: Bearer <token>` untuk endpoint yang membutuhkan autentikasi.
- **Google OAuth**: Daftarkan aplikasi di Google Cloud Console, set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, dan `GOOGLE_CALLBACK_URL` sesuai konfigurasi route `/auth`.

## Docker (Opsional)
Tersedia `Dockerfile`. Contoh build & run:

```bash
docker build -t boilerplate-node .
# gunakan --env-file untuk memuat .env
docker run --name boilerplate-node --env-file .env -p 3000:3000 boilerplate-node
```

