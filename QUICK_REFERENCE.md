# 🚀 Quick Reference - Deployment Commands

## First Time Setup (Run Once)

### 1. Cleanup Duplicates
```bash
chmod +x git-cleanup.sh
./git-cleanup.sh
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 4. Verify Everything
```bash
chmod +x verify-deployment-ready.sh
./verify-deployment-ready.sh
```

## Development Commands

### Start Development Server
```bash
npm run dev
```
→ Opens at http://localhost:8080

### Build for Production
```bash
npm run build
```
→ Creates `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Environment Variables (in .env file)

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Firebase (optional)
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Genkit (optional for AI)
GOOGLE_GENAI_API_KEY=your_genai_key
```

## Deployment Platforms

### Vercel (Recommended)
```bash
# After pushing to GitHub
# 1. Go to vercel.com
# 2. Import your GitHub repo
# 3. Set build settings:
#    - Framework: Vite
#    - Build: npm run build
#    - Output: dist
# 4. Add environment variables
# 5. Deploy
```

### Netlify
```bash
# Build settings:
# - Build command: npm run build
# - Publish directory: dist
```

### Manual Deploy
```bash
npm run build
# Upload dist/ folder to your hosting
```

## Troubleshooting

### Clear Everything & Reinstall
```bash
rm -rf node_modules package-lock.json dist .vite
npm install
```

### Fix Import Errors
- All imports should use `@/` prefix
- Example: `import { Button } from '@/components/ui/button'`

### Environment Variables Not Working
- Prefix must be `VITE_` for client-side access
- Restart dev server after changing `.env`

## Project Structure

```
src/
├── main.tsx           # Entry point
├── App.tsx            # Main app component
├── components/        # React components
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── lib/               # Utilities & configs
├── pages/             # Page components
└── types/             # TypeScript types
```

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts (Vite config) |
| `vite.config.ts` | Vite bundler configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `index.html` | App entry point (Vite) |
| `.env` | Environment variables (create from .env.example) |

## Documentation Files

| Read This... | When You Need To... |
|--------------|---------------------|
| `DEPLOYMENT_ACTION_PLAN.md` | Know what to do next |
| `DEPLOYMENT_READY.md` | Deploy the app |
| `CLEANUP_SUMMARY.md` | Understand what was cleaned up |
| `README.md` | Get an overview |
| `verify-deployment-ready.sh` | Check if everything is ready |

## Common Issues

**Q: Build fails with module not found**  
A: Run `npm install` and check imports use `@/` prefix

**Q: Environment variables are undefined**  
A: Ensure variables are prefixed with `VITE_` in `.env`

**Q: Page doesn't load in browser**  
A: Check console for errors, verify routes in `src/App.tsx`

**Q: Cleanup script fails**  
A: Try the alternative script or manually delete files from `CLEANUP_SUMMARY.md`

## Need Help?

1. Check `DEPLOYMENT_READY.md` for detailed guides
2. Run `./verify-deployment-ready.sh` to diagnose issues
3. Review error messages in terminal
4. Check browser console for client-side errors

---

**Remember:** All imports use `@/` → no code changes needed after cleanup! 🎉
