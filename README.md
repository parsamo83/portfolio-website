# Parsa Motamed: portfolio

My personal site in English and German: experience, skills with the projects that back them up, and project cards with live visuals (a ray tracer that renders in the browser, an MNIST digit, LoudPin on web, tablet and phone).

Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4, hosted on Vercel. The layout started from the open-source [Magic UI portfolio template](https://github.com/dillionverma/portfolio) (MIT, see `LICENSE`); the blog, hackathons section, blur effects and glass dock were removed, and the design was rebuilt.

## Edit the content

Everything the site says is in [`src/data/resume.ts`](src/data/resume.ts), once in English and once in German. The rules for editing it are at the top of that file.

1. On GitHub, open `src/data/resume.ts` and click the pencil icon. Pressing `.` instead opens a VS Code editor in the browser that underlines mistakes.
2. Change the text and click **Commit changes**.
3. Vercel builds and publishes the new version in about a minute.

If a build fails, Vercel emails you and the previous version stays online. To undo a change, roll back to an earlier deployment in Vercel (Deployments, then the deployment's menu) or revert the commit on GitHub.

For bigger edits, choose **Create a new branch** when committing. Vercel posts a preview link on the pull request; merge it when the preview looks right.

- **Photo:** replace `public/me.jpg` with Add file, then Upload files.
- **Legal notice and privacy policy:** in [`src/data/legal.ts`](src/data/legal.ts). Name, email and postal address come from `PROFILE` in `resume.ts`. Builds on Vercel stop while the postal address is empty.
- **A new project** needs one of the existing `visual` keys in `src/data/types.ts`, or a new component in `src/components/visuals/` registered in `src/components/project-card.tsx`.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. It redirects to `/en` or `/de` from your browser's language.

## Deploy

The repo is connected to Vercel (free Hobby plan). Every push to `main` deploys to production; every other branch gets a preview link. No environment variables are needed: link previews use Vercel's production address. Set `NEXT_PUBLIC_SITE_URL` only if the site moves to a custom domain that isn't the project's main domain.

- `src/proxy.ts` sends `/` to `/en` or `/de` (saved choice first, then the browser's language). Language pages skip it and come straight from the CDN.
- Both language pages, the legal pages and the link-preview images are built ahead of time.
- After changing the link preview (title, description, `opengraph-image.tsx`), paste the URL into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) so LinkedIn fetches the new version.

## Design

"Steel & Signal": cool steel neutrals and one signal yellow for state and emphasis, set in Archivo (one family, hierarchy by weight and width). Tokens are in [`src/app/globals.css`](src/app/globals.css).

- Every surface is opaque. Depth comes from tone steps, hairlines and a four-step shadow ladder (sunken, raised, floating, overlay), never from blur.
- Text is at least 4.5:1 and control edges at least 3:1 against their background, in light and dark.
- Tap targets are at least 44px.
- Motion only answers what you do. Exits run at about 65% of the entrance, everything animates transform and opacity, and `prefers-reduced-motion` turns travel off. The dock pill and the switches use real spring curves sampled into CSS `linear()` (see [`src/lib/spring.ts`](src/lib/spring.ts)).
