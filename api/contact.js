export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { name, email, company, country, industry, service, project_brief, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true });
  if (!name || !email || !project_brief) {
    return res.status(400).json({ message: "Please complete the required fields." });
  }

  const recipient = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!recipient || !apiKey || !from) {
    return res.status(500).json({ message: "The enquiry service is not configured yet. Please try again later." });
  }

  const safe = (value) => String(value || "").trim().slice(0, 5000);
  const content = [
    "New SSD Hub website enquiry",
    "",
    "Name: " + safe(name),
    "Email: " + safe(email),
    "Company: " + safe(company),
    "Country / Market: " + safe(country),
    "Industry: " + safe(industry),
    "Service: " + safe(service),
    "",
    "Project brief:",
    safe(project_brief)
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
        reply_to: safe(email),
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
