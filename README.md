# iRBbA Devs — Company Website

Official website for **iRBbA Devs**, a software company building intelligent enterprise solutions for hospitality, education, banking, and institutional operations.

## Live Site

Hosted via GitHub Pages: [RaymondAffedzie.github.io](https://RaymondAffedzie.github.io)

## Tech Stack

- **HTML5** — Page structure and content
- **CSS3** — Custom design system with CSS custom properties and dark/light theming
- **JavaScript (Vanilla)** — Theme toggle, scroll effects, animations
- **Bootstrap 5.3.2** — Responsive grid and UI components
- **Bootstrap Icons 1.11.1** — Icon set
- **Material Icons (Google)** — Mobile navigation icons
- **Google Fonts** — Syne (display), Inter (body)

## Pages

| Page | File |
|---|---|
| Home | index.html |
| About | about.html |
| Products | products.html |
| HosCare Product | product-hoscare.html |
| Blog | blog.html |
| Blog Post | blog-digital-transformation.html |
| Demo | demo.html |
| Contact | contact.html |
| Pricing | pricing.html |
| Subscription | subscription.html |
| FAQ | faq.html |
| Privacy Policy | privacy-policy.html |
| Terms of Service | terms-of-service.html |
| Cookie Policy | cookie-policy.html |

## Features

- Dark / light theme toggle with localStorage persistence — zero flash on load
- Floating glass navbar island (desktop) and floating bottom nav dock (mobile)
- Responsive across all screen sizes; bottom nav replaces top nav on mobile
- CSS-only theming via [data-theme="light"] scoped overrides
- Water drop canvas animation on the hero section
- Bootstrap accordions for FAQ
- Pricing plan cards with comparison table

## Project Structure

    /
    css/style.css        Master stylesheet
    js/main.js           Theme toggle, scroll effects, animations
    favicon_io/          Favicon assets
    *.html               All pages listed above

## Getting Started

1. Clone the repo:
   git clone https://github.com/RaymondAffedzie/RaymondAffedzie.github.io.git
2. Open index.html in your browser.
   No build steps required — it is a static site.

## Customization

- Edit HTML files to update page content.
- Modify css/style.css to change styles. CSS custom properties are defined at the top of the file.
- Add [data-theme="light"] scoped overrides alongside any new component styles to support light mode.

## License

This repository is open source under the MIT License.

## Contact

- Website: https://RaymondAffedzie.github.io/contact.html
- GitHub Issues: https://github.com/RaymondAffedzie/RaymondAffedzie.github.io/issues
