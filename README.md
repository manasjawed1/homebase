# Homebase MVP Scaffolding (Next.js + Convex + Clerk Edition)

## Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│                         Next.js App                            │
│  App Router + Server Components + Route Handlers (optional)    │
│  Tailwind v4 UI + Clerk Auth (client + middleware)             │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
                │ Convex client (queries/muts)   │ Clerk session/JWT
                ▼                               ▼
┌──────────────────────────┐          ┌──────────────────────────┐
│         Convex            │          │          Clerk            │
│  DB + mutations/queries   │          │ Auth UI + sessions + orgs │
│  file storage (optional)  │          │ user identity + roles     │
└───────────────┬──────────┘          └──────────────────────────┘
                │
                ▼
      Future integrations (stubs)
   WhatsApp, RERA index, Ejari, AI agent
```

Key shift: Convex replaces your "backend + database" layer. Next.js calls Convex directly via generated API.

---

## Project Structure

```text
homebase/
├── app/                                # Next.js app router
│   ├── (auth)/sign-in/[[...sign-in]]/  # Clerk auth routes
│   ├── (auth)/sign-up/[[...sign-up]]/
│   ├── (dashboard)/                    # protected area (tabs/pages)
│   │   ├── layout.tsx                  # auth gate + shell
│   │   ├── page.tsx                    # dashboard home
│   │   ├── properties/page.tsx
│   │   ├── tenants/page.tsx
│   │   ├── maintenance/page.tsx
│   │   ├── renewals/page.tsx
│   │   └── vendors/page.tsx
│   ├── api/health/route.ts             # simple health endpoint
│   ├── layout.tsx
│   └── globals.css
│
├── components/                         # shared UI components
│   ├── ui/                             # shadcn-ish primitives (optional)
│   └── app/                            # feature components (screens/tabs)
│
├── lib/
│   ├── auth.ts                         # role helpers, org helpers
│   ├── convex.ts                       # Convex client helpers (optional)
│   └── constants.ts
│
├── hooks/                              # React hooks (optional)
│   ├── useProperties.ts                # wraps convex queries
│   └── ...
│
├── convex/                             # Convex backend
│   ├── schema.ts                       # tables + indexes
│   ├── users.ts                        # mutations/queries
│   ├── buildings.ts
│   ├── properties.ts
│   ├── tenants.ts
│   ├── leases.ts
│   ├── maintenanceTickets.ts
│   ├── vendors.ts
│   ├── vendorDocuments.ts
│   ├── renewals.ts                     # can be derived or stored
│   └── integrations/
│       ├── whatsapp.ts                 # stubs (ABCs/interfaces)
│       ├── rera.ts
│       ├── ejari.ts
│       └── aiAgent.ts
│
├── seed/                               # seed data (json) + scripts
│   ├── demo.users.json
│   ├── demo.buildings.json
│   └── ...
│
├── middleware.ts                       # Clerk middleware (route protection)
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts                  # Tailwind v4 config
├── Makefile
├── .env.example
├── .gitignore
└── README.md
```

---

## Convex Data Model (tables)

Convex doesn't do "collections/documents" like Firestore. You'll model tables with typed fields + indexes.

Suggested tables (mirrors your Firestore shape):

* users

  * clerkUserId, name, email, role, language, createdAt
* buildings

  * name, nameAr, address, totalUnits, managerUserId
* properties

  * buildingId, unit, type, bedrooms, bathrooms, sqft, status
* leases

  * propertyId, tenantId, startDate, endDate, rentAmount, status, renewalStatus
* tenants

  * name, nameAr, email, phone, emiratesId, language
* maintenanceTickets

  * propertyId, tenantId, vendorId, type, status, priority, description, slaDeadline
* vendors

  * name, nameAr, specialty, rating, responseTime, location
* vendorDocuments

  * vendorId, type, status, expiryDate, fileStorageId (or fileUrl if external)

Indexes you'll likely want early:

* properties.by_buildingId
* leases.by_propertyId
* tickets.by_propertyId, tickets.by_vendorId
* vendorDocuments.by_vendorId

---

## What Gets Built (Skeleton Only)

### 1. Project Root + DX

* Next.js app initialized with App Router
* Tailwind v4 wired (globals.css + config)
* Makefile targets: setup, dev, seed, deploy
* .env.example + .gitignore
* README with end-to-end setup and deployment

### 2. Clerk Auth (frontend + middleware)

* Clerk provider in app/layout.tsx
* sign-in and sign-up routes
* middleware.ts protecting (dashboard) routes
* simple role pattern:

  * role stored in Convex users table
  * helpers to check role (admin/manager/viewer)

### 3. Convex backend skeleton

* schema.ts defines tables + indexes
* per-entity files:

  * queries: list/get
  * mutations: create/update/delete
* functions enforce auth:

  * read Clerk identity from Convex auth context
  * map Clerk user to users row (upsert on first login)

### 4. App pages + data wiring

* routes for:

  * /properties
  * /tenants
  * /maintenance
  * /renewals
  * /vendors
* pages call Convex queries/mutations (basic list screens)
* existing UI components can keep "mock fallback" until hooked up:

  * if no data, show placeholder data or empty state

### 5. Integration stubs (only interfaces + placeholders)

Inside convex/integrations:

* WhatsApp client interface + stub implementation
* RERA client interface + stub
* Ejari client interface + stub
* AI Agent interface + stub (later can call OpenAI)

No real API calls in MVP scaffold, just structure.

---

## Key Decisions

* Next.js App Router

  * one app for UI + server glue, fewer moving parts than SPA + separate backend
* Convex over Postgres/Firestore

  * typed schema, realtime ready, backend functions colocated with DB logic
* Clerk over custom auth

  * fast auth UI, sessions, orgs, and route protection
* No "frontend direct DB writes" outside Convex

  * all writes go through Convex mutations, keeping business logic centralized

---

## Task Breakdown for Collaborators

| Area         | Task                                | Depends On                |
| ------------ | ----------------------------------- | ------------------------- |
| Infra        | Next.js + Tailwind v4 baseline      | —                         |
| Auth         | Clerk setup + middleware protection | Next.js baseline          |
| DB           | Convex project init + schema.ts     | —                         |
| DB           | users upsert on login               | Clerk + Convex            |
| DB           | CRUD functions per table            | schema                    |
| UI           | Dashboard routes and layouts        | Next.js baseline          |
| UI           | Hook up properties page to Convex   | properties functions      |
| UI           | Hook up maintenance page            | tickets functions         |
| UI           | Hook up renewals page               | leases/renewals functions |
| UI           | Hook up vendors page                | vendors + docs functions  |
| Integrations | WhatsApp/RERA/Ejari/AI stubs        | —                         |
| Data         | seed json + seed script             | schema + mutations        |
| Docs         | README + contributor guide          | all skeleton              |

---

## .env.example (suggested)

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Optional: integration stubs later
WHATSAPP_TOKEN=
RERA_API_KEY=
EJARI_API_KEY=
OPENAI_API_KEY=
```

---

## Deployment

* Next.js: Vercel
* Convex: Convex hosted backend (linked to your project)
* Clerk: hosted auth, configured for your Vercel domain

Local dev:

* make dev runs:

  * next dev
  * convex dev

---

If you want, I can also generate the exact scaffold files (middleware.ts, convex/schema.ts, one full CRUD module example like properties.ts, and the dashboard route layout) so your repo boots with working auth + a real "Properties list" backed by Convex on day 1.
