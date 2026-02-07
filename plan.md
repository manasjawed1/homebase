# Homebase MVP Scaffolding (Firebase Edition)

## Architecture

```
┌─────────────────┐      HTTP/REST       ┌──────────────────┐
│  React/Vite SPA │ ◄──────────────────► │  FastAPI Backend  │
│  (Firebase SDK) │      (verify tokens) │  (Cloud Run)      │
└────────┬────────┘                      └────────┬─────────┘
         │                                        │
         │  Firebase SDK                          │  firebase-admin
         ▼                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      Firebase Services                      │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │  Firebase Auth│  │Cloud Firestore │  │ Cloud Storage  │  │
│  └──────────────┘  └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Future Integrations (Stubs Only)

- WhatsApp Business API
- RERA Rental Index
- Ejari System
- AI Agent (OpenAI)

---

## Project Structure

```
homebase/
├── frontend/                        # React/Vite app (existing UI)
│   └── src/
│       ├── app/components/          # existing UI components (screens + ui)
│       ├── api/                     # typed API client (calls FastAPI)
│       ├── lib/firebase.ts          # Firebase SDK init (Auth, Firestore)
│       ├── pages/                   # route-based page wrappers
│       └── hooks/                   # React Query hooks for API
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI entry point
│   │   ├── config.py                # settings (Firebase project ID, etc.)
│   │   ├── dependencies.py          # Firebase Auth token verification
│   │   ├── firestore.py             # Firestore client init
│   │   ├── models/                  # Pydantic models (collection schemas)
│   │   ├── routers/                 # API route handlers
│   │   ├── services/                # business logic layer
│   │   └── integrations/            # WhatsApp, RERA, AI stubs (ABCs)
│   ├── requirements.txt
│   └── Dockerfile                   # for Cloud Run deployment
│
├── firebase.json                    # hosting + rewrites config
├── .firebaserc                      # Firebase project alias
├── firestore.rules                  # security rules
├── firestore.indexes.json           # composite index definitions
├── seed/                            # Firestore seed data (JSON)
├── Makefile                         # dev commands
├── .env.example
├── .gitignore
└── README.md
```

---

## Firestore Data Model

| Collection | Document Fields |
|---|---|
| `users/{userId}` | name, email, role, language, createdAt |
| `buildings/{buildingId}` | name, nameAr, address, totalUnits, managerId |
| `buildings/{buildingId}/properties/{propertyId}` | unit, type, bedrooms, bathrooms, sqft, status |
| `leases/{leaseId}` | propertyId, tenantId, startDate, endDate, rentAmount, status, renewalStatus |
| `tenants/{tenantId}` | name, nameAr, email, phone, emiratesId, language |
| `maintenanceTickets/{ticketId}` | propertyId, tenantId, vendorId, type, status, priority, description, slaDeadline |
| `vendors/{vendorId}` | name, nameAr, specialty, rating, responseTime, location |
| `vendors/{vendorId}/documents/{docId}` | type, status, expiryDate, fileUrl |

---

## What Gets Built (Skeleton Only)

### 1. Project Root + Firebase Config

- `firebase.json` — hosting config pointing to `frontend/dist`, URL rewrites to Cloud Run backend
- `.firebaserc` — project alias placeholder
- `firestore.rules` — basic security rules (authenticated read/write)
- `firestore.indexes.json` — placeholder for composite indexes
- `Makefile` with targets: `setup`, `dev`, `deploy`, `seed`
- `.gitignore`, `.env.example`

### 2. Backend Skeleton (`backend/`)

- FastAPI app with CORS, error handling, health check (`/api/health`)
- **Routers:** `/api/v1/properties`, `/api/v1/tenants`, `/api/v1/maintenance`, `/api/v1/renewals`, `/api/v1/vendors`
- **Pydantic models:** request/response schemas for each resource, mirroring Firestore document shapes
- **Firestore DAL:** data access layer using `firebase-admin` SDK — CRUD operations per collection
- **Auth dependency:** verify Firebase ID tokens from frontend, extract user info
- **Services:** business logic stubs (query Firestore, return data)
- **Integration stubs:** abstract base classes for WhatsApp, RERA, AI Agent
- **Dockerfile:** Python 3.12, uvicorn, ready for `gcloud run deploy`
- Auto-generated OpenAPI docs at `/docs`

### 3. Firebase Auth (Frontend + Backend)

- **Frontend:** Firebase SDK init, sign-in UI (email/password skeleton), auth context provider, token attachment to API calls
- **Backend:** `dependencies.py` with FastAPI dependency that verifies Firebase ID tokens via `firebase-admin`

### 4. Frontend Upgrades (`frontend/`)

- `lib/firebase.ts` — Firebase app init with Auth
- React Router with routes matching existing tabs
- API client (`src/api/`) that attaches Firebase auth tokens to requests
- React Query hooks wrapping API calls
- Existing UI components continue working with mock data fallback

### 5. Developer Experience

- `README.md` with full setup guide (Firebase project creation, env vars, local dev, deployment)
- **Local dev:** `make dev` runs Vite frontend + FastAPI backend concurrently (Firestore emulator optional)
- **Deploy:** `firebase deploy` for frontend, `gcloud run deploy` for backend (documented in README)
- `seed/` directory with JSON files to populate Firestore with demo data
- FastAPI docs at `http://localhost:8000/docs`

---

## Key Decisions

| Decision | Rationale |
|---|---|
| **Firestore** over PostgreSQL | Native Firebase, schemaless, real-time listeners for future use, zero infra management |
| **Firebase Auth** over custom JWT | Handles email/password, Google sign-in, phone auth; token verification on backend via `firebase-admin` |
| **Cloud Run** for FastAPI | Containerized, auto-scaling, pay-per-request, integrates with Firebase |
| **Firebase Hosting** for frontend | Global CDN, SSL, preview channels for PRs |
| **Pydantic models** as schema | Runtime validation even though Firestore is schemaless |
| **ABCs for integrations** | Collaborators pick up WhatsApp/RERA/AI work independently |
| **No Firestore from frontend directly** | All data goes through FastAPI so business logic stays server-side and testable |

---

## Task Breakdown for Collaborators

| Area | Task | Depends On |
|---|---|---|
| Infra | Firebase project setup, `.env` config | — |
| Backend | FastAPI app + health check + CORS | — |
| Backend | Firestore DAL (CRUD per collection) | FastAPI app |
| Backend | Auth middleware (verify Firebase tokens) | FastAPI app |
| Backend | Properties router + service | Firestore DAL |
| Backend | Maintenance router + service | Firestore DAL |
| Backend | Renewals router + service | Firestore DAL |
| Backend | Vendors router + service | Firestore DAL |
| Backend | WhatsApp integration stub | — |
| Backend | RERA integration stub | — |
| Backend | AI Agent integration stub | — |
| Frontend | Firebase SDK init + Auth context | — |
| Frontend | React Router setup | — |
| Frontend | API client layer | Auth context |
| Frontend | React Query hooks | API client |
| Frontend | Connect Dashboard to live API | Hooks + Properties router |
| Frontend | Connect Maintenance to live API | Hooks + Maintenance router |
| Frontend | Connect Renewals to live API | Hooks + Renewals router |
| Frontend | Connect Vendors to live API | Hooks + Vendors router |
| Data | Seed scripts for demo data | Firestore DAL |
| Docs | README + contributor guide | All skeleton done |
