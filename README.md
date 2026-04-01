# OmniPath

This is the OmniPath Phase 1 local foundation build.

Phase 1 is intentionally auth-free so the route structure, landing page, screen flow, and Docker test path can be validated cleanly before Supabase and Vercel work begins.

## Getting Started

Run the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Testing

Run the current auth-free Phase 1 build in Docker:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

This Docker phase does not require Supabase environment variables.

The current implementation lives under `src/app` and `src/components`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Later Phases

Supabase Auth, Supabase Storage, middleware, saved data, and Vercel deployment are intentionally deferred to a later phase.
