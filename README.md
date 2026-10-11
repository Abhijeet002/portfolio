# Abhijeet Sachan – Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build                 |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |
| `npm test`          | Unit tests (Vitest)              |

## Editing content

All content lives in plain data files, so updating the site never means touching layout code:

| What                         | Where                          |
| ---------------------------- | ------------------------------ |
| Name, email, social links    | `src/config/site.ts`           |
| Experience & education       | `src/data/experience.ts`       |
| Projects                     | `src/data/projects.ts`         |
| Skills                       | `src/data/skills.ts`           |
| Certifications               | `src/data/certifications.ts`   |

## Blog (dev.to)

`/blog` and the home page "Latest Articles" section pull published posts from the
[dev.to API](https://developers.forem.com/api/v1) for the username in `src/config/site.ts`.

- Fetched on the server and cached for an hour (ISR), so new posts appear without a redeploy.
- Responses are validated at runtime; malformed posts are skipped and only `http(s)` links are rendered.
- If dev.to is unreachable, `/blog` shows a friendly fallback and the home page section is hidden.

### Environment variables (optional)

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for Open Graph metadata               |
| `DEVTO_API_URL`        | Override the dev.to API base (e.g. a local mock for testing)   |
