# React Speech to Text Workspace

<p align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="40" height="40"/>

  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="Vite" width="40" height="40"/>

  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/>

  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" alt="Supabase" width="40" height="40"/>
  
  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40"/>
  
  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>
  
  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>
  
  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" alt="npm" width="40" height="40"/>
</p>


A production-oriented, browser-based speech-to-text application built with **React**, **Supabase**, and **TanStack Query**.

The project demonstrates how to build a reliable client application around a browser-native speech API while separating UI state, server state, authentication, persistence, database access, caching, and error handling into explicit architectural boundaries.

---

## Architectural Highlights

| Core Pillar | Operational Implementation |
| --- | --- |
| **State Categorization** | Strict separation of transient UI state (React) from remote server state (TanStack Query) |
| **Data Isolation** | Multi-tenant user session security enforced at the PostgreSQL database level via Row Level Security (RLS) |
| **Cache Strategy** | Two-tier query caching (Memory + `localStorage`) with automatic cache purging on user logout |
| **Integration Boundary** | Data and error adapters normalizing `snake_case` backend schemas and raw network status codes |

---

## Technical Stack

```
[ Frontend Layer ] ────── React | Vite | CSS3 | JavaScript (JSX)
[ Hardware Interface ] ── Web Speech API
[ State & Caching ] ───── TanStack Query | Persistent localStorage Cache
[ Backend Services ] ──── Supabase Auth | Supabase PostgreSQL | Row Level Security
[ Tooling ] ───────────── npm

```

| Layer | Technology | Domain Role |
| --- | --- | --- |
| **Frontend UI** | React | Component-driven presentation layer |
| **Build Engine** | Vite | Module bundling and HMR development server |
| **Speech Capture** | Web Speech API | Browser-native speech recognition engine |
| **Identity Management** | Supabase Auth | Session tokens, registration, and credential recovery |
| **Database Engine** | Supabase PostgreSQL | Persistent record storage for user speech sessions |
| **Access Control** | PostgreSQL RLS | Row Level Security policies for user data isolation |
| **Server State** | TanStack Query | Query caching, invalidation, loading states, and mutations |
| **Offline Persistence** | `localStorage` | Rehydration target for TanStack Query server cache |

---

## System Overview

A speech-to-text proof-of-concept is straightforward to construct using standard browser APIs. Moving from a demo to a structured product requires solving fundamental software architecture challenges:

```
                  ┌──────────────────────────────────────────────┐
                  │          React Speech Application            │
                  └──────────────────────┬───────────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        │                                │                                │
        ▼                                ▼                                ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│     Data Isolation      │  │   State Categorization  │  │     Cache Lifecycle     │
│ Enforce user boundary   │  │ Split local React UI   │  │ Persist to localStore   │
│ in PostgreSQL via RLS   │  │ from TanStack Query     │  │ & flush on sign-out     │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
        │                                │                                │
        └────────────────────────────────┼────────────────────────────────┘
                                         │
                                         ▼
                             ┌─────────────────────────┐
                             │  Integration & Safety   │
                             │ Adapter payload transforms│
                             │ & mutation flight guards │
                             └─────────────────────────┘

```

> **Deliberate Design Policy:** This project introduces production-oriented architecture where it directly solves an operational problem, avoiding unneeded infrastructure complexity like microservices or custom proxy servers.

---

## Core Capabilities

* **Speech Engine Management:** Lifecycle control covering speech capture start, manual stoppage, transcript clearing, continuous output rendering, and word metrics.
* **Authentication Workflows:** Email/password sign-in, user registration, state persistence across page reloads, sign-out, and credential recovery.
* **Cloud Session Sync:** Persistent storage of user transcripts in Supabase PostgreSQL with real-time filtering, individual deletion, and bulk clearing.
* **Resilient Offline Reads:** Persistent server-state caching powered by TanStack Query and `localStorage` for offline browsing of previously fetched history.
* **Mutation Concurrency Guards:** Guard mechanisms on transcript save actions preventing duplicate requests while network calls are in flight.
* **Adapter Normalization:** Transformation layers mapping database conventions (`snake_case`) into frontend models (`camelCase`) and standardizing error responses.

> **Offline Boundary Note:** The application supports reading previously cached transcript history while offline. Speech recognition relies on browser driver services, which may still require network connectivity.

---

## Application Previews

### Authenticated Workspace

Workspace interface displaying real-time transcription, speech controls, word metrics, network indicators, and cloud-synced transcript history.

---

### Authentication Interface

Entry portal supporting sign-in, account creation, password recovery, and password update operations.

---

### Supabase PostgreSQL Database

Public database schema showing stored speech sessions with explicit owner mapping via `user_id`.

---

## Architecture & System Design

