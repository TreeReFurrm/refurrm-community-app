# Quick Start Guide - ReFURRM

## Running Locally (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup ✅ ALREADY DONE
Your `.env.local` file is already configured with Supabase credentials.

### 3. Start Development Server
```bash
npm run dev
```
Visit http://localhost:5173 in your browser.

### 4. Build for Production
```bash
npm run build
```
This creates a `dist` folder with your production-ready site.

### 5. Test Production Build
```bash
npm run preview
```

## Ready to Deploy?
See **DEPLOYMENT.md** for step-by-step instructions.

## Common Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## Project Structure
- `src/pages/` - All website pages
- `src/components/` - Reusable UI components
- `src/lib/supabase.ts` - Database connection
- `.env.local` - Your secret credentials (never commit!)

## Need Help?
Check DEPLOYMENT.md for publishing instructions.
