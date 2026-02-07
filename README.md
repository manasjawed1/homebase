# Homebase — Property Management MVP

> Hackathon MVP. Firebase-only stack. Import into Firebase Studio, run, deploy.

---

## Architecture

```text
┌──────────────────────────────────────────────────┐
│              Next.js App (App Router)            │
│      React UI + Tailwind CSS + shadcn/ui         │
│      Client-side Firestore reads/writes          │
└──────────────────┬───────────────────────────────┘
                   │
                   │ Firebase JS SDK (client)
                   ▼
┌──────────────────────────────────────────────────┐
│                   Firebase                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │  Firestore  │  │  Hosting   │  │  Storage   │ │
│  │  (database) │  │  (deploy)  │  │  (files)   │ │
│  └────────────┘  └────────────┘  └────────────┘ │
└──────────────────────────────────────────────────┘
```

**No backend server. No auth complexity. No third-party services.**
Everything runs through the Firebase JS SDK on the client side.

---

## Tech Stack

| Layer     | Choice                  | Why                                      |
| --------- | ----------------------- | ---------------------------------------- |
| Framework | Next.js 14 (App Router) | File-based routing, React Server Comps   |
| Styling   | Tailwind CSS v4         | Fast, utility-first                      |
| UI Kit    | shadcn/ui               | Beautiful defaults, copy-paste components|
| Database  | Cloud Firestore         | Realtime, zero-config, generous free tier|
| Hosting   | Firebase Hosting        | One-command deploy, already configured   |
| File storage | Firebase Storage     | Vendor docs, tenant files (future)       |
| Auth      | **None for MVP**        | Hackathon — skip login, ship fast        |

---

## Project Structure

```text
homebase/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (providers, nav)
│   ├── page.tsx                    # Dashboard home
│   ├── properties/page.tsx         # Properties list + add
│   ├── tenants/page.tsx            # Tenants list + add
│   ├── maintenance/page.tsx        # Maintenance tickets
│   ├── leases/page.tsx             # Leases & renewals
│   └── vendors/page.tsx            # Vendors directory
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # App sidebar nav
│   │   └── TopBar.tsx              # Top bar (title, actions)
│   ├── properties/
│   │   ├── PropertyList.tsx
│   │   └── PropertyForm.tsx
│   ├── tenants/
│   │   ├── TenantList.tsx
│   │   └── TenantForm.tsx
│   ├── maintenance/
│   │   ├── TicketList.tsx
│   │   └── TicketForm.tsx
│   ├── leases/
│   │   ├── LeaseList.tsx
│   │   └── LeaseForm.tsx
│   └── vendors/
│       ├── VendorList.tsx
│       └── VendorForm.tsx
│
├── lib/
│   ├── firebase.ts                 # Firebase app init + Firestore instance
│   ├── collections.ts              # Typed collection refs + helpers
│   └── seed.ts                     # One-click seed script
│
├── public/                         # Static assets
│   └── index.html                  # (replaced by Next.js)
│
├── firebase.json                   # Firebase Hosting config
├── .firebaserc                     # Firebase project link
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Firestore Data Model

All collections live at the root level. No nesting. Simple flat structure.

### `buildings`
| Field        | Type     | Example                  |
| ------------ | -------- | ------------------------ |
| name         | string   | "Marina Tower"           |
| nameAr       | string   | "برج المارينا"           |
| address      | string   | "Dubai Marina, Plot 23"  |
| totalUnits   | number   | 120                      |
| createdAt    | timestamp| auto                     |

### `properties`
| Field        | Type     | Example                  |
| ------------ | -------- | ------------------------ |
| buildingId   | string   | (ref to buildings doc)   |
| unit         | string   | "1204"                   |
| type         | string   | "apartment"              |
| bedrooms     | number   | 2                        |
| bathrooms    | number   | 2                        |
| sqft         | number   | 1200                     |
| rentAmount   | number   | 85000                    |
| status       | string   | "occupied" / "vacant" / "maintenance" |
| createdAt    | timestamp| auto                     |

### `tenants`
| Field        | Type     | Example                  |
| ------------ | -------- | ------------------------ |
| name         | string   | "Ahmed Al Maktoum"       |
| nameAr       | string   | "أحمد المكتوم"           |
| email        | string   | "ahmed@email.com"        |
| phone        | string   | "+971501234567"          |
| emiratesId   | string   | "784-XXXX-XXXXXXX-X"    |
| propertyId   | string   | (ref to properties doc)  |
| createdAt    | timestamp| auto                     |

### `leases`
| Field         | Type     | Example                 |
| ------------- | -------- | ----------------------- |
| propertyId    | string   | (ref to properties doc) |
| tenantId      | string   | (ref to tenants doc)    |
| startDate     | string   | "2025-03-01"            |
| endDate       | string   | "2026-02-28"            |
| rentAmount    | number   | 85000                   |
| status        | string   | "active" / "expired" / "pending" |
| renewalStatus | string   | "none" / "pending" / "renewed" |
| createdAt     | timestamp| auto                    |

### `maintenanceTickets`
| Field        | Type     | Example                  |
| ------------ | -------- | ------------------------ |
| propertyId   | string   | (ref to properties doc)  |
| tenantId     | string   | (ref to tenants doc)     |
| vendorId     | string   | (ref to vendors doc)     |
| type         | string   | "plumbing" / "electrical" / "hvac" / "general" |
| status       | string   | "open" / "in_progress" / "resolved" / "closed" |
| priority     | string   | "low" / "medium" / "high" / "urgent" |
| description  | string   | "AC not cooling"         |
| createdAt    | timestamp| auto                     |

### `vendors`
| Field        | Type     | Example                  |
| ------------ | -------- | ------------------------ |
| name         | string   | "CoolTech HVAC"          |
| nameAr       | string   | "كول تك"                 |
| specialty    | string   | "hvac"                   |
| phone        | string   | "+971509876543"          |
| email        | string   | "info@cooltech.ae"       |
| rating       | number   | 4.5                      |
| createdAt    | timestamp| auto                     |

---

## Firebase Setup (One-Time)

### Option A: Firebase Studio (Recommended for Hackathon)

1. Go to [Firebase Studio](https://studio.firebase.google.com)
2. Click **"Import a GitHub repo"**
3. Select this repo (`homebase`)
4. Firebase Studio auto-detects Next.js and sets up the environment
5. Open terminal in Firebase Studio and run:

```bash
npm install
```

6. Create a Firebase project (if you don't have one):
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create project → Enable **Firestore** (start in test mode)
   - Go to Project Settings → General → scroll to "Your apps" → Add web app
   - Copy the config object

7. Create `.env.local` in project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

8. Run the app:

```bash
npm run dev
```

### Option B: Local Development

```bash
# Clone and install
git clone <repo-url> && cd homebase
npm install

