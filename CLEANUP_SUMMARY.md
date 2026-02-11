# Duplicate Files Cleanup Summary

## Overview
This project had significant file duplication between root level and the `src/` directory, as well as Next.js configuration files for what is actually a Vite + React application.

## Changes Made

### 1. ✅ Fixed package.json (COMPLETED)
- **Changed**: Updated from Next.js to Vite scripts
  - `"dev": "next dev"` → `"dev": "vite"`
  - `"build": "next build"` → `"build": "tsc && vite build"`
  - Removed Next.js specific packages (`next`, `@genkit-ai/next`)
  - Added Vite dependencies (`@vitejs/plugin-react-swc`, `vite`)
  - Added missing dependencies (`@stripe/stripe-js`, `@tanstack/react-query`)

### 2. Files to be Removed

#### Root-Level Component Duplicates (Sources are in `src/`)
- Admin.tsx
- Analytics.tsx
- App.css
- main.tsx
- AppContext.tsx
- AuthContext.tsx
- Community.tsx
- FacilityPortal.tsx
- ImpactDashboard.tsx
- Index.tsx
- Login.tsx
- Marketplace.tsx
- MobileCamper.tsx
- NotFound.tsx
- Privacy.tsx
- Profile.tsx
- Rescue.tsx
- Resources.tsx
- Scanner.tsx
- Shop.tsx
- Signup.tsx
- Stories.tsx
- Terms.tsx
- ValueEstimatorModal (1).tsx
- use-mobile.tsx
- use-toast.ts

#### Root-Level Data File Duplicates (Sources are in `src/data/`)
- analyticsData.ts
- impactData.ts
- mockData.ts
- storiesData.ts

#### Root-Level Utility Duplicates (Sources are in `src/lib/`)
- utils.ts
- supabase.ts
- index.ts

#### Directories to Remove
- `src_old/` - Old source code
- `lib/` - Duplicate of `src/lib/`
- `components/app/` - Old Next.js-style pages
- `components/valuscan/` - Old Next.js-style pages
- `.next/` - Next.js build directory (not needed for Vite)

#### Documentation Duplicates (Sources are in `Docs/`)
- DEPLOYMENT.md (root) - Keep in `Docs/`
- PLATFORM_SETUP_GUIDE.md (root) - Keep in `Docs/`
- QUICK_START.md (root) - Keep in `Docs/`

#### Config File Cleanup
- postcss.config.js - Remove (keep .mjs version)
- index.css (root) - Remove (exists in src/)
- next.config.ts - Remove (Vite app, not Next.js)
- next-env.d.ts - Remove (Vite app, not Next.js)
- vercel.json - Can be removed (Vite can deploy without it)

#### Miscellaneous
- cleanup-delete-list.txt - Remove after cleanup complete
- copy.code-workspace - Duplicate workspace file
- placeholder.svg.pdf - Unnecessary file

### 3. Files to Keep

#### Essential for Vite App
- ✅ vite.config.ts - Vite configuration
- ✅ index.html - Entry point for Vite
- ✅ src/ - Main source directory
- ✅ tailwind.config.ts - Tailwind CSS config
- ✅ tsconfig files - TypeScript configuration
- ✅ eslint.config.js - Linting configuration
- ✅ components.json - shadcn/ui configuration

#### Project Structure
```
refurrm-community-app/
├── index.html (Vite entry)
├── package.json (Updated for Vite)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx (App entry point)
│   ├── App.tsx (Main app component)
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── types/
├── public/
├── Docs/
├── genkit/
└── stripe/
```

## Execution

Run the cleanup script:
```bash
chmod +x cleanup-duplicates.sh
./cleanup-duplicates.sh
```

Or manually execute the deletions using your preferred method.

## After Cleanup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Notes

- The project is a **Vite + React** application with **React Router** for routing
- All Next.js dependencies and configuration have been removed
- The actual source code is in `src/` directory
- All root-level component files are duplicates and safe to remove
