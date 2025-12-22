# ReFURRM Subscription Model

## Overview
ReFURRM uses a hybrid model combining free community access, paid marketplace tools, and invitation-only leadership roles.

## Subscription Tiers

### Community - $0/month (Free)
**Available to:** Everyone (families, volunteers, buyers, facilities, public)

**Features:**
- Access Rescue Network
- Submit Help Requests
- View Impact Feed
- Basic Volunteer Tools
- Community Support
- Access to Lien Law Library

**Implementation:** Default tier for all new users

---

### Pro - $29/month (Paid)
**Available to:** Ethical buyers, flippers, facilities

**Features:**
- Everything in Community
- AI Unit Scanner
- AI Item Scanner
- ROI Analytics
- Auction Alerts & Bookmarks
- Priority Support
- Ethical Buyer Badge

**Implementation:** Requires payment via Stripe (TODO: integrate)

---

## User Roles (Not Subscription Tiers)

### Ambassador - Invitation Only
**Type:** Leadership Role (NOT a subscription tier)

**Access:** Everything in Community (Free) + Leadership Tools

**Features:**
- Access to Admin & Rescue Dashboards
- Coordinate Local Rescue Requests
- Host Donation Drives & Events
- Early Franchise Pilot Participation
- Ambassador Badge & Recognition
- Dedicated Support from ReFURRM HQ

**Recognition Tiers:**
- Bronze (0-100 pts)
- Silver (100-500 pts)
- Gold (500-1500 pts)
- Platinum (1500+ pts)

**Implementation:** 
- Role assigned by admin approval
- Not tied to billing/Stripe
- Can subscribe to Pro if they want marketplace tools

---

## Database Schema

### users table
```sql
- id (uuid, primary key)
- email (text)
- full_name (text)
- role (text) -- 'family' | 'volunteer' | 'buyer' | 'ambassador' | 'admin'
- subscription_tier (text) -- 'free' | 'pro'
- phone (text)
- address (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### subscriptions table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key -> users.id)
- tier (text) -- 'free' | 'pro'
- status (text) -- 'active' | 'cancelled' | 'past_due'
- stripe_customer_id (text)
- stripe_subscription_id (text)
- current_period_start (timestamp)
- current_period_end (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## Implementation Notes

### Frontend
- `src/types/index.ts` - Defines `SubscriptionTier` type as 'free' | 'pro'
- `src/components/SubscriptionPlans.tsx` - Displays pricing and handles upgrades
- `src/components/ScannerTools.tsx` - Checks `subscription === 'pro'` for access
- `src/pages/Signup.tsx` - Excludes Ambassador from role selection (invitation-only)
- `src/pages/Profile.tsx` - Displays current subscription status and upgrade/manage options

### Backend (TODO)
- Stripe webhook handler for subscription events
- Update `subscription_tier` in users table on payment success
- Handle subscription cancellations and renewals
- Rate limiting based on subscription tier

### Access Control
```typescript
// Community features: Available to all users
const hasCommunityAccess = true;

// Pro features: Requires Pro subscription
const hasProAccess = user.subscription_tier === 'pro';

// Ambassador features: Requires Ambassador role
const hasAmbassadorAccess = user.role === 'ambassador';

// Admin features: Requires Admin role
const hasAdminAccess = user.role === 'admin';
```

---

## Revenue Model

**Free Tier:** Drives mission and community engagement
**Pro Tier:** Pays for tools, infrastructure, and platform development
**Ambassador:** Powers the mission through volunteer leadership (not monetized)

This keeps the mission clean and the revenue model justified:
- Pro pays for marketplace tools and analytics
- Ambassador powers community outreach and rescue coordination
