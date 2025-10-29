# AGENTS.md - SocialHub Development Guide

## Commands
- **Dev**: `npm run dev` - Start Next.js dev server on port 3000
- **Build**: `npm run build` - Production build with type checking
- **Lint**: `npm run lint` - Run ESLint on codebase
- **Type Check**: `npx tsc --noEmit` - Check TypeScript types without emitting files

## Architecture
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Auth**: Supabase Auth (email/password + OAuth)
- **UI**: shadcn/ui components with Radix UI primitives, Tailwind CSS
- **Structure**: `src/app/` (routes), `src/components/` (UI), `src/lib/` (services/API), `src/hooks/` (React hooks)
- **Key Routes**: `/` (redirect), `/onboarding`, `/auth`, `/dashboard` (main app)
- **Database Layer**: `src/lib/api/` (categories, widgets, savedItems, userPreferences), `src/lib/supabase/` (client/server/middleware)

## Code Style
- **Imports**: Use `@/` alias for src imports (e.g., `@/components`, `@/lib/supabase/client`)
- **Components**: Client components use `'use client'` directive, server components by default
- **Naming**: PascalCase for components/types, camelCase for functions/variables, kebab-case for files
- **Types**: Use Supabase-generated types from `src/lib/database.types.ts` for DB operations
- **Error Handling**: Use try-catch with console.error, display user-friendly messages in UI
- **Styling**: Tailwind classes directly in JSX, use `cn()` utility for conditional classes
- **Env Vars**: `NEXT_PUBLIC_` prefix for client-side, plain for server-side (see `.env.local`)
- **Database**: Always use RLS policies, never disable. Use `createClient()` for browser, `await createClient()` for server
- **Supabase Queries**: Include error handling, use `.select()`, `.single()` for one record, destructure `{ data, error }`
