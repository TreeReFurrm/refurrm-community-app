# ReFURRM Community App

ReFURRM is a platform dedicated to rescuing pets from storage units and connecting them with loving homes. It provides tools for ethical buyers, volunteers, and families to facilitate the rescue and rehoming process.

---

## 👉 **[START_HERE.md](START_HERE.md)** ⭐ Read This First!

---

## 🚨 IMPORTANT: Action Required

This repository has been **configured and ready for deployment**, but contains duplicate files that need to be removed first.

### ⚡ Quick Start (3 Steps)

```bash
# 1. Clean up duplicates
chmod +x git-cleanup.sh && ./git-cleanup.sh

# 2. Install dependencies
npm install

# 3. Start developing
npm run dev
```

Visit http://localhost:8080 🚀

---

## 📖 Complete Setup Guide

### 1️⃣ **Read This First**
👉 **[DEPLOYMENT_ACTION_PLAN.md](DEPLOYMENT_ACTION_PLAN.md)** - Complete step-by-step guide

### 2️⃣ **Run Cleanup Script**
```bash
chmod +x git-cleanup.sh
./git-cleanup.sh
```

### 3️⃣ **Set Up Environment**
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 4️⃣ **Install & Run**
```bash
npm install
npm run dev
```

### 5️⃣ **Verify Setup**
```bash
chmod +x verify-deployment-ready.sh
./verify-deployment-ready.sh
```

---

## 📚 Documentation

### Getting Started
- **[DEPLOYMENT_ACTION_PLAN.md](DEPLOYMENT_ACTION_PLAN.md)** - ⭐ START HERE - Step-by-step action plan
- **[DEPLOYMENT_READY.md](DEPLOYMENT_READY.md)** - Complete deployment readiness guide
- **[CLEANUP_SUMMARY.md](CLEANUP_SUMMARY.md)** - Detailed list of duplicate files

### Cleanup Scripts
- **[git-cleanup.sh](git-cleanup.sh)** - ⭐ Recommended cleanup script (uses git)
- **[cleanup-duplicates.sh](cleanup-duplicates.sh)** - Alternative cleanup script
- **[verify-deployment-ready.sh](verify-deployment-ready.sh)** - Verification script

### Original Documentation
- **[Docs/QUICK_START.md](Docs/QUICK_START.md)** - Local development instructions
- **[Docs/DEPLOYMENT.md](Docs/DEPLOYMENT.md)** - Deployment instructions
- **[Docs/PLATFORM_SETUP_GUIDE.md](Docs/PLATFORM_SETUP_GUIDE.md)** - Platform setup guide

## Project Structure

- `src/pages/`: All website pages
- `src/components/`: Reusable UI components
- `src/lib/supabase.ts`: Database connection
- `.env.local`: Your secret credentials (never commit!)

## Features

- **Community Access:** Free access for families, volunteers, and the public.
- **Pro Subscription:** Paid tier for ethical buyers with AI scanning tools, ROI analytics, and auction alerts.
- **Ambassador Role:** Invitation-only leadership role for coordinating local rescue efforts.
- **Supabase Integration:** Backend for authentication, database, and edge functions.
- **Stripe Integration:** For handling Pro subscription payments.

## Technologies Used

- React
- TypeScript
- Vite
- Supabase
- Stripe
- Vercel (for deployment)

## Support

For any issues or questions, please refer to the `TROUBLESHOOTING` section in `DEPLOYMENT.md` or consult the respective documentation for the technologies used.
