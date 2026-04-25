# Blog CMS

Custom blog CMS dashboard built with Next.js 16, React 19, Tailwind CSS, Radix UI, CKEditor, TipTap, and Recharts.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI
- CKEditor and TipTap
- Recharts

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Running backend API

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local env file from the example:

```bash
cp .env.example .env.local
```

If you are using PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local` with your backend URL.

4. Start the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Base URL of the backend API used by the dashboard |

Example:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` starts the production server
- `npm run lint` runs ESLint

## Deployment

Detailed deployment instructions are in [DEPLOYMENT.md](/C:/Users/vivek/OneDrive/Desktop/blog-cms/DEPLOYMENT.md).

Short Vercel flow:

1. Push the finished code to the `main` branch.
2. Import the repository into Vercel.
3. Add `NEXT_PUBLIC_API_BASE_URL` in Vercel Project Settings.
4. Deploy.

## Branch Workflow

- `development` contains the latest completed work
- `main` should contain the production-ready code you deploy from

If you need to promote development work manually:

```bash
git checkout main
git merge development
git push origin main
```

## Notes

- This app depends on a separate backend API.
- In this environment, `next build` could not fully complete because Google Fonts were blocked by network sandboxing. Vercel builds should still be able to fetch those fonts normally.
- `npm run lint` currently reports existing lint errors in the codebase. Those do not stop the branch merge, but they should be cleaned up if you want a fully clean CI pipeline.