```
                     ┌───────────────────────────────────┐
                     │            Browser                │
                     └─────────────────┬─────────────────┘
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │         React Application         │
                     └─────────────────┬─────────────────┘
                                       │
      ┌────────────────────────────────┼────────────────────────────────┐
      │                                │                                │
      ▼                                ▼                                ▼
┌───────────┐                    ┌───────────┐                    ┌───────────┐
│Components │                    │  Hooks    │                    │ UI State  │
└─────┬─────┘                    └─────┬─────┘                    └───────────┘
      │                                │
      │                                ├── Speech Recognition
      │                                ├── Authentication
      │                                ├── Network Status
      │                                └── Speech History
      │                                │
      └────────────────────────────────┼────────────────────────────────┐
                                       │                                │
                                       ▼                                ▼
                         ┌───────────────────────────┐    ┌───────────────────────────┐
                         │       Service Layer       │    │      Adapter Layer        │
                         │                           │    │                           │
                         │  • Auth Service           │    │  • Speech Adapter         │
                         │  • Speech History Service │    │  • Speech Error Adapter   │
                         │  • Supabase Client        │    │  • API Error Adapter      │
                         └─────────────┬─────────────┘    └───────────────────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │         Supabase          │
                         │                           │
                         │  • Auth Engine            │
                         │  • PostgreSQL DB          │
                         │  • Row Level Security     │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │      TanStack Query       │
                         │                           │
                         │  • Memory Cache           │
                         │  • Persistent Storage     │
                         └───────────────────────────┘

```

The system enforces a strict **unidirectional data flow**: UI components consume hooks and service abstraction layers without directly maintaining Supabase query definitions or raw database schemas.

---

## Component Architecture

```
src/components/
├── Header.jsx ────────────── Application header & user identity banner
├── StatusIndicator.jsx ───── Live network status readout
├── Transcript.jsx ────────── Active transcript text area
├── SpeechControls.jsx ────── Speech recognition action triggers
├── WordCount.jsx ─────────── Word and character count statistics
├── History.jsx ───────────── Saved cloud session list and search filter
├── LoginForm.jsx ─────────── Sign-in credential form
├── RegisterForm.jsx ──────── Account registration form
├── ForgotPasswordForm.jsx ── Password recovery request form
└── UpdatePasswordForm.jsx ── New password submission form

```

---

## Custom Hooks & Service Layers

```
                                 ┌───────────────────────┐
                                 │   Presentation Layer  │
                                 └───────────┬───────────┘
                                             │
      ┌──────────────────────────────┬───────┴──────────────────────┬──────────────────────────────┐
      │                              │                              │                              │
      ▼                              ▼                              ▼                              ▼
┌───────────┐                  ┌───────────┐                  ┌───────────┐                  ┌───────────┐
│useSpeech  │                  │  useAuth  │                  │useSpeech  │                  │useNetwork │
│Recognition│                  └─────┬─────┘                  │ History   │                  │  Status   │
└─────┬─────┘                        │                        └─────┬─────┘                  └─────┬─────┘
      │                              │                              │                              │
      ▼                              ▼                              ▼                              ▼
Browser Web Speech             authService.js                TanStack Query &               window.addEventListener
API Instance                   (Supabase Auth)               speechHistoryService           ('online' / 'offline')

```

### Module Responsibilities

* **`useSpeechRecognition`:** Encapsulates the Web Speech API instance, exposing `start`, `stop`, `clear`, and `load` operations.
* **`useAuth`:** Exposes session state, active user objects, authentication status, and auth actions (`login`, `register`, `logout`, resets).
* **`useSpeechHistory`:** Interfaces with TanStack Query and `speechHistoryService`, managing query keys, invalidation, and data mutations.
* **`useNetworkStatus`:** Subscribes to browser `online` and `offline` events to expose network connectivity state.

---

## Data Transformation Pipeline

The adapter layer decouples backend database field naming conventions (`snake_case`) from frontend application models (`camelCase`):

```javascript
// Normalizes database record conventions into application models
function normalizeSpeechSession(session) {
  return {
    id: session.id,
    userId: session.user_id,
    text: session.text,
    createdAt: session.created_at,
  };
}

```

### End-to-End Save Pipeline

```
[ User Speech ]
       │
       ▼
[ Web Speech API ]
       │
       ▼
[ useSpeechRecognition() Hook ]
       │
       ▼
[ Transcript UI State ]
       │
       ▼
[ Save Action Trigger ] ──► [ useSpeechHistory() ] ──► [ speechHistoryService ]
                                                               │
                                                               ▼
                                                     [ Supabase Client ]
                                                               │
                                                               ▼
                                                    [ Supabase PostgreSQL ]
                                                               │
                                                               ▼
                                                [ TanStack Query Invalidation ]
                                                               │
                                                               ▼
                                                   [ Updated History UI ]

```

---

## Database Schema & Authorization Model

### Table Definition: `public.speech_sessions`

| Column | Data Type | Constraints / Description |
| --- | --- | --- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` |
| `user_id` | `UUID` | Foreign Key referencing `auth.users.id` |
| `text` | `TEXT` | Saved speech transcript content |
| `created_at` | `TIMESTAMPTZ` | Record creation timestamp |

### Row Level Security (RLS)

Database isolation is strictly enforced via PostgreSQL Row Level Security policies. Authenticated queries automatically evaluate against the active user's session token.

```
Requesting User            Database RLS Engine             Data Access Result
───────────────────        ───────────────────────         ────────────────────────
User A (Session Token) ──►  WHERE auth.uid() = user_id ──►  Access granted to User A records only
User B (Session Token) ──►  WHERE auth.uid() = user_id ──►  Access granted to User B records only

