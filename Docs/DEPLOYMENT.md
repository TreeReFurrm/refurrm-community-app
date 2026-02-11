# ReFURRM Deployment Guide for refurrm.app

## Platform Comparison

| Feature | Vercel ⭐ | Netlify | AWS Amplify |
|---------|----------|---------|-------------|
| Ease of Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free Tier | Generous | Generous | Limited |
| Build Speed | Fast | Fast | Moderate |
| Custom Domain | Free SSL | Free SSL | Free SSL |
| Best For | React/Vite | All frameworks | AWS ecosystem |

**Recommendation: Use Vercel** - Best for React/Vite apps, fastest deployment, excellent free tier.

---

## 🚀 VERCEL DEPLOYMENT (Recommended)

### Step 1: Prepare Your Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Select your ReFURRM repository
5. Vercel auto-detects: Framework Preset = **Vite**
6. Click **"Deploy"**

### Step 3: Configure Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=https://lpfiiycqgykyuzjbwikt.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_9lSqpifpi9ulkMMkuVGa3w_xQBM0d5k
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

### Step 4: Connect refurrm.app Domain
1. In Vercel Dashboard → Your Project → Settings → **Domains**
2. Click **"Add Domain"**
3. Enter: `refurrm.app`
4. Vercel provides DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Go to your domain registrar (Namecheap, GoDaddy, etc.)
6. Add these DNS records
7. Wait 10-60 minutes for DNS propagation
8. Vercel auto-provisions SSL certificate

---

## 🌐 NETLIFY DEPLOYMENT (Alternative)

### Option A: Drag & Drop
```bash
npm run build
# Drag the 'dist' folder to Netlify
```

### Option B: Git Integration
1. Go to https://netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in **Site settings → Environment**
6. Deploy

### Domain Setup on Netlify
1. Site settings → **Domain management**
2. Add custom domain: `refurrm.app`
3. Update DNS at your registrar with Netlify's nameservers

---

## 🔧 SUPABASE EDGE FUNCTIONS SETUP

Your Stripe payment processing requires Supabase Edge Functions.

### Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref lpfiiycqgykyuzjbwikt

# Deploy functions
supabase functions deploy create-pro-subscription
supabase functions deploy stripe-webhook
```

### Set Function Secrets
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

---

## 💳 STRIPE WEBHOOK CONFIGURATION

### Step 1: Get Webhook Endpoint URL
Your webhook URL: `https://lpfiiycqgykyuzjbwikt.supabase.co/functions/v1/stripe-webhook`

### Step 2: Configure in Stripe Dashboard
1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://lpfiiycqgykyuzjbwikt.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (whsec_...)
6. Add to Supabase secrets (see above)

---

## ✅ POST-DEPLOYMENT CHECKLIST

### Test Core Features
- [ ] Visit https://refurrm.app
- [ ] Sign up for new account
- [ ] Login works
- [ ] Make a donation
- [ ] Upgrade to Pro subscription
- [ ] Pro features unlock (Scanner Tools)
- [ ] Check Stripe dashboard for payment
- [ ] Check Supabase for user data

### Monitor Services
- **Vercel Dashboard**: Build logs, analytics
- **Supabase Dashboard**: Database, auth, edge functions
- **Stripe Dashboard**: Payments, subscriptions

---

## 🆘 TROUBLESHOOTING

### Build Fails
- Check Vercel build logs
- Ensure all dependencies in package.json
- Verify Node version compatibility

### Environment Variables Not Working
- Must start with `VITE_` for frontend access
- Redeploy after adding new variables
- Check spelling and values

### Domain Not Working
- DNS propagation takes 10-60 minutes
- Verify DNS records at your registrar
- Check for typos in domain name

### Payments Not Processing
- Verify Stripe keys (test vs live)
- Check webhook is receiving events
- Review Supabase function logs

---

## 📞 SUPPORT RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Webhooks**: https://stripe.com/docs/webhooks

---

**🎉 Your ReFURRM platform is ready to launch at refurrm.app!**
