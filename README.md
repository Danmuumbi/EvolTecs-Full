evoltech-platform/
│
├── frontend/                      # React + TypeScript + Tailwind
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/
│   │       ├── images/
│   │       └── fonts/
│   │
│   ├── src/
│   │   ├── main.tsx              # Entry point
│   │   ├── App.tsx               # Main component with routing
│   │   ├── index.css             # Tailwind imports
│   │   │
│   │   ├── routes/               # Public routes
│   │   │   ├── Home/
│   │   │   ├── Services/
│   │   │   ├── Hosting/
│   │   │   ├── Domains/
│   │   │   ├── About/
│   │   │   └── Contact/
│   │   │
│   │   ├── routes/               # Protected routes (Client)
│   │   │   ├── Dashboard/
│   │   │   ├── MyDomains/
│   │   │   ├── MyHosting/
│   │   │   ├── MyEmails/
│   │   │   ├── Invoices/
│   │   │   ├── Support/
│   │   │   └── Profile/
│   │   │
│   │   ├── routes/               # Protected routes (Admin)
│   │   │   ├── AdminDashboard/
│   │   │   ├── ManageUsers/
│   │   │   ├── ManageDomains/
│   │   │   ├── ManageHosting/
│   │   │   ├── ManagePayments/
│   │   │   └── ManageSupport/
│   │   │
│   │   ├── components/           # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   └── Loader/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── PublicLayout/
│   │   │   │   ├── ClientLayout/
│   │   │   │   └── AdminLayout/
│   │   │   │
│   │   │   └── forms/
│   │   │       ├── DomainSearch/
│   │   │       ├── ContactForm/
│   │   │       ├── LoginForm/
│   │   │       ├── RegisterForm/
│   │   │       └── SupportForm/
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/              # Context providers
│   │   │   ├── AuthContext/
│   │   │   └── ThemeContext/
│   │   │
│   │   ├── utils/               # Helper functions
│   │   │   ├── validators/
│   │   │   ├── formatters/
│   │   │   └── constants/
│   │   │
│   │   ├── types/              # TypeScript types/interfaces
│   │   ├── api/                # API client
│   │   └── styles/             # Additional styles
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── index.ts            # Entry point
│   │   ├── app.ts              # Express app setup
│   │   │
│   │   ├── config/             # Configuration
│   │   │   ├── database.ts
│   │   │   ├── auth.ts
│   │   │   └── resellerclub.ts
│   │   │
│   │   ├── models/             # Database models
│   │   │   ├── User/
│   │   │   ├── Domain/
│   │   │   ├── Hosting/
│   │   │   ├── Email/
│   │   │   ├── Invoice/
│   │   │   ├── Payment/
│   │   │   ├── SupportTicket/
│   │   │   └── Service/
│   │   │
│   │   ├── controllers/        # Business logic
│   │   │   ├── authController/
│   │   │   ├── domainController/
│   │   │   ├── hostingController/
│   │   │   ├── emailController/
│   │   │   ├── paymentController/
│   │   │   ├── supportController/
│   │   │   └── adminController/
│   │   │
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── domain.routes.ts
│   │   │   ├── hosting.routes.ts
│   │   │   ├── email.routes.ts
│   │   │   ├── payment.routes.ts
│   │   │   ├── support.routes.ts
│   │   │   └── admin.routes.ts
│   │   │
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.ts
│   │   │   ├── admin.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── services/           # External services
│   │   │   ├── resellerclub/
│   │   │   ├── mpesa/
│   │   │   └── email/
│   │   │
│   │   ├── validators/         # Request validation
│   │   ├── utils/              # Helpers
│   │   └── types/              # Type definitions
│   │
│   ├── prisma/                 # Prisma schema (if using Prisma)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docker/                      # Docker configurations
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── docs/                       # Project documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── SCHEMA.md
│
├── .env.example
├── .gitignore
├── README.md
└── package.json                # Root package for monorepo scripts



npm run dev