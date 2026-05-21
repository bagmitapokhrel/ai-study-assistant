# Deploying to Vercel

This project is ready for Vercel deployment.

## Recommended flow

1. Go to https://vercel.com and sign in with GitHub.
2. Click **New Project** and import your repository:
   - `https://github.com/Bebika3/ai-study-assistant`
3. Let Vercel detect the Next.js app.
4. In Project Settings, add the required environment variables.
5. Deploy.

## Required environment variables

Add these values in Vercel under **Settings > Environment Variables**:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `OPENAI_API_KEY`

## Optional Vercel CLI setup

If you prefer command-line deployment:

```bash
npm install -g vercel
vercel login
cd c:/Users/resha/ai-study-assistant
vercel
```

To add environment variables via the CLI:

```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_KEY production
vercel env add OPENAI_API_KEY production
```

## Notes

- `.env.local` is ignored by `.gitignore`.
- On Vercel, these values are secure and not committed to GitHub.
- Supabase and Clerk both have free tiers, but usage is limited.
