# SocialHub - Your Curated Knowledge Stream

A Next.js application for organizing and exploring your favorite YouTube content with AI-powered insights.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (Email/Password, Google, GitHub OAuth)
- **Deployment**: Vercel (recommended)

## Features

- 🔐 **Secure Authentication** - Email/password and social login (Google, GitHub)
- 📁 **Category Management** - Organize YouTube channels into custom categories
- ✨ **AI-Powered Insights** - Generate summaries, research insights, and creative ideas
- 🔖 **Save & Track** - Bookmark important content for later
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on all devices

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your credentials
3. Run the SQL schema from `/lib/supabase/schema.sql` in the Supabase SQL Editor

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Configure OAuth Providers (Optional)

For Google and GitHub login:

**Google OAuth:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Follow [Supabase Google Auth docs](https://supabase.com/docs/guides/auth/social-login/auth-google)

**GitHub OAuth:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable GitHub provider
3. Follow [Supabase GitHub Auth docs](https://supabase.com/docs/guides/auth/social-login/auth-github)

## Database Schema

The application uses the following tables:

- **categories** - User's knowledge categories with YouTube channels
- **widgets** - Content items generated from channels
- **saved_items** - Bookmarked content
- **user_preferences** - User settings (dark mode, onboarding status)

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Deployment on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home/routing page
│   ├── onboarding/        # Onboarding flow
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Main application
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/
│   ├── supabase/         # Supabase client configs
│   └── database.types.ts # TypeScript types
├── types/                # Application types
├── styles/               # Global styles
└── middleware.ts         # Auth middleware
```

## Security Notes

⚠️ **Important**: This is a demo/prototype application. For production use:

- Implement proper error handling
- Add rate limiting
- Set up email verification
- Configure proper CORS policies
- Use environment-specific configurations
- Implement proper logging and monitoring

## License

MIT
