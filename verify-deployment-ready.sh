#!/bin/bash

# Verification script to check if the app is ready for deployment
# Run this after cleanup and npm install

set -e

echo "🔍 ReFURRM Deployment Verification"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

# Check function
check() {
    if [ -e "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        ((FAIL++))
        return 1
    fi
}

check_not_exists() {
    if [ ! -e "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 (should not exist)"
        ((FAIL++))
        return 1
    fi
}

warn() {
    echo -e "${YELLOW}⚠${NC}  $1"
    ((WARN++))
}

echo "📋 Phase 1: Essential Files"
echo "----------------------------"
check "package.json" "package.json exists"
check "vite.config.ts" "vite.config.ts exists"
check "tsconfig.json" "tsconfig.json exists"
check "tsconfig.app.json" "tsconfig.app.json exists"
check "index.html" "index.html exists"
check "src/main.tsx" "src/main.tsx exists"
check "src/App.tsx" "src/App.tsx exists"
echo ""

echo "📁 Phase 2: Source Structure"
echo "----------------------------"
check "src/components" "src/components/ directory exists"
check "src/lib" "src/lib/ directory exists"
check "src/pages" "src/pages/ directory exists"
check "src/contexts" "src/contexts/ directory exists"
check "src/hooks" "src/hooks/ directory exists"
echo ""

echo "🗑️  Phase 3: Duplicates Removed"
echo "----------------------------"
check_not_exists "src_old" "src_old/ removed"
check_not_exists "Admin.tsx" "Root Admin.tsx removed"
check_not_exists "Analytics.tsx" "Root Analytics.tsx removed"
check_not_exists "lib" "Root lib/ directory removed"
check_not_exists "next.config.ts" "next.config.ts removed"
check_not_exists ".next" ".next/ directory removed"
echo ""

echo "⚙️  Phase 4: Configuration Checks"
echo "----------------------------"

# Check package.json for correct scripts
if grep -q '"dev": "vite"' package.json; then
    echo -e "${GREEN}✓${NC} package.json uses Vite dev script"
    ((PASS++))
else
    echo -e "${RED}✗${NC} package.json doesn't use Vite dev script"
    ((FAIL++))
fi

if grep -q '"build": "tsc && vite build"' package.json; then
    echo -e "${GREEN}✓${NC} package.json uses Vite build script"
    ((PASS++))
else
    echo -e "${RED}✗${NC} package.json doesn't use Vite build script"
    ((FAIL++))
fi

# Check if tsconfig.app.json is not empty
if [ -s "tsconfig.app.json" ]; then
    echo -e "${GREEN}✓${NC} tsconfig.app.json is not empty"
    ((PASS++))
else
    echo -e "${RED}✗${NC} tsconfig.app.json is empty"
    ((FAIL++))
fi

# Check for @/* path alias in tsconfig.json
if grep -q '"@/\*": \["./src/\*"\]' tsconfig.json; then
    echo -e "${GREEN}✓${NC} tsconfig.json has correct path alias"
    ((PASS++))
else
    echo -e "${RED}✗${NC} tsconfig.json path alias incorrect"
    ((FAIL++))
fi

echo ""
echo "📦 Phase 5: Dependencies"
echo "----------------------------"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules/ exists"
    ((PASS++))
else
    warn "node_modules/ not found - run: npm install"
fi

if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✓${NC} package-lock.json exists"
    ((PASS++))
else
    warn "package-lock.json not found"
fi

# Check if vite is installed
if [ -d "node_modules/vite" ]; then
    echo -e "${GREEN}✓${NC} Vite is installed"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Vite not installed - run: npm install"
    ((FAIL++))
fi

echo ""
echo "🔐 Phase 6: Environment Setup"
echo "----------------------------"

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} .env.example exists"
    ((PASS++))
else
    warn ".env.example not found"
fi

if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    ((PASS++))
else
    warn ".env file not found - create from .env.example"
fi

echo ""
echo "=================================="
echo "📊 Verification Results"
echo "=================================="
echo -e "${GREEN}Passed:${NC} $PASS"
echo -e "${RED}Failed:${NC} $FAIL"  
echo -e "${YELLOW}Warnings:${NC} $WARN"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ All critical checks passed!${NC}"
    echo ""
    echo "🚀 Next Steps:"
    echo "  1. If you haven't: npm install"
    echo "  2. Create .env from .env.example (if needed)"
    echo "  3. Run: npm run dev"
    echo "  4. Run: npm run build (to test production build)"
    echo ""
else
    echo -e "${RED}❌ Some checks failed. Please fix the issues above.${NC}"
    echo ""
    exit 1
fi

if [ $WARN -gt 0 ]; then
    echo -e "${YELLOW}⚠️  There are $WARN warning(s). Review them before deploying.${NC}"
    echo ""
fi
