# Better Auth Setup

A modern, full-featured authentication system built with Next.js 15, Better Auth, and TypeScript. This application provides a complete authentication solution with email verification, password reset, social logins, magic links, and comprehensive profile management.

## ✨ Features

### 🔐 Authentication

- **Email & Password Sign-up/Sign-in** with server-side validation
- **Email Verification** using OTP (6-digit codes)
- **Password Reset** with secure email links
- **GitHub Social Login** with separate loading states
- **Magic Link Authentication** for passwordless sign-in
- **Remember Me** functionality for persistent sessions

### 👤 Profile Management

- **Profile Information** - Update name and profile image
- **Email Change** - Secure email updates with verification
- **Password Change** - Update password with current password validation
- **Image Upload** - Profile image with preview and removal
- **Real-time Updates** - Changes reflect immediately in the UI

### 🛡️ Security

- **Server-side Validation** using Better Auth hooks and Zod schemas
- **Cryptographically Secure** OTP generation
- **Role-based Access Control** (Admin/User roles)
- **Session Management** with automatic cleanup
- **CSRF Protection** and secure headers

### 🎨 UI/UX

- **Modern Design** with Tailwind CSS and shadcn/ui components
- **Dark/Light Mode** with system preference detection and manual toggle
- **Responsive Layout** optimized for all devices
- **Professional Email Templates** using React Email
- **Loading States** and error handling throughout
- **Toast Notifications** for user feedback
- **Consistent Styling** across all pages

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** Better Auth
- **Database:** Vercel Postgres (powered by Neon) with Prisma ORM
- **Styling:** Tailwind CSS + shadcn/ui
- **Theming:** next-themes for dark/light mode
- **Email:** React Email + Resend
- **Validation:** Zod schemas
- **Forms:** React Hook Form
- **TypeScript:** Full type safety
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── sign-up/
│   │   ├── sign-in/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── magic-link/
│   ├── (main)/                 # Main application routes
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── admin/
│   │   └── email-change/
│   ├── forbidden.tsx           # 403 error page
│   ├── unauthorized.tsx        # 401 error page
│   └── layout.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── UserAvatar.tsx
├── lib/
│   ├── auth.ts                 # Better Auth configuration
│   ├── auth-client.ts          # Client-side auth
│   ├── email.ts                # Email service
│   ├── prisma.ts               # Database client
│   ├── get-session.ts          # Server session helper
│   ├── email-templates/        # React Email templates
│   └── validations/            # Zod schemas
└── generated/
    └── prisma/                 # Generated Prisma client
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- Vercel account (for Vercel Postgres)
- Resend API key
- GitHub OAuth App (optional)

### Environment Variables

Copy the example environment file and configure your values:

```bash
cp .env.example .env
```

Then update the values in `.env` with your actual credentials. See `.env.example` for all required environment variables.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd better-auth-setup
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up the database:**

   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Push schema to database
   pnpm db:push

   # (Optional) Open Prisma Studio to view data
   pnpm db:studio
   ```

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Database
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Prisma Studio
```

## 📧 Email Templates

The application includes professional email templates for:

- **Email Verification** - OTP-based verification with responsive design
- **Password Reset** - Secure reset links with clear instructions
- **Magic Link** - Passwordless authentication emails
- **Email Change** - Verification for email address changes

All templates are built with React Email and optimized for various email clients.

## 🔒 Authentication Flow

### Sign-up Process

1. User enters name, email, and password
2. Server validates input using Zod schemas
3. Account created with `emailVerified: false`
4. OTP sent to user's email
5. User redirected to dashboard with verification banner
6. User verifies email using OTP input

### Sign-in Process

1. User enters email and password
2. Server validates credentials
3. Optional "Remember Me" for extended sessions
4. Redirect to dashboard or intended page

### Profile Management

1. **Profile Info:** Update name and image with real-time preview
2. **Email Change:** Secure verification sent to current email
3. **Password Change:** Requires current password validation

## 🛡️ Security Features

- **Input Validation:** All forms validated on both client and server
- **Password Requirements:** Enforced complexity rules
- **Rate Limiting:** Built-in protection against brute force attacks
- **Secure Sessions:** HTTP-only cookies with proper expiration
- **CSRF Protection:** Automatic protection for all forms
- **SQL Injection Prevention:** Prisma ORM with parameterized queries

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible design:

- **Forms:** React Hook Form integration with validation
- **Buttons:** Loading states and variants
- **Cards:** Consistent layouts for auth and profile pages
- **Messages:** Success, error, warning, and info alerts
- **Inputs:** Password visibility toggle and floating labels
- **OTP Input:** Accessible 6-digit code entry
- **Avatars:** User profile images with fallback initials

## 📱 Responsive Design

- **Mobile-first:** Optimized for all screen sizes
- **Touch-friendly:** Proper button sizing and spacing
- **Accessible:** ARIA labels and keyboard navigation
- **Fast Loading:** Optimized images and lazy loading

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Environment variables** are automatically configured from Vercel Postgres
3. **Deploy** - automatic builds on push to main branch

### Vercel Postgres Integration

The app uses Vercel's managed Postgres database (powered by Neon):

- **Serverless architecture** with automatic scaling
- **Branching** for database versioning and testing
- **Connection pooling** with PgBouncer integration
- **Built-in security** with SSL encryption
- **Global edge locations** for low latency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com) - Modern authentication library
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [React Email](https://react.email) - Email template system
- [Prisma](https://prisma.io) - Database toolkit
- [Resend](https://resend.com) - Email delivery service
