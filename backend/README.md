# Bam Iran — Laravel API scaffold

This is **not** a full Laravel install — it's the application-specific code
(migrations, models, controllers, routes, seeders) written to match
`frontend/`'s data model. Composer and PHP aren't reachable from the sandbox
this was built in, so it's provided as files to drop into a real Laravel
project rather than something already running.

## Bootstrap

```bash
composer create-project laravel/laravel bam-iran-backend "^11.0"
cd bam-iran-backend

# copy this scaffold's contents in, overwriting the matching folders:
#   app/Models, app/Http/Controllers/Api, app/Http/Resources,
#   database/migrations, database/seeders, routes/api.php

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## Configure

In `.env`:
```
DB_CONNECTION=mysql
DB_DATABASE=bam_iran
CACHE_STORE=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
FILESYSTEM_DISK=public
```

Then:
```bash
php artisan storage:link
php artisan migrate --seed
php artisan serve
```

The API is now at `http://localhost:8000/api` — matches the endpoints
`frontend/` expects (`/api/properties`, `/api/leads`, `/api/visit-requests`, …).

## Notes

- **Auth**: `routes/api.php` has no auth on the public read endpoints or on
  lead/visit-request submission, matching the brief (no login required to
  browse or inquire). Sanctum is wired in for the *admin CMS panel*, which
  isn't built yet — see the commented block at the bottom of `api.php`.
- **CORS**: set `SANCTUM_STATEFUL_DOMAINS` and `config/cors.php`'s
  `supports_credentials` once the admin panel needs cookie-based Sanctum
  auth from the Next.js app. Public GET endpoints don't need this.
- **Images**: `images` on `Property` is a JSON array of Storage paths (or
  full URLs for seeded/demo data). Wire an upload endpoint to
  `Storage::disk('public')` for the admin panel.
- **Queue**: Redis is configured for both cache and queue. Use
  `php artisan queue:work` once WhatsApp/SMS notification jobs are added
  (see the `TODO` in `LeadController`).
