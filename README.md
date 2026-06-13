# Buildora Materials Website

A colorful, responsive marketing website for a construction materials supplier. Built with plain HTML, CSS, and JavaScript, so it can be hosted almost anywhere without a build process.

## Included

- Responsive light-theme landing page
- Product categories for epoxy, tiles, waterproofing, cement, adhesives, and grout
- Custom local product imagery
- Specific, proof-driven "Why Buildora" section
- Interactive product carousel and search
- Material quantity estimator
- Three-step quote request flow with WhatsApp and email delivery
- Newsletter interaction, animated statistics, mobile navigation, and scroll effects
- SEO description and accessible labels
- Indian currency, supplier branding, phone number, and email placeholders

## Files

```text
buildora-materials/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── images/
        ├── hero-materials.png
        ├── epoxy.png
        └── tiles.png
```

## Preview locally

Double-click `index.html`, or serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize before launch

1. Replace `Buildora`, the placeholder phone number and email, social links, and footer copyright in `index.html`.
2. In `script.js`, replace `ADMIN_WHATSAPP` with the real WhatsApp number in international format without `+`, spaces, or dashes. Replace `ADMIN_EMAIL` with the real admin inbox.
3. Adjust colors at the top of `styles.css` under `:root`.
4. Update product names, descriptions, and branded supplier names.
5. Replace placeholder `#` links with real policy and social URLs.
6. Add your analytics script and domain-specific SEO metadata before launch.

## How admin receives quotes

When a customer completes the form, the website opens WhatsApp with a formatted message containing their selected products, project type, notes, name, phone, and email. The customer reviews the message and taps **Send**. It will arrive in the admin's WhatsApp chat.

An email fallback is also shown after submission. It opens the customer's email app with the same quote details addressed to the admin.

These methods do not store enquiries in a dashboard. For automatic submission and permanent storage, connect a service such as Formspree or a custom CRM/backend.

## Connect the quote form with Formspree

Create a form at [formspree.io](https://formspree.io), then change:

```html
<form class="quote-form" id="quote-form">
```

to:

```html
<form class="quote-form" id="quote-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

You will also need to replace the JavaScript demo submit handler with a `fetch()` request or allow the browser's normal form submission.

## Hosting

### Netlify

Drag the entire `buildora-materials` folder into [Netlify Drop](https://app.netlify.com/drop). Netlify will publish it and provide a live URL.

### GitHub Pages

1. Create a GitHub repository and upload every file and folder.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/root`, then save.

### cPanel / shared hosting

Upload the contents of this folder into `public_html`. Keep the `assets/images` folder structure unchanged.

### Vercel

Import the folder/repository as a new project. No framework preset or build command is required.

## Image notes

The three local marketing images were generated specifically for this website using OpenAI's built-in image generation tool. No remote stock-image dependency is required.
