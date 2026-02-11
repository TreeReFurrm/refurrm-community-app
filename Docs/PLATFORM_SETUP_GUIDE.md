# Platform Setup Guide for refurrm.app

## 🎯 Quick Start: Vercel Deployment (5 Minutes)

### Prerequisites
- GitHub account with ReFURRM repository
- Domain refurrm.app purchased and accessible
- Supabase project running
- Stripe account set up

---

## STEP-BY-STEP: VERCEL SETUP

### 1. Initial Deployment (2 minutes)

**A. Connect Repository**
```
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select your ReFURRM repo
4. Click "Import"
```

**B. Configure Build Settings**
- Framework Preset: **Vite** (auto-detected)
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

**C. Deploy**
- Click **"Deploy"**
- Wait ~90 seconds
- You'll get a URL like: `refurrm.vercel.app`

### 2. Environment Variables (1 minute)

Navigate to: **Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://lpfiiycqgykyuzjbwikt.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_9lSqpifpi9ulkMMkuVGa3w_xQBM0d5k` | Production, Preview, Development |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_YOUR_KEY` | Production only |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_YOUR_KEY` | Preview, Development |

**Important**: Click "Save" after each variable.

After adding all variables, trigger a new deployment:
- Go to **Deployments** tab
- Click ⋯ on latest deployment
- Select **"Redeploy"**

### 3. Custom Domain Setup (2 minutes)

**A. Add Domain in Vercel**
```
1. Go to: Settings → Domains
2. Click "Add"
3. Enter: refurrm.app
4. Click "Add"
5. Also add: www.refurrm.app
```

**B. Configure DNS at Your Registrar**

Vercel will show you DNS records. Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and add:

**For Apex Domain (refurrm.app):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**C. Wait for DNS Propagation**
- Usually takes 10-30 minutes
- Can take up to 48 hours in rare cases
- Check status: https://www.whatsmydns.net/#A/refurrm.app

**D. SSL Certificate**
- Vercel automatically provisions SSL
- Your site will be available at https://refurrm.app
- HTTP automatically redirects to HTTPS

---

## ALTERNATIVE: NETLIFY SETUP

### 1. Deploy to Netlify

**Option A: GitHub Integration**
```
1. Go to https://app.netlify.com/start
2. Click "Import from Git"
3. Choose GitHub
4. Select ReFURRM repository
5. Build settings:
   - Build command: npm run build
   - Publish directory: dist
6. Click "Deploy site"
```

**Option B: Manual Deploy**
```bash
# Build locally
npm run build

# Go to https://app.netlify.com/drop
# Drag and drop the 'dist' folder
```

### 2. Environment Variables

Navigate to: **Site settings → Environment variables**

Add the same variables as Vercel (see above).

### 3. Custom Domain on Netlify

```
1. Go to: Site settings → Domain management
2. Click "Add custom domain"
3. Enter: refurrm.app
4. Netlify provides nameservers:
   - dns1.p01.nsone.net
   - dns2.p01.nsone.net
   - dns3.p01.nsone.net
   - dns4.p01.nsone.net
5. Update nameservers at your domain registrar
6. Wait 2-24 hours for propagation
```

---

## SUPABASE EDGE FUNCTIONS DEPLOYMENT

### 1. Install Supabase CLI

**macOS/Linux:**
```bash
brew install supabase/tap/supabase
```

**Windows:**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**npm (all platforms):**
```bash
npm install -g supabase
```

### 2. Login and Link Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref lpfiiycqgykyuzjbwikt
```

### 3. Create Edge Functions

Create these files in your project:

**supabase/functions/create-pro-subscription/index.ts**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  try {
    const { userId, email } = await req.json()
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ReFURRM Pro Subscription',
            description: 'Monthly Pro membership with advanced features',
          },
          unit_amount: 2900,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `https://refurrm.app/profile?payment=success`,
      cancel_url: `https://refurrm.app/profile?payment=canceled`,
      client_reference_id: userId,
      customer_email: email,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
```

**supabase/functions/stripe-webhook/index.ts**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.client_reference_id

      await supabase
        .from('profiles')
        .update({ subscription_tier: 'pro' })
        .eq('id', userId)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
```

### 4. Deploy Functions

```bash
supabase functions deploy create-pro-subscription
supabase functions deploy stripe-webhook
```

### 5. Set Secrets

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

---

## STRIPE WEBHOOK CONFIGURATION

### 1. Get Webhook URL
```
https://lpfiiycqgykyuzjbwikt.supabase.co/functions/v1/stripe-webhook
```

### 2. Add Webhook in Stripe

```
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. Endpoint URL: [paste URL above]
4. Description: ReFURRM Production Webhook
5. Events to send:
   ✓ checkout.session.completed
   ✓ customer.subscription.created
   ✓ customer.subscription.updated
   ✓ customer.subscription.deleted
   ✓ invoice.payment_succeeded
   ✓ invoice.payment_failed
6. Click "Add endpoint"
7. Copy the "Signing secret" (whsec_...)
8. Add to Supabase secrets (see step 5 above)
```

---

## 🎉 LAUNCH CHECKLIST

- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] refurrm.app domain connected
- [ ] SSL certificate active (https works)
- [ ] Supabase Edge Functions deployed
- [ ] Stripe webhook configured
- [ ] Test signup/login
- [ ] Test donation payment
- [ ] Test Pro subscription upgrade
- [ ] Verify webhook receives events
- [ ] Check all pages load correctly

---

**Your ReFURRM platform is now live at https://refurrm.app! 🚀**
