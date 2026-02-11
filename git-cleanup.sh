#!/bin/bash

# Git-based cleanup script for GitHub workspace
# This uses git rm to remove files, which works better with VFS workspaces

set -e

echo "🧹 Starting Git-based cleanup..."
echo ""

# Navigate to repo root
cd "$(git rev-parse --show-toplevel)" || exit 1

echo "📝 Creating commit with current changes..."
git add package.json CLEANUP_SUMMARY.md cleanup-duplicates.sh 2>/dev/null || true

echo ""
echo "🗑️  Removing duplicate and outdated files..."

# Root-level component duplicates
git rm -f Admin.tsx Analytics.tsx App.css main.tsx 2>/dev/null || true
git rm -f AppContext.tsx AuthContext.tsx Community.tsx FacilityPortal.tsx 2>/dev/null || true
git rm -f ImpactDashboard.tsx Index.tsx Login.tsx Marketplace.tsx 2>/dev/null || true
git rm -f MobileCamper.tsx NotFound.tsx Privacy.tsx Profile.tsx 2>/dev/null || true
git rm -f Rescue.tsx Resources.tsx Scanner.tsx Shop.tsx 2>/dev/null || true
git rm -f Signup.tsx Stories.tsx Terms.tsx "ValueEstimatorModal (1).tsx" 2>/dev/null || true
git rm -f use-mobile.tsx use-toast.ts 2>/dev/null || true

# Root-level data files
git rm -f analyticsData.ts impactData.ts mockData.ts storiesData.ts 2>/dev/null || true

# Root-level utility files
git rm -f utils.ts supabase.ts index.ts 2>/dev/null || true

# Old directories
git rm -rf src_old lib 2>/dev/null || true

# Documentation duplicates (keep in Docs/)
git rm -f DEPLOYMENT.md PLATFORM_SETUP_GUIDE.md QUICK_START.md 2>/dev/null || true

# Config duplicates
git rm -f postcss.config.js index.css 2>/dev/null || true

# Next.js files (app is Vite)
git rm -f next.config.ts next-env.d.ts vercel.json 2>/dev/null || true
git rm -rf .next 2>/dev/null || true

# Cleanup old component directories
git rm -rf components/app components/valuscan components/layout 2>/dev/null || true

# Remove files from cleanup-delete-list.txt
if [ -f cleanup-delete-list.txt ]; then
    while IFS= read -r file; do
        if [ ! -z "$file" ]; then
            git rm -f "$file" 2>/dev/null || true
        fi
    done < cleanup-delete-list.txt
fi

# Miscellaneous
git rm -f cleanup-delete-list.txt copy.code-workspace placeholder.svg.pdf 2>/dev/null || true

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Changes made:"
git status --short

echo ""
echo "🚀 Next steps:"
echo "  1. Review changes: git diff --cached"
echo "  2. Commit changes: git commit -m 'Remove duplicate files and fix Vite configuration'"
echo "  3. Install dependencies: npm install"
echo "  4. Test the app: npm run dev"
echo ""