```

---

## State & Cache Management

### State Classification Matrix

```
┌─────────────────────────────────────────┬─────────────────────────────────────────┐
│   Local Client State (React Hooks)      │   Remote Server State (TanStack Query)  │
├─────────────────────────────────────────┼─────────────────────────────────────────┤
│ • Active transcript string              │ • Persisted speech history records      │
│ • Speech engine listening status        │ • Query fetch & loading states          │
│ • Auth form toggles & view states       │ • Save, Delete, and Clear mutations     │
│ • Browser network online status         │ • Persistent local cache hydration      │
└─────────────────────────────────────────┴─────────────────────────────────────────┘

```

### Query Key Scoping & Two-Tier Cache

Queries are explicitly bound to the authenticated user's ID:

```javascript
const queryKey = ["speech-sessions", userId];

```

Data flows through a two-tier caching architecture:

```
                        Supabase PostgreSQL
                                 │
                                 ▼
                       TanStack Query Engine
                      /                     \
                     ▼                       ▼
            In-Memory Cache          Persistent Storage
          (Active Session Data)        (localStorage)

```

### Multi-Tenant Cache Flushing

To eliminate cross-user cache contamination on shared hardware, logging out explicitly purges the query cache:

```javascript
const handleLogout = async () => {
  try {
    await logout();
  } finally {
    queryClient.clear(); // Purges all query keys from memory
  }
};

```

---

## Resilience & Retry Policies

| Operation | Offline Behavior | Retry Strategy |
| --- | --- | --- |
| **Read History** | Supported via persistent `localStorage` cache | `retry: 2` (up to three total attempts for retryable queries) |
| **Speech Capture** | Dependent on browser recognition driver | N/A |
| **Save Transcript** | Network required; failed requests surface an error | **No automatic retry** (prevents duplicate database records) |
| **Delete / Clear** | Network required; failed requests surface an error | **No automatic retry** |

### Concurrency Guards

Save operations track `isSaving` state to disable action controls during active network flights, preventing rapid duplicate submissions.

---

## Project Structure

```
speech-to-text-react/
├── public/
├── src/
│   ├── adapters/
│   │   ├── apiErrorAdapter.js
│   │   ├── speechAdapter.js
│   │   └── speechErrorAdapter.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StatusIndicator.jsx
│   │   ├── Transcript.jsx
│   │   ├── SpeechControls.jsx
│   │   ├── WordCount.jsx
│   │   ├── History.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   └── UpdatePasswordForm.jsx
│   ├── hooks/
│   │   ├── useSpeechRecognition.js
│   │   ├── useNetworkStatus.js
│   │   ├── useSpeechHistory.js
│   │   └── useAuth.js
│   ├── query/
│   │   ├── queryClient.js
│   │   ├── queryConfig.js
│   │   └── queryPersister.js
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   └── speechHistoryService.js
│   ├── storage/
│   │   └── transcriptStorage.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── README.md

```

---

## Local Development & Setup

### Prerequisites

* **Node.js:** `v18.0.0` or higher
* **Package Manager:** `npm`
* **Browser:** Modern browser supporting Web Speech API (Chrome, Edge, Safari)
* **Supabase Instance:** Active Supabase project with Auth and PostgreSQL enabled

### Execution Steps

1. **Clone Repository:**
```bash
git clone <repository-url>
cd speech-to-text-react

```


2. **Install Dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key

```


4. **Launch Development Engine:**
```bash
npm run dev

```


Navigate to `http://localhost:5173` in your browser.

---

## Architectural Tradeoffs & Design Decisions

* **`localStorage` vs. `IndexedDB`:** `localStorage` is used for persistent cache storage due to the modest size of textual transcript records. `IndexedDB` would become preferable if storing raw audio BLOBs.
* **Direct Supabase Integration vs. Custom Backend:** Interfacing with Supabase directly through custom services and database RLS satisfies all multi-tenant authorization requirements without introducing server infrastructure overhead.
* **TanStack Query vs. Global UI State:** Server state is cleanly isolated from local React component state, leveraging TanStack Query for cache invalidations, rehydration, and fetch lifecycle states.
* **Explicit Mutation Retries vs. Offline Write Queuing:** Automatic background syncing for mutations was intentionally omitted. Bypassing an offline write queue prevents silent synchronization conflicts, ambiguous mutation ordering, or accidental duplicate database inserts.

---

## Current Status & Feature Matrix

* [x] Web Speech API Engine Integration
* [x] Custom Hooks Architecture Layer
* [x] Supabase Auth & Session Persistence
* [x] PostgreSQL Row Level Security Isolation
* [x] TanStack Query Server State Management
* [x] Persistent Offline Read Access (`localStorage`)
* [x] Save Mutation Concurrency Guard
* [x] Centralized Data & Error Adapters
* [x] User-Scoped Cache Clearing on Logout
* [x] Responsive CSS Interface

