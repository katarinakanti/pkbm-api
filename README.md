# pkbm-api

Centralized REST API backend for the PKBM Budiman Drestanta administrative platform. Serves both the student-facing client and the admin dashboard, handling authentication, document submissions, file storage, and workflow management.

> Part of a three-repo system — see [pkbm-client](https://github.com/katarinakanti/pkbm-client) and [pkbm-admin](https://github.com/katarinakanti/pkbm-admin).

## Tech Stack

- Node.js, Express, TypeScript
- Supabase (PostgreSQL + File Storage)
- Built with [Naiv](https://naiv.fun)
- Deployed on [Keyob](https://keyob.io)

## Features

- JWT-based authentication for both client and admin roles
- Document submission and file upload endpoints
- Submission status and workflow management
- Supabase-backed storage for secure file handling
- Single API serving both frontend applications

## Folder Structure

```
pkbm-api/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── repositories/    # Database queries
│   ├── middlewares/     # Auth, error handling
│   ├── routes/          # Express route definitions
│   ├── types/
│   ├── utils/
│   └── index.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- A [Supabase](https://supabase.com) project with a storage bucket configured

### Installation

```bash
git clone https://github.com/katarinakanti/pkbm-api
cd pkbm-api
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Run Locally

```bash
npm run dev
```

The API runs on `http://localhost:3000` by default.

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Auth

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/login` | Login and receive JWT token | Public |
| POST | `/auth/logout` | Invalidate session | Authenticated |

### Submissions

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/submissions` | List all submissions | Admin |
| GET | `/submissions/:id` | Get submission detail | Authenticated |
| POST | `/submissions` | Create new submission | Client |
| PATCH | `/submissions/:id/status` | Update submission status | Admin |
| DELETE | `/submissions/:id` | Delete a submission | Admin |

### Files

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/files/upload` | Upload a document file | Authenticated |
| GET | `/files/:id` | Retrieve a file | Authenticated |

### Records

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/records` | List all records | Admin |
| GET | `/records/:id` | Get a specific record | Authenticated |
| PATCH | `/records/:id` | Update a record | Admin |

> **Note:** All non-public endpoints require a `Bearer` token in the `Authorization` header.

## Related Repos

| Repo | Role |
|------|------|
| [pkbm-client](https://github.com/katarinakanti/pkbm-client) | Student-facing portal |
| [pkbm-admin](https://github.com/katarinakanti/pkbm-admin) | Administrator dashboard |

## Author

[Katarina Kanti Moksakamarga](https://linkedin.com/in/katarinakantim)
