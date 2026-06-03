---
name: code-organization
description: Structure HTML, CSS, and JavaScript projects with clean architecture, consistent naming conventions, modular file organization, and maintainable code patterns. Use when organizing project files, refactoring code structure, or establishing project conventions.
license: MIT
compatibility: opencode
metadata:
  category: web-development
  audience: developers
---

# Code Organization

## Project Structure

```
portfolio/
├── index.html              # Main entry point
├── css/
│   ├── style.css           # Main stylesheet
│   ├── reset.css           # CSS reset/normalize
│   └── components/         # Component-specific styles
├── js/
│   ├── main.js             # Main JavaScript entry
│   └── modules/            # Modular JS files
├── assets/
│   ├── images/             # Image files (optimize with WebP/AVIF)
│   ├── fonts/              # Custom fonts
│   └── icons/              # SVG icons
└── .opencode/
    └── skills/             # Project skills
```

## HTML Best Practices

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Single `<h1>` per page, proper heading hierarchy
- Always include `lang` attribute on `<html>`
- Use `<!DOCTYPE html>` and proper meta tags (charset, viewport)
- Keep HTML clean: no inline styles, minimal inline scripts

## CSS Architecture

### File Organization
```
css/
├── style.css          # Main file: imports + variables + global styles
├── reset.css          # CSS reset (optional, can be in style.css)
└── components/        # Optional: component CSS files
    ├── header.css
    ├── hero.css
    └── footer.css
```

### Naming Convention (BEM)
- `.block` - Component container
- `.block__element` - Part of a component
- `.block--modifier` - Variant of a component

```css
.card { }
.card__title { }
.card__description { }
.card--featured { }
```

### CSS Organization (within a file)
1. `@import` statements
2. Custom properties (`:root`)
3. Global/reset styles
4. Typography
5. Layout (grid, flexbox)
6. Components (alphabetically)
7. Utilities
8. Media queries (mobile-first)

### CSS Custom Properties
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-bg: #ffffff;
  --color-text: #1e293b;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius: 0.5rem;
}
```

## JavaScript Best Practices

- Use ES6+ syntax (modules, arrow functions, const/let)
- Organize code into modules (`js/modules/`)
- Single responsibility for each function
- Use event delegation where possible
- Keep DOM queries cached

```
js/
├── main.js            # Entry point: imports + init
├── modules/
│   ├── navigation.js  # Nav menu logic
│   ├── animations.js  # Animation logic
│   └── contact.js     # Contact form logic
```

### Module Pattern
```js
// modules/navigation.js
export function initNavigation() {
  const nav = document.querySelector('.nav');
  // ...
}
```

```js
// main.js
import { initNavigation } from './modules/navigation.js';
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});
```

## General Principles

- **DRY**: Reuse classes and functions, avoid repetition
- **KISS**: Keep it simple — don't over-engineer
- **Separation of concerns**: HTML structure, CSS presentation, JS behavior
- **Consistent formatting**: 2-space indentation, kebab-case for CSS classes, camelCase for JS
- **Comments**: Section headers in CSS, JSDoc for functions
- **Accessibility**: Semantic HTML, ARIA labels, proper contrast
- **Performance**: Optimize images, minify assets, lazy load