# Add Firebase config (see step 7 above)
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run
npm run dev
```

---

## Deploy

### From Firebase Studio
```bash
npm run build
firebase deploy
```

### From Local
```bash
npm run build
firebase deploy
```

That's it. Your app is live at `https://your-project.web.app`.

---

## Seed Data

Run the seed script to populate Firestore with demo data:

```bash
npm run seed
```

This creates:
- 3 buildings
- 10 properties across buildings
- 8 tenants
- 8 active leases
- 5 maintenance tickets
- 4 vendors

---

## Key Decisions (Hackathon Edition)

| Decision                        | Rationale                                                  |
| ------------------------------- | ---------------------------------------------------------- |
| No auth                         | Hackathon demo — skip login, show the product              |
| Firestore in test mode          | No security rules needed for demo                          |
| Client-side Firestore SDK       | No backend server, no API routes, fewer moving parts       |
| Flat collections (no nesting)   | Simpler queries, easier to reason about                    |
| String dates (not Timestamps)   | Easier to work with in forms and display                   |
| shadcn/ui components            | Beautiful defaults, no design time needed                  |
| Static export to Firebase Hosting | Simplest deploy path, no Cloud Functions needed          |

---

## MVP Scope

### In Scope (build these)
- [x] Dashboard with summary stats
- [x] Properties list — view, add, edit status
- [x] Tenants list — view, add, link to property
- [x] Leases — view, add, track renewals
- [x] Maintenance tickets — create, assign vendor, update status
- [x] Vendors directory — view, add
- [x] Seed data for demo

### Out of Scope (skip for hackathon)
- [ ] User auth / login / roles
- [ ] Security rules
- [ ] File uploads (vendor docs, tenant docs)
- [ ] WhatsApp / RERA / Ejari integrations
- [ ] AI agent
- [ ] Arabic RTL support
- [ ] Mobile responsive (nice-to-have, not priority)

---

## Task Breakdown

| #  | Task                                  | Time Est. | Depends On |
| -- | ------------------------------------- | --------- | ---------- |
| 1  | Init Next.js + Tailwind + shadcn/ui   | 15 min    | —          |
| 2  | Firebase SDK setup (`lib/firebase.ts`)| 10 min    | 1          |
| 3  | Firestore helpers (`lib/collections.ts`)| 15 min  | 2          |
| 4  | Sidebar layout + navigation           | 20 min    | 1          |
| 5  | Dashboard home (stats cards)          | 20 min    | 3, 4       |
| 6  | Properties page (list + add form)     | 30 min    | 3, 4       |
| 7  | Tenants page (list + add form)        | 25 min    | 3, 4       |
| 8  | Leases page (list + add form)         | 25 min    | 3, 4       |
| 9  | Maintenance page (list + add form)    | 25 min    | 3, 4       |
| 10 | Vendors page (list + add form)        | 20 min    | 3, 4       |
| 11 | Seed script                           | 15 min    | 3          |
| 12 | Build + deploy to Firebase Hosting    | 10 min    | all        |

**Total estimated: ~3.5 hours**

---

## .env.example

```bash
# Firebase (get from Firebase Console → Project Settings → Your Apps)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Quick Reference

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production
npm run seed       # Populate Firestore with demo data
firebase deploy    # Deploy to Firebase Hosting
```
