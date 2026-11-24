# Ridgeline Learning

Responsive, accessible React landing page built with Vite. The site includes a header and mobile navigation, hero, benefits, program cards, local-only registration form, FAQ and footer.

## Requirements

- Node.js 20 or later and npm.
- React 18, Vite 5 and CSS Modules.
- Semantic HTML landmarks and labelled form controls.
- Responsive layouts for mobile, tablet and desktop.
- Keyboard-operable navigation, Escape-to-close mobile menu, visible focus states and reduced-motion support.
- Controlled form fields with validation, field-level errors, focus on the first invalid field and an announced local success message.
- No analytics, external API, form backend, personal-data transmission or persistence.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the app at http://localhost:5173.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is `dist/`. Vercel/Netlify build command: `npm run build`; output directory: `dist`.

## Automated quality checks

```bash
npm test                 # React component and form tests
npx playwright install   # Install browser binaries once
npm run test:e2e         # Chromium + Firefox acceptance tests
npm run test:lighthouse  # Lighthouse score gates
```

The Playwright suite checks the page structure, internal navigation, mobile menu keyboard dismissal, form validation and local confirmation, absence of horizontal overflow at 320, 390, 768, 1200 and 1440 CSS pixels, and automated WCAG 2.1 A/AA accessibility rules. Lighthouse CI enforces minimum 90/100 Accessibility and Best Practices scores.

GitHub Actions runs unit tests, the production build, browser acceptance tests and Lighthouse checks for pushes and pull requests to `main`. A green workflow is required evidence; do not mark acceptance cases passed before it runs successfully.

## Project structure

```text
src/
  components/       Header, Hero, Benefits, Programs, RegistrationForm, FAQ, Footer
  styles/base.css   Global styles and focus/reduced-motion defaults
  test/             Vitest + Testing Library tests
  App.jsx
  App.module.css
  main.jsx
e2e/                Playwright acceptance tests
public/images/      Local SVG logo and illustrations
.github/workflows/  CI quality workflow
```

## Privacy behaviour

The registration form validates in the browser and displays an on-page confirmation. It does not send, email, or persist the entered information. The consent checkbox confirms that visitors understand this local-demo behaviour; it is not a marketing opt-in.

## Manual release checklist

Before release, confirm the deployed page visually in Chrome and Firefox at the target widths, verify keyboard navigation and form behaviour, review the CI run, and inspect Lighthouse results. The acceptance log must reflect actual test results, not assumptions.
