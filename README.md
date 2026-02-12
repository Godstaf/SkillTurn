<p align="center">
  <h1 align="center">🎓 SkillTurn</h1>
  <p align="center">
    <strong>Connecting Students, Faculty & Recruiters — One Platform.</strong>
  </p>
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#api-reference">API Reference</a> •
    <a href="#contributing">Contributing</a>
  </p>
</p>

---

## 📋 Overview

**SkillTurn** is a full-stack academic portal that bridges the gap between **students**, **faculty**, and **recruiters**. Students can discover projects and internships, track applications, and showcase their skills. Faculty can post opportunities and manage applicants, while recruiters can publish job openings and shortlist candidates — all from a single, sleek interface.

---

## ✨ Features

| Role | Capabilities |
|---|---|
| **🎒 Student** | Browse opportunities, apply to projects & internships, manage applications via a personal dashboard, build a skill profile |
| **👨‍🏫 Faculty** | Post academic projects, review student applications, manage a faculty dashboard |
| **💼 Recruiter** | Publish job postings, view applicants, manage recruitment from a dedicated dashboard |

**Shared Features**
- 🔐 Secure authentication with JWT (login & registration)
- 🌗 Light / Dark theme toggle
- 📱 Fully responsive design with glassmorphism UI
- ⚡ Smooth page transitions & micro-animations (Framer Motion)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **next-themes** | Dark / Light mode support |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance Python API |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **PyMongo** | MongoDB driver for Python |
| **python-jose** | JWT token handling |
| **Passlib (Argon2)** | Password hashing |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.9+
- **Git**

### 1 · Clone the Repository

```bash
git clone https://github.com/Godstaf/studentPortal.git
cd studentPortal
```

### 2 · Backend Setup

```bash
# Navigate to the backend directory
cd backend

# (Recommended) Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install fastapi uvicorn pymongo certifi python-jose[cryptography] passlib[argon2] python-multipart

# Start the API server
uvicorn app:app --reload
```

The API will be available at **`http://127.0.0.1:8000`**.

### 3 · Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
# From the project root
npm install

# Start the development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Project Structure

```
SkillTurn/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Student dashboard
│   │   ├── facultydash/        # Faculty dashboard
│   │   ├── facultyprofile/     # Faculty profile page
│   │   ├── forms/              # Various input forms
│   │   ├── login/              # Authentication page
│   │   ├── opportunities/      # Browse & view opportunities
│   │   ├── recruiter_dashboard/# Recruiter dashboard
│   │   ├── r-posted_jobs/      # Recruiter's posted jobs
│   │   ├── roles/              # Role selection
│   │   ├── studentForm/        # Student profile form
│   │   ├── studentProfiles/    # Student profile listings
│   │   ├── layout.tsx          # Root layout with navbar
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles & theme tokens
│   ├── components/
│   │   ├── layout/             # Navbar & layout components
│   │   └── ui/                 # Reusable UI components (Button, Card, Glass, etc.)
│   ├── context/                # React context (Auth)
│   └── data/                   # Static/mock data
├── backend/
│   ├── app.py                  # FastAPI entry point & CORS config
│   ├── login.py                # Authentication routes (JWT)
│   ├── register.py             # User registration routes
│   ├── student.py              # Student-specific API routes
│   ├── CRUD.py                 # Pydantic models & database operations
│   ├── database.py             # MongoDB connection & collections
│   ├── init_db.py              # Database seeding script
│   └── schema.md               # Database schema documentation
├── public/                     # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check / welcome message |
| `POST` | `/auth/login` | Authenticate user & return JWT |
| `POST` | `/auth/register` | Register a new user |
| `GET` | `/student/profile` | Fetch student profile |

> **Note:** Full API documentation is auto-generated at **`http://127.0.0.1:8000/docs`** (Swagger UI) when the backend is running.

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| **CORS errors** (`Failed to fetch`) | Ensure backend runs on port `8000` and frontend on port `3000`. CORS is configured in `backend/app.py`. |
| **Database connection failed** | Verify internet access — the connection string in `backend/database.py` points to MongoDB Atlas. |
| **Module not found (Python)** | Make sure the virtual environment is activated and all `pip` packages are installed. |
| **Port already in use** | Kill the process occupying the port: `lsof -ti:8000 \| xargs kill` (macOS/Linux). |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Godstaf">Godstaf</a>
</p>
