#!/bin/bash

# Comprehensive cleanup script to remove all duplicate and outdated files
# Run this from the project root directory

set -e

echo "🧹 Starting comprehensive cleanup of duplicate files..."

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to safely remove file or directory
safe_remove() {
    if [ -e "$1" ]; then
        rm -rf "$1"
        echo -e "${GREEN}✓${NC} Removed: $1"
    else
        echo -e "${BLUE}ℹ${NC} Already gone: $1"
    fi
}

echo ""
echo "📁 Phase 1: Removing src_old directory..."
safe_remove "src_old"

echo ""
echo "📄 Phase 2: Removing root-level component duplicates (actual sources in src/)..."
safe_remove "Admin.tsx"
safe_remove "Analytics.tsx"
safe_remove "App.css"
safe_remove "main.tsx"
safe_remove "AppContext.tsx"
safe_remove "AuthContext.tsx"
safe_remove "Community.tsx"
safe_remove "FacilityPortal.tsx"
safe_remove "ImpactDashboard.tsx"
safe_remove "Index.tsx"
safe_remove "Login.tsx"
safe_remove "Marketplace.tsx"
safe_remove "MobileCamper.tsx"
safe_remove "NotFound.tsx"
safe_remove "Privacy.tsx"
safe_remove "Profile.tsx"
safe_remove "Rescue.tsx"
safe_remove "Resources.tsx"
safe_remove "Scanner.tsx"
safe_remove "Shop.tsx"
safe_remove "Signup.tsx"
safe_remove "Stories.tsx"
safe_remove "Terms.tsx"
safe_remove "ValueEstimatorModal (1).tsx"
safe_remove "use-mobile.tsx"
safe_remove "use-toast.ts"

echo ""
echo "📊 Phase 3: Removing root-level data file duplicates (sources in src/data/)..."
safe_remove "analyticsData.ts"
safe_remove "impactData.ts"
safe_remove "mockData.ts"
safe_remove "storiesData.ts"

echo ""
echo "🔧 Phase 4: Removing root-level utility duplicates (sources in src/lib/)..."
safe_remove "utils.ts"
safe_remove "supabase.ts"
safe_remove "index.ts"

echo ""
echo "📚 Phase 5: Consolidating documentation (keeping only Docs/ folder)..."
safe_remove "DEPLOYMENT.md"  # Duplicate exists in Docs/
safe_remove "PLATFORM_SETUP_GUIDE.md"  # Duplicate exists in Docs/
safe_remove "QUICK_START.md"  # Duplicate exists in Docs/

echo ""
echo "⚙️  Phase 6: Removing duplicate config files..."
safe_remove "postcss.config.js"  # Keep .mjs version
safe_remove "index.css"  # Duplicate of src/index.css

echo ""
echo "🗑️  Phase 7: Removing files from cleanup-delete-list.txt..."

# Read and delete files from cleanup-delete-list.txt
while IFS= read -r file; do
    if [ ! -z "$file" ]; then
        safe_remove "$file"
    fi
done < cleanup-delete-list.txt

echo ""
echo "🧼 Phase 8: Removing obsolete root lib directory (using src/lib/)..."
safe_remove "lib"

echo ""
echo "🗂️  Phase 9: Removing empty valuscan directories..."
safe_remove "components/valuscan"

echo ""
echo "📦 Phase 10: Removing deprecated app directories in components/..."
safe_remove "components/app"

echo ""
echo "🧹 Phase 11: Cleaning up unnecessary files..."
safe_remove "cleanup-delete-list.txt"  # No longer needed after cleanup
safe_remove "copy.code-workspace"  # Duplicate workspace file
safe_remove "placeholder.svg.pdf"  # Unnecessary

echo ""
echo "✨ Phase 12: Removing Next.js files (project is Vite, not Next.js)..."
safe_remove "next.config.ts"
safe_remove "next-env.d.ts"
safe_remove ".next"
safe_remove "vercel.json"  # Vite can still deploy to Vercel without this

echo ""
echo "🎉 Cleanup complete!"
echo ""
echo "📋 Summary:"
echo "  - Removed src_old/ directory"
echo "  - Removed root-level component duplicates"
echo "  - Removed root-level data file duplicates"
echo "  - Removed root-level utility duplicates"
echo "  - Consolidated documentation to Docs/"
echo "  - Removed duplicate config files"
echo "  - Removed all files from cleanup-delete-list.txt"
echo "  - Removed obsolete directories"
echo "  - Removed Next.js files (app is Vite-based)"
echo "  - Updated package.json to use Vite scripts"
echo ""
echo "🚀 Next steps:"
echo "  1. Review the changes: git status"
echo "  2. Run: npm install (to update dependencies)"
echo "  3. Run: npm run dev (to test the app)"
echo "  4. If everything works: git add . && git commit -m 'Clean up duplicates and fix Vite configuration'"
echo ""
