Speech to Text --- React, Supabase & TanStack Query

<p align="center">

<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" alt="React"/>{=html}
<img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>{=html}
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"/>{=html}
<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>{=html}
<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3"/>{=html}
<img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white" alt="Supabase"/>{=html}
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"/>{=html}
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query"/>{=html}
<img src="https://img.shields.io/badge/Web_Speech_API-4285F4?logo=googlechrome&logoColor=white" alt="Web Speech API"/>{=html}
<img src="https://img.shields.io/badge/localStorage-Browser_API-6B7280" alt="localStorage"/>{=html}

</p>

<p align="center">

A browser-based speech-to-text application built from scratch and
progressively evolved into a structured React application with
authentication, cloud history, PostgreSQL persistence, Row Level
Security, server-state caching, persistent cache, offline-aware reads,
request control, and explicit security boundaries.

</p>

Why this project exists

A speech-to-text demo is easy to build. The browser can provide speech
recognition and React can display the resulting text. The engineering
problem begins when the application needs to behave like a real product.

Once users can sign in and save transcripts, the application has to
answer practical questions: where history lives, how users are isolated,
what happens after refresh, what happens offline, which state belongs in
React, which state belongs in server-state management, how backend
contracts are isolated from UI code, how repeated requests are
controlled, and what happens to cached data after logout.

This project was built by starting with the smallest useful
speech-recognition implementation and introducing architecture only when
a real requirement justified it. The result is a practical application
rather than a collection of technologies added for appearance.

What the application does

The application allows an authenticated user to start browser speech
recognition, see the transcript, stop or clear recognition, see a word
count, save sessions to Supabase, search/load/delete/clear history,
register, sign in, sign out, recover a forgotten password, and restore
authentication state after refresh.

It also persists the current transcript locally, persists TanStack Query
server-state cache, displays previously fetched history while offline,
prevents concurrent duplicate mutations, and normalizes backend data and
errors before they reach the UI.

The application does not claim fully offline speech recognition. The
Web Speech API may depend on browser/vendor recognition services, so
recognition can fail offline even when cached application data remains
available.

Screenshots

The screenshots below are part of the project repository and document the actual running application and its Supabase backend.

Authenticated application



This view shows the authenticated speech-to-text workspace, signed-in user, speech controls, transcript area, word count, and cloud-backed history.

Login page



This view shows the authentication entry point, including sign-in, registration, and password recovery navigation.

Supabase database



This view shows the public.speech_sessions table with the UUID session ID, authenticated user_id, transcript text, and created_at timestamp. It demonstrates that saved sessions are persisted in PostgreSQL rather than existing only in frontend state.

The image paths intentionally use repository-relative paths. The absolute Windows paths on your computer should not be placed in the README, because they will not work for someone cloning the repository.

Architecture

The application is separated by responsibility rather than by simply
creating more files:

                         Browser
                            │
                            ▼
                     React Application
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ▼                 ▼                  ▼
     Components          Custom Hooks       UI State
          │                 │
          │                 ├── Speech Recognition
          │                 ├── Authentication
          │                 ├── Network Status
          │                 └── Speech History
          │
          ▼
      Service Layer
          │
          ├── Auth Service
          ├── Speech History Service
          └── Supabase Client
          │
          ▼
       Supabase
     ┌───────────────┐
     │ Authentication│
     │ PostgreSQL    │
     │ RLS           │
     └───────────────┘
          │
          ▼
    TanStack Query
     ┌──────────────┐
     │ Memory Cache │
     │ Persistent   │
     │ Cache        │
     └──────────────┘

The key rule is that UI components do not need to know how Supabase
works. A component can call addSession(transcript) without knowing how
the database insert is implemented.

Components

src/components/
├── Header.jsx
├── StatusIndicator.jsx
├── Transcript.jsx
├── SpeechControls.jsx
├── WordCount.jsx
├── History.jsx
├── LoginForm.jsx
├── RegisterForm.jsx
├── ForgotPasswordForm.jsx
└── UpdatePasswordForm.jsx

Transcript renders transcript content. SpeechControls exposes
recognition actions. History presents and searches saved sessions.
Authentication forms own their respective authentication interactions.

The components intentionally do not contain Supabase queries.

Custom hooks

src/hooks/
├── useSpeechRecognition.js
├── useNetworkStatus.js
├── useSpeechHistory.js
└── useAuth.js

useSpeechRecognition

Owns the browser recognition lifecycle and exposes start, stop, clear,
and load operations. Browser API details stay inside the hook instead of
leaking into presentation components.

useAuth

Owns authentication state and actions such as login, register,
logout, sendPasswordReset, and changePassword. It also tracks
session, user, loading, errors, and recovery mode.

useSpeechHistory

