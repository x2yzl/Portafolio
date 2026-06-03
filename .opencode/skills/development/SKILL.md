---
name: portfolio-development
description: Use when building or modifying the portfolio website with vanilla HTML, CSS, and JavaScript. Covers project structure, best practices, and general development workflow.
---

# Portfolio Development

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── fonts/
└── .opencode/
    └── skills/
```

## Best Practices

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Keep CSS organized with sections: reset, variables, layout, components, utilities
- Use vanilla ES6+ JavaScript modules when possible
- Optimize images with modern formats (WebP, AVIF)
- Ensure responsive design (mobile-first approach)
- Maintain accessibility standards (ARIA labels, proper heading hierarchy, alt text)
- Keep the code DRY and well-organized in separate files by concern

## Development Workflow

1. Start with `index.html` structure
2. Add global styles in `css/style.css`
3. Add interactivity in `js/main.js`
4. Test across screen sizes
5. Optimize performance
