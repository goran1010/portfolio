# Goran Jović - Portfolio

A personal portfolio built with React, TypeScript and Vite.

[Live website](https://goranjovic.netlify.app/)

The site includes projects, open-source work, research participation, skills,
contact links and downloadable English and Serbian CVs. The page supports English
and Serbian in Latin script, light / dark / system themes, and collapsible
navigation below 768px. CV language is chosen independently of page language.

## Run locally

Use Node.js 24, as specified in `.nvmrc`. With nvm, run `nvm install` and `nvm use`
first.

```sh
git clone https://github.com/goran1010/portfolio.git
cd portfolio
npm ci
npm run dev
```

Vite prints the local development URL. No environment variables or backend
services are required.

To serve a production build:

```sh
npm run build
npm run preview
```

## Checks and scripts

| Command                    | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `npm run dev`              | Start the development server                         |
| `npm run build`            | Type check and build into `dist/`                    |
| `npm run preview`          | Serve the production build locally                   |
| `npm run lint`             | Run ESLint                                           |
| `npm run typecheck`        | Check application, configuration and test types      |
| `npm run format:check`     | Check formatting                                     |
| `npm run format`           | Apply formatting                                     |
| `npm test -- run`          | Run unit tests once                                  |
| `npm run test:coverage`    | Run unit tests with coverage                         |
| `npm run spell`            | Check spelling                                       |
| `npm run install:browsers` | Install Playwright's Chromium browser                |
| `npm run test:e2e`         | Run browser and accessibility tests                  |
| `npm run test:e2e:ui`      | Open Playwright's interactive test runner            |
| `npm run capture-og`       | Build and generate the 1200 x 630 social preview PNG |

Install Chromium before the first browser test or image capture:

```sh
npm run install:browsers
npm run test:e2e
```

On supported Linux distributions, `npm run install:browsers -- --with-deps` also installs the system
packages Playwright needs.

Browser tests start their own production build and preview server on
`127.0.0.1:4173`; leave that port free. They exercise navigation, keyboard focus,
CV downloads, preference persistence and the theme before first paint. Axe checks
English and Serbian in light and dark themes, including the open mobile menu.
Gradient text contrast needs a separate check when changing the text palette or
background because axe cannot measure that combination.

Failed browser tests retain screenshots and traces in `test-results/`. Open the
HTML report with `npx playwright show-report`. CI runs all seven checks on pushes
and pull requests to `main`, caches Chromium by Playwright version, and uploads
browser reports on failure.

## Update content

- Edit `src/locales/en.json` and `src/locales/sr.json` together for translated text.
  Translation keys are typed, and tests check that both files have matching,
  nonempty entries. Keep familiar technical terms such as open-source, maintainer
  and Email in the Serbian copy.
- Edit `src/data/projects.ts` for project links and technologies,
  `src/data/skills.ts` for skill groups, and `src/data/contact.ts` for contact links.
- Edit the corresponding components for the Hero, About and open-source sections.
- Theme colors and local Roboto font definitions live in `src/styles/index.css`.
  The page language and theme preferences are stored in the browser. System
  language follows the browser, with `sr`, `bs`, `hr` and `cnr` resolving to the
  Serbian bundle.

Replace the PDFs in `public/` while retaining these filenames:

- `Goran-Jovic-CV-en.pdf`
- `Goran-Jovic-CV-sr.pdf`

Both files are available from the CV chooser in either page language. Check both
downloads after replacing them.

## Social preview image

After changing the hero text, typography or colors, run:

```sh
npm run capture-og
```

This command builds the site, starts a temporary local preview, captures the
English hero in light mode and closes the browser and server. The capture hides
the other sections to frame the introduction at 1200 x 630 pixels. It writes
`public/images/og-image.png` and updates the copy in `dist/`.

Review the PNG and commit it with the content change. Open Graph and Twitter image
metadata in `index.html` use the absolute production URL. After deployment,
refresh the link in [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Deployment

Netlify builds the repository using `netlify.toml`:

- Build command: `npm run build`
- Published directory: `dist`
- Node.js version: 24

The existing Netlify site has automatic publishing and Deploy Previews enabled.
Netlify applies the configured CSP and security headers. Local Vite preview does
not apply those headers.

The site uses native section anchors. Unknown URLs return the bilingual static
`public/404.html` page with HTTP 404. The theme script is external so it works
under the CSP without inline scripts. Keep `public/theme-init.js` and the theme
logic in `src/utils/theme.ts` in sync when changing theme behavior.

When changing the production domain, update the canonical URL, Open Graph and
Twitter metadata in `index.html`, plus `public/robots.txt` and
`public/sitemap.xml`. After a push, confirm CI passes, Netlify publishes the new
build, the two CV downloads work, unknown paths return 404, and LinkedIn shows the
social preview image.

## Stack and license

React 19 with React Compiler, TypeScript, Vite, Tailwind CSS 4 and local Roboto
fonts. Tests use Vitest, Testing Library, Playwright and axe. Tooling includes
ESLint, Prettier and CSpell.

[MIT License](LICENSE) - Goran Jović.
