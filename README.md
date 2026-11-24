# SSD Hub website

**Live domain:** https://ssdluxury.vercel.app/  
**Positioning:** International Luxury Marketing & Growth Agency  
**Tagline:** Beyond Visibility. Into Desirability.

## Brand and operating model
- India-based, international market focus.
- Founder-led with a curated network of specialist partners.
- Editorial luxury visual language: warm ivory, charcoal, champagne and warm grey.
- Priority SEO categories: luxury real estate and luxury hospitality, supported by brand strategy and digital marketing capabilities.
- No case studies, client logos, testimonials or performance claims are published.

## Website structure
- Home and About
- Seven service landing pages
- Six industry landing pages
- Contact, Privacy and Terms
- `robots.txt`, `sitemap.xml`, favicon and structured data

## Run locally
This project uses a Vercel serverless function for contact form delivery:
```bash
npm i -g vercel
vercel dev
```

## Private enquiry form setup
The recipient email address is deliberately not displayed on the website or embedded in frontend code. Configure these environment variables in Vercel Project Settings → Environment Variables:
- `CONTACT_EMAIL`: private inbox that receives enquiries.
- `RESEND_API_KEY`: API key from Resend.
- `RESEND_FROM_EMAIL`: sender address on a domain verified with Resend.

The form posts to `/api/contact`, which forwards the enquiry server-side through Resend. Do not place the recipient address or API key in frontend code. Submit a test enquiry after configuration and redeployment.

## WhatsApp
The floating WhatsApp CTA opens a chat with +91 98734 84787.

## SEO implementation
- Homepage and landing-page title tags and meta descriptions.
- Canonical URLs use the current Vercel domain.
- Open Graph and Twitter metadata.
- Organization/agency and service structured data.
- XML sitemap and robots.txt.
- Descriptive internal links between the homepage and service/industry pages.
- Responsive layouts and mobile navigation.

## Remaining launch checklist
- Connect and verify Google Search Console; submit `https://ssdluxury.vercel.app/sitemap.xml`.
- Connect GA4 and configure a conversion event for successful form submissions.
- Set Vercel environment variables and test the enquiry flow end-to-end.
- Replace temporary Unsplash images with licensed brand photography and add a branded social sharing image.
- Run Lighthouse/PageSpeed on desktop and mobile after deployment; fix any Core Web Vitals issues.
- Review Privacy and Terms pages with appropriate legal advice for the markets served.
- Add only verified founder credentials and approved biography details.

The website code is maintained in this repository and deployment depends on the Vercel project being connected to the GitHub repository. Confirm the latest production deployment in Vercel before treating these commits as live.
