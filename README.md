# SSD Hub website

Website for **SSD Hub — International Luxury Marketing & Growth Agency**.

## Brand direction
- Tagline: Beyond Visibility. Into Desirability.
- Visual language: editorial luxury; warm ivory, charcoal, champagne and warm grey.
- Positioning: India-headquartered, international market focus.
- Operating model: founder-led with a curated specialist partner network.

## Run locally
This project uses a Vercel serverless function for contact form delivery. Run with the Vercel CLI:
```bash
npm i -g vercel
vercel dev
``

## Private enquiry form setup
The recipient email address is deliberately not displayed on the website or embedded in the frontend. Configure these environment variables in Vercel Project Settings → Environment Variables:

- `CONTACT_EMAIL`: the private inbox that should receive enquiries.
- `RESEND_API_KEY`: API key from Resend.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified with Resend.

The form sends submissions to `/api/contact`, which forwards them server-side through Resend. Do not put the recipient address or API key in frontend code. Test the form after setting the environment variables and redeploying.

## WhatsApp
The floating WhatsApp CTA opens a chat with +91 98734 84787.

## Before publishing
- Add approved founder biography and verified credentials.
- Replace remote Unsplash image URLs with licensed brand photography.
- Add final domain, canonical URL, sitemap, analytics, cookie/privacy language and production form protections.
- Review all copy and legal/privacy requirements for the markets in which the site will operate.

No case studies or client results are currently presented. The website is not yet deployed and is not connected to a live Framer project.