Connects React to TanStack Query and the speech-history service. It owns
fetching, mutations, loading state, mutation state, invalidation,
user-scoped query keys, and offline-first reads.

useNetworkStatus

Tracks browser online/offline events and exposes isOnline to the UI.

Service layer

src/services/
├── supabaseClient.js
├── authService.js
└── speechHistoryService.js

supabaseClient.js creates the browser Supabase client from Vite
environment variables.

authService.js provides authentication operations including sign-up,
sign-in, sign-out, session lookup, auth-state subscription, password
reset, and password update.

speechHistoryService.js owns fetchSessions, createSession,
deleteSession, and clearSessions for public.speech_sessions.

The service layer also validates input before persistence. Empty
transcripts are rejected rather than becoming meaningless database
records.

Adapter layer

src/adapters/
├── speechAdapter.js
├── speechErrorAdapter.js
└── apiErrorAdapter.js

The adapter layer isolates external contracts from the application
model.

Supabase/database fields such as:

user_id
created_at

are normalized into application fields:

userId
createdAt

For example:

function normalizeSpeechSession(session) {
    return {
        id: session.id,
        userId: session.user_id,
        text: session.text,
        createdAt: session.created_at,
    };
}

The same boundary is used for speech errors and API errors. If an
external contract changes, the integration boundary is where the change
should be absorbed rather than propagating backend-specific names
throughout the UI.

End-to-end data flow

A save operation follows this path:

User speaks
    │
    ▼
Web Speech API
    │
    ▼
useSpeechRecognition()
    │
    ▼
Transcript state
    │
    ▼
Save Transcript
    │
    ▼
useSpeechHistory()
    │
    ▼
speechHistoryService
    │
    ▼
Supabase
    │
    ▼
PostgreSQL
    │
    ▼
speech_sessions
    │
    ▼
TanStack Query invalidation
    │
    ▼
Fresh history
    │
    ▼
History component

Database design

The persistent table is:

public.speech_sessions

Column         Type          Purpose

id           UUID          Unique session identifier
user_id      UUID          Authenticated owner
text         text          Saved transcript
created_at   timestamptz   Creation timestamp

Conceptually:

auth.users
    │
    │ user_id
    ▼
speech_sessions

A user can own multiple sessions.

Row Level Security

Row Level Security is enabled on speech_sessions. The authorization
model is based on the equivalent of:

auth.uid() = user_id

The database, rather than the React application, is the final
authorization boundary.

User A
  │
  ├── Read A's sessions      ✓
  ├── Create A's sessions    ✓
  └── Delete A's sessions    ✓

User B
  │
  ├── Read B's sessions      ✓
  ├── Create B's sessions    ✓
  └── Delete B's sessions    ✓

User A → B's sessions        ✗
User B → A's sessions        ✗

Frontend checks are useful for user experience, but they are not
sufficient authorization. RLS is the database-level control.

Authentication architecture

Normal authentication:

Register
   ↓
Email confirmation
   ↓
Sign in
   ↓
Authenticated application

Password recovery:

Forgot password
      ↓
Reset email
      ↓
Recovery session
      ↓
New password
      ↓
Normal authentication

The application listens for authentication state changes so React stays
synchronized with the provider.

Passwords are not stored in localStorage or in speech_sessions.

Client state vs server state

A deliberate distinction is made between local application state and
remote server state.

React state includes values such as:

transcript
isListening
authMode
isOnline

TanStack Query owns remote state such as:

speech history
history loading
save/delete/clear mutations
server cache

This prevents a remote database from being treated as if it were merely
another local React variable.

TanStack Query and caching

Speech history is server state, so TanStack Query handles it.

The query is scoped by authenticated user:

const queryKey = [
    "speech-sessions",
    userId,
];

After successful create, delete, or clear operations, the relevant query
is invalidated so fresh server data can be obtained.

Persistent query cache

The project also persists TanStack Query cache in browser storage:

                 Supabase
                    │
                    ▼
              TanStack Query
               /          \
              /            \
       Memory Cache    Persistent Cache
                           │
                       localStorage

This means previously fetched history can be restored after refresh
instead of always starting from an empty in-memory cache.

The persistent cache is still a cache. Supabase remains the source of
truth.

Offline behavior

The project distinguishes offline reads from offline writes.

Previously fetched history can remain visible when the browser is
offline. New cloud writes still require connectivity.

Operation                     Offline

View cached history           Supported
View current transcript       Supported
Read persisted browser data   Supported
Save new cloud session        Requires network
Delete cloud session          Requires network
Clear cloud history           Requires network
Browser speech recognition    May require network

A full offline-write queue has intentionally not been implemented
because it would introduce mutation persistence, reconciliation, retry,
conflict handling, and synchronization concerns that are not currently
required.

Request control

