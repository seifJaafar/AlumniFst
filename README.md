<div align="center">

<img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

# 🎓 FST Alumni Network

**A full-stack platform connecting alumni, students, and admin of the Faculté des Sciences de Tunis — Université de Tunis El Manar.**

Browse alumni profiles · Discover job opportunities · Join events · Find a mentor

</div>

---

## 📸 Screenshots

> _Screenshots will be added here._

---

## ✨ Features

### 👤 User & Profile Management
- Role-based accounts: **Alumni**, **Student (Étudiant)**, **Admin**
- Enriched profiles with bio, skills, experience timeline, and education history
- Public profile view with privacy controls — email and phone visible to owner only
- Admin account validation workflow for new registrations

### 🔍 People Search
- Real-time navbar search with debounce across all users
- Filter by role (Alumni / Student / Admin)
- Results link directly to public profiles

### 📅 Events
- Browse upcoming and past events with category filters
- Online registration with capacity tracking and progress indicator
- Admin tools to create, edit, and delete events
- In-app notifications for event updates

### 💼 Job Opportunities
- Alumni-posted job and internship listings
- Filter by job type and sector
- Full detail view linking back to the posting alumni's profile

### 🤝 Mentorship
- Browse mentor-available alumni with skills and bio
- Send, accept, and decline mentorship requests
- Session history and feedback system
- Admin oversight of all mentorship relationships

### 📊 Statistics & Map
- Admin dashboard with charts — alumni by promotion year, sector, event participation
- Interactive world map showing alumni locations
- CSV / Excel export of alumni directory

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3, Spring Security, Spring Data JPA |
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| State / Data | TanStack Query (React Query) |
| Database | PostgreSQL |
| Auth | JWT (stateless, HttpOnly cookie) |
| Build | Maven (backend), npm (frontend) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│   React + TypeScript  ·  React Query  ·  React Router  │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTPS / REST
┌───────────────────────────▼─────────────────────────────┐
│                     Spring Boot API                     │
│   Controllers  →  Services  →  Repositories  →  JPA    │
│              Spring Security (JWT filter)               │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│                      PostgreSQL                         │
│   users · alumni · etudiants · admins · events         │
│   experiences · education · skills · mentorships       │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.9+

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fst-alumni-network.git
cd fst-alumni-network
```

### 2. Backend setup

```bash
cd backend
```

Create `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/alumni_db
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# JWT
app.jwt.secret=your_jwt_secret_min_32_chars
app.jwt.expiration=86400000

# CORS
app.cors.allowed-origin=http://localhost:5173
```

Run the backend:

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Run the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new account | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `POST` | `/api/auth/logout` | Invalidate session | Required |

### Users & Profiles

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users/profile` | Get own full profile | Required |
| `PUT` | `/api/users/profile` | Update base profile fields | Required |
| `GET` | `/api/users/{id}` | Get public profile of any user | Required |
| `GET` | `/api/users/search` | Search users `?q=&role=&page=&size=` | Required |

### Sections (lazy-loaded per profile)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users/{id}/experiences` | Get experience list | Required |
| `POST` | `/api/users/experiences` | Add experience | Required |
| `GET` | `/api/users/{id}/education` | Get education list | Required |
| `POST` | `/api/users/education` | Add education entry | Required |
| `GET` | `/api/users/{id}/skills` | Get skills | Required |
| `POST` | `/api/users/skills` | Add skill | Required |
| `DELETE` | `/api/users/skills/{id}` | Remove skill | Required |

### Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/events` | List events `?status=upcoming\|past` | Required |
| `POST` | `/api/events` | Create event | Alumni / Admin |
| `GET` | `/api/events/{id}` | Get event details | Required |
| `PUT` | `/api/events/{id}` | Update event | Admin |
| `DELETE` | `/api/events/{id}` | Delete event | Admin |
| `POST` | `/api/events/{id}/register` | Register for event | Required |

### Opportunities

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/opportunities` | List opportunities `?type=&sector=` | Required |
| `POST` | `/api/opportunities` | Post opportunity | Alumni |
| `GET` | `/api/opportunities/{id}` | Get details | Required |
| `PUT` | `/api/opportunities/{id}` | Edit own opportunity | Alumni |
| `DELETE` | `/api/opportunities/{id}` | Delete own opportunity | Alumni |

### Mentorship

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/mentorship/mentors` | List available mentors | Required |
| `POST` | `/api/mentorship/request` | Send mentorship request | Student |
| `PUT` | `/api/mentorship/{id}/accept` | Accept request | Alumni |
| `PUT` | `/api/mentorship/{id}/decline` | Decline request | Alumni |
| `GET` | `/api/mentorship/sessions` | Get session history | Required |

---

## 🗂️ Project Structure

```
fst-alumni-network/
│
├── backend/
│   └── src/main/java/com/seif/api/
│       ├── config/          # SecurityConfig, JwtConfig, CORS
│       ├── controller/      # REST controllers
│       ├── dto/
│       │   ├── request/     # UpdateProfileRequest, etc.
│       │   └── response/    # UserProfileResponse, PublicUserProfileResponse, etc.
│       ├── exception/       # ApiException, GlobalExceptionHandler
│       ├── model/           # User, Alumni, Etudiant, Admin, Experience, Skill…
│       ├── repository/      # JPA repositories + Specifications
│       ├── response/        # ApiResponse wrapper, ResponseUtil
│       └── service/         # Business logic
│
└── frontend/
    └── src/
        ├── components/      # Shared UI components (Navbar, NotificationBell…)
        ├── contexts/        # AuthContext
        ├── hooks/           # useProfile, useExperiences, useSkills…
        ├── lib/             # axios instance, queryKeys
        ├── pages/
        │   ├── profile/     # ProfilePage + components + helpers
        │   ├── alumni/      # Alumni directory
        │   ├── events/      # Events listing & detail
        │   ├── opportunities/
        │   └── mentorship/
        ├── services/        # userService, authService…
        └── types/           # profile.types.ts, shared TS interfaces
```

---

## 👥 User Roles

| Role | Registration | Capabilities |
|------|-------------|--------------|
| **Alumni** | Self-register (pending validation) | Full profile, post opportunities, create events, be a mentor |
| **Étudiant** | Self-register (pending validation) | Browse directory, request mentorship, register for events |
| **Admin** | Created by super admin | Validate accounts, manage events, view statistics, export data |

---

## 🔐 Security

- Passwords hashed with **BCrypt**
- Authentication via **JWT** — stateless, no server-side sessions
- All endpoints except `/api/auth/**` require a valid token
- Role checks enforced at the service layer (`@PreAuthorize` + manual checks)
- Private fields (`email`, `phone`, `informations`) never exposed through public endpoints

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 👨‍💻 Team

| Name | Role |
|------|------|
| **Jaafar Seif** | Full-stack development |

Faculté des Sciences de Tunis — Université de Tunis El Manar
Academic year 2025/2026

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ at FST — Université de Tunis El Manar</sub>
</div>
