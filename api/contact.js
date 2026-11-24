export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { name, email, company, country, industry, service, project_brief, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true });

  const safe = (value, max = 1000) => String(value || "").trim().slice(0, max);
  const cleanName = safe(name, 120);
  const cleanEmail = safe(email, 254);
  const cleanBrief = safe(project_brief, 4000);
  if (!cleanName || !cleanEmail || !cleanBrief || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ message: "Please enter a valid name, email and project brief." });
  }

  const recipient = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!recipient || !apiKey || !from) {
    return res.status(500).json({ message: "The enquiry service is not configured yet. Please try again later." });
  }

  const content = [
    "New SSD Hub website enquiry",
    "",
    "Name: " + cleanName,
    "Email: " + cleanEmail,
    "Company: " + safe(company, 200),
    "Country / Market: " + safe(country, 120),
    "Industry: " + safe(industry, 120),
    "Service: " + safe(service, 160),
    "",
    "Project brief:",
    cleanBrief
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: cleanEmail,
        subject: "New SSD Hub website enquiry",
        text: content
      })
    });
    if (!response.ok) {
      return res.status(502).json({ message: "We could not send your enquiry right now. Please try again." });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ message: "Something went wrong while sending your enquiry." });
  }
}