Remote mutations are protected against rapid repeated actions.

Save Transcript
      ↓
isSaving = true
      ↓
button disabled
      ↓
request completes
      ↓
button enabled

Delete and Clear History follow the same pattern.

The UI also communicates the active request through Saving...,
Deleting..., and Clearing... states.

This is deliberately simpler than building a general-purpose request
queue. A queue would be justified later for bulk uploads, external AI
processing, or another workload with genuine queueing/rate-limit
requirements.

Retry strategy

Reads and writes are treated differently.

Queries use limited retries with exponential backoff for transient
failures.

Mutations do not automatically retry. A write that was processed by the
server but whose response was lost can be dangerous to retry blindly
because the operation might not be idempotent.

The current policy is therefore:

Queries
→ limited retry + backoff

Mutations
→ no automatic retry
→ explicit pending state
→ user-controlled retry

Error normalization

Backend errors pass through:

src/adapters/apiErrorAdapter.js

and are converted into a predictable shape:

{
    message,
    code,
    status
}

Common status categories can be presented consistently:

401 / 403 → authentication or permission problem
429       → too many requests
5xx       → temporary server problem

This keeps backend-specific error formats out of presentation
components.

Security model

Security is layered.

Environment configuration

Only browser-safe configuration belongs in VITE_* variables. Never
expose a Supabase secret/service-role key in the frontend bundle.

Authentication

Supabase manages authentication rather than the application storing
passwords.

Authorization

RLS protects database rows.

Cache isolation

History queries are user-scoped and the React Query cache is cleared on
logout.

XSS

Transcript and history text are rendered as normal React text. The
application does not use dangerouslySetInnerHTML for user-controlled
content.

Input validation

Empty transcripts are rejected before persistence, and the service layer
can reject unreasonable transcript sizes.

Logout and cache isolation

Logout also clears server-state cache:

const handleLogout = async () => {
    try {
        await logout();
    } finally {
        queryClient.clear();
    }
};

The intended flow is:

User A
  ↓
Authenticated
  ↓
History cached
  ↓
Logout
  ↓
Supabase session ends
  ↓
TanStack cache cleared
  ↓
Login screen

This protects the client-side cache boundary in addition to
database-level RLS.

Why there is no Redux

Redux is technically possible, but it is not necessary for the current
state model.

The application already has a natural split:

Local UI state
→ React hooks

Remote server state
→ TanStack Query

Adding Redux only to increase the technology count would make the
application harder to explain without solving a current problem.

Why there is no custom backend

The current architecture is:

React
  ↓
Supabase client
  ↓
Supabase Auth + PostgreSQL + RLS

A custom backend becomes valuable when server-only secrets, proprietary
business logic, custom authorization, background jobs, server-side AI
processing, or server-controlled rate limiting are required.

For the current application, adding another backend would increase
deployment and maintenance complexity without providing a necessary
capability.

Why Web Speech API

The project focuses on application engineering rather than building a
speech-recognition model.

The Web Speech API provides speech recognition without introducing a
separate transcription backend, API credential, per-request
transcription service, or processing infrastructure.

The tradeoff is that browser speech recognition is not fully controlled
by the application. Browser support, permissions, recognition behavior,
and network dependency can vary.

Project structure

speech-to-text-react/
│
├── public/
│
├── src/
│   ├── adapters/
│   │   ├── apiErrorAdapter.js
│   │   ├── speechAdapter.js
│   │   └── speechErrorAdapter.js
│   │
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
│   │
│   ├── hooks/
│   │   ├── useSpeechRecognition.js
│   │   ├── useNetworkStatus.js
│   │   ├── useSpeechHistory.js
│   │   └── useAuth.js
│   │
│   ├── query/
│   │   ├── queryClient.js
│   │   ├── queryConfig.js
│   │   └── queryPersister.js
│   │
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   └── speechHistoryService.js
│   │
│   ├── storage/
│   │   └── transcriptStorage.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
└── README.md

The folders answer different engineering questions:

components → What does the user see?
hooks      → How does the application behave?
services   → How do we communicate externally?
adapters   → How do external contracts become application data?
query      → How is remote server state managed?
storage    → What browser state is persisted?

Technology stack

Technology                   Role

React                        Component-based UI
Vite                         Development server and build tooling
JavaScript                   Application language
HTML5                        Document structure
CSS3                         Styling and responsive layout
Web Speech API               Browser speech recognition
Supabase                     Authentication and backend platform
PostgreSQL                   Persistent speech-session storage
Row Level Security           Database authorization
TanStack Query               Server-state management and caching
TanStack Query persistence   Persistent server-state cache
localStorage                 Browser persistence
npm                          Dependency management

Local development

Requirements

Node.js

npm

A modern browser with Web Speech API support

A Supabase project

Installation

