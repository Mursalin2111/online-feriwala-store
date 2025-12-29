# Free Hosting Deployment Guide for Online Feriwala

## Option 1: Vercel (Frontend) + InfinityFree (Backend) - RECOMMENDED

### Step 1: Deploy Backend to InfinityFree

1. **Create Account**: Go to https://www.infinityfree.com and sign up
2. **Create Hosting**: Click "Create Account" to get free hosting
3. **Get Database**: 
   - Go to Control Panel → MySQL Databases
   - Create a new database
   - Note down: Database name, Username, Password, Host
4. **Upload Files**:
   - Go to Control Panel → File Manager
   - Navigate to `htdocs` folder
   - Upload all files from `backend` folder
5. **Import Database**:
   - Go to Control Panel → phpMyAdmin
   - Select your database
   - Click Import → Choose `backend/sql/setup.sql`
6. **Update Database Config**:
   - Edit `htdocs/config/database.php`
   - Update with your InfinityFree credentials:
   ```php
   private $host = "your-host.infinityfree.com";
   private $port = "3306";
   private $database_name = "your_database_name";
   private $username = "your_username";
   private $password = "your_password";
   ```

7. **Your API URL will be**: `https://your-subdomain.infinityfreeapp.com/api`

### Step 2: Update Frontend API URL

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://your-subdomain.infinityfreeapp.com/api';
```

Then rebuild:
```bash
npm run build
```

### Step 3: Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd "e:\versity file\6TH_SEMESTER\WEB_PROGRAMMING_LAB\online-feriyala-store-main\online-feriyala-store-main"
   vercel
   ```

3. Follow the prompts:
   - Login with GitHub/Email
   - Set project name: `online-feriwala`
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. Your site will be live at: `https://online-feriwala.vercel.app`

---

## Option 2: Netlify (Frontend) + 000webhost (Backend)

### Backend on 000webhost

1. Go to https://www.000webhost.com and sign up
2. Create a new website
3. Upload `backend` folder files to `public_html`
4. Create MySQL database in control panel
5. Import `setup.sql` via phpMyAdmin
6. Update `config/database.php` with 000webhost credentials

### Frontend on Netlify

1. Go to https://www.netlify.com
2. Drag & drop the `dist` folder
3. Your site is live!

---

## Option 3: GitHub Pages (Frontend Only - Static)

For static hosting without backend:

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch: main, folder: /dist
4. Your site: `https://username.github.io/repo-name`

Note: This won't work with PHP backend. Use for demo only.

---

## Quick Deploy Commands

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

---

## Free Hosting Comparison

| Service | Frontend | Backend (PHP) | MySQL | SSL | Bandwidth |
|---------|----------|---------------|-------|-----|-----------|
| Vercel | ✅ | ❌ | ❌ | ✅ | 100GB |
| Netlify | ✅ | ❌ | ❌ | ✅ | 100GB |
| InfinityFree | ✅ | ✅ | ✅ | ✅ | Unlimited |
| 000webhost | ✅ | ✅ | ✅ | ✅ | 3GB |
| GitHub Pages | ✅ | ❌ | ❌ | ✅ | 1GB |

---

## Recommended Setup

**Best Free Full-Stack Setup:**
- Frontend: **Vercel** (fast, reliable, free SSL)
- Backend: **InfinityFree** (free PHP + MySQL, unlimited bandwidth)

This gives you a production-ready website completely free!
