# API Setup Guide

Quick guide to get your free API keys for SocialHub.

---

## 1. YouTube Data API (Free)

### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Name it **"SocialHub"** → Click **"Create"**
4. Wait for project creation, then select it
5. Click **"☰ Menu"** → **"APIs & Services"** → **"Library"**
6. Search for **"YouTube Data API v3"**
7. Click on it → Click **"Enable"**
8. Click **"☰ Menu"** → **"APIs & Services"** → **"Credentials"**
9. Click **"+ Create Credentials"** → Select **"API Key"**
10. Copy your API key
11. (Optional) Click **"Restrict Key"** → Set application restrictions

### Daily Quota:
- **10,000 units/day** (free tier)
- Each search = 100 units (~100 searches/day)

---

## 2. Gemini API (Free)

### Steps:
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click **"Get API Key"** in the top right
4. Click **"Create API key in new project"**
5. Copy your API key

### Free Tier:
- **15 requests/minute**
- **1,500 requests/day**
- **1 million tokens/month**
- Completely FREE (no credit card required)

---

## 3. Add to Environment Variables

Create/Update `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key-here

# Gemini API
GEMINI_API_KEY=your-gemini-api-key-here
```

---

## 4. Install Dependencies

```bash
npm install @google/generative-ai youtube-transcript axios
```

---

## Testing Your Keys

### Test YouTube API:
```bash
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=YOUR_YOUTUBE_KEY"
```

### Test Gemini API:
Open [Google AI Studio](https://aistudio.google.com/) and try the playground.

---

## Important Notes

⚠️ **Never commit `.env.local` to git** (already in `.gitignore`)

✅ **Keep your API keys secret**

📊 **Monitor usage** in Google Cloud Console

🔄 **Rotate keys** if accidentally exposed

---

## Quota Limits

| API | Free Tier | Limit |
|-----|-----------|-------|
| YouTube | 10,000 units/day | ~100 searches/day |
| Gemini | 1M tokens/month | 1,500 requests/day |

Both are sufficient for development and moderate usage!