git clone <your-repository-url>
cd speech-to-text-react
npm install

Environment

Create .env in the project root:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_publishable_or_anon_key

Never commit .env.

Run

npm run dev

Vite will provide a local development URL such as
http://localhost:5173/.

Supabase setup

Create:

public.speech_sessions

with:

id          uuid
user_id     uuid
text        text
created_at  timestamptz

Enable Row Level Security and create policies that restrict records to
the authenticated owner using the equivalent of:

auth.uid() = user_id

Production build

npm run build
npm run preview

Before deployment, verify environment variables, authentication redirect
URLs, RLS, target-browser speech support, and multi-user isolation.

Performance considerations

The application reduces unnecessary server traffic through TanStack
Query caching, persistent cache, user-scoped query keys, mutation
invalidation, disabled window-focus refetching, bounded query retries,
no automatic mutation retries, and pending-mutation guards.

No formal load-test results are claimed. Performance numbers should only
be documented after actual measurements.

Failure scenarios considered

The project explicitly considers microphone permission errors, missing
microphones, no-speech events, recognition/network failures, Supabase
failures, repeated Save/Delete/Clear actions, logout, offline reads, and
multi-user data isolation.

The goal is not to eliminate every failure. The goal is to make failure
behavior explicit and predictable.

Engineering tradeoffs

localStorage instead of IndexedDB

Current data volume is small enough for localStorage. IndexedDB becomes
more appropriate if the application begins storing large amounts of
offline data, audio, or metadata.

Supabase instead of a custom backend

Supabase provides authentication, PostgreSQL, RLS, and a browser SDK
without requiring another application server.

TanStack Query instead of Redux for history

History is remote server state, so TanStack Query is designed for the
problem.

Browser speech recognition instead of an STT backend

This avoids transcription API costs, credentials, backend processing,
and an additional network dependency.

No offline mutation queue

A synchronization queue would be justified for a genuinely offline-first
product. It is intentionally absent here because the current
requirements do not need it.

No microservices

There is no current business reason to split this application into
multiple backend services.

Limitations

Speech recognition depends on browser support and the Web Speech API
implementation.

Offline cached history is supported, but offline speech recognition
may still fail.

New cloud sessions cannot currently be queued for later
synchronization.

The frontend communicates directly with Supabase rather than through
a custom backend.

A dedicated automated test suite still needs to be added before
claiming comprehensive production verification.

There is no dedicated production logging, tracing, or monitoring
layer yet.

Project status

React UI                         ✓
Web Speech API                  ✓
Component architecture          ✓
Custom hooks                    ✓
Service layer                   ✓
Data adapters                   ✓
Authentication                  ✓
Password recovery               ✓
Supabase PostgreSQL             ✓
Row Level Security              ✓
Cloud speech history            ✓
TanStack Query                  ✓
Persistent query cache          ✓
Offline cached reads            ✓
Network awareness               ✓
Mutation duplicate protection   ✓
Centralized API errors          ✓
User-scoped cache               ✓
Logout cache clearing           ✓
Responsive UI                   ✓

Development philosophy

Architecture should be driven by requirements, not by the number of
technologies in the stack.

TanStack Query exists because history is server state. RLS exists
because multiple users share a database. Persistent caching exists
because cached data should survive refreshes. Mutation guards exist
because repeated actions should not create concurrent requests. Adapters
exist because external contracts should not leak into UI code.

The project deliberately avoids infrastructure such as Redis, Kafka,
message queues, microservices, or a custom backend when there is no
current requirement for them.

Final architecture

                         ┌──────────────────────┐
                         │      React UI        │
                         │                      │
                         │ Components           │
                         │ Auth Forms           │
                         │ Transcript           │
                         │ History              │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Custom Hooks      │
                         │                      │
                         │ useAuth              │
                         │ useSpeechRecognition │
                         │ useSpeechHistory     │
                         │ useNetworkStatus     │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
             ┌──────────────┐                ┌──────────────┐
             │   Adapters   │                │   TanStack   │
             │              │                │    Query     │
             │ Data         │                │              │
             │ Errors       │                │ Cache        │
             │ Speech       │                │ Mutations    │
             └──────┬───────┘                │ Persistence  │
                    │                        └──────┬───────┘
                    ▼                               │
             ┌──────────────┐                       │
             │   Services   │◄──────────────────────┘
             │              │
             │ Auth         │
             │ Speech DB    │
             │ Supabase     │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────────┐
             │     Supabase     │
             │                  │
             │ Authentication  │
             │ PostgreSQL       │
             │ RLS              │
             └──────────────────┘

The architecture is intentionally practical: enough separation to keep
the application maintainable, enough backend security to support
multiple users, and enough caching and request control to behave like a
real application without introducing infrastructure the current problem
does not need.