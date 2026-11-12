# Jagruti Plastic — Website + Admin

Next.js (App Router) · TypeScript · Tailwind v4 · Prisma + MongoDB Atlas · Auth.js · Cloudinary · React Hook Form + Zod · Framer Motion

## Setup
1. `npm install`  (also runs `prisma generate`)
2. `cp .env.example .env` and fill in `DATABASE_URL`, `AUTH_SECRET` (`npx auth secret`), Cloudinary keys, and `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (min 10 chars).
3. `npm run db:push`  — creates collections/indexes in MongoDB Atlas (allow your IP in Atlas Network Access).
4. `npm run seed`    — categories, 4 products, company info, settings, admin user.
5. `npm run dev` → http://localhost:3000 · admin at `/admin/login`.

Remove `SEED_ADMIN_PASSWORD` from `.env` after seeding.

## Notes
- **Public site works before the DB is seeded**: it falls back to `src/config/catalog.ts` + `src/config/company.ts`.
- **MOQ is hidden** (`moqPublic=false`) until enabled in Admin → Settings. **Yarn thickness (20 mm)** is not in the data until confirmed.
- **Images**: all photo slots are labelled placeholders. Upload real product photos in Admin → Products; company/factory photos need a replacement in the page files (search `ImagePlaceholder`).
- **Admin security**: middleware + a server-side session check in the panel layout + `requireAdmin()` in every protected API route. Passwords are bcrypt-hashed; no credentials in code.
- **Rate limiting** (`src/lib/rate-limit.ts`) is in-memory; use a shared store (e.g. Upstash) if deploying to multi-instance/serverless.
- **Add more shadcn/ui parts** (Sheet, Dropdown, Tabs, Breadcrumb, Pagination…) with `npx shadcn@latest add <name>`; `components.json` is configured.
- Legal pages (`/privacy`, `/terms`) are labelled placeholders.
