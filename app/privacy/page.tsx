import Container from "@/components/layout/Container";

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: [
      "We collect information you submit directly, including your name, email, company details, and message when you use our contact form.",
      "We may also collect basic technical data such as browser type, device information, and usage analytics to improve site performance.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "To respond to enquiries and provide requested services.",
      "To improve website performance, content quality, and user experience.",
      "To maintain security, prevent abuse, and comply with legal obligations.",
    ],
  },
  {
    title: "3. Data sharing",
    body: [
      "We do not sell personal data.",
      "We may share information with trusted service providers who support hosting, analytics, communications, or operations, only as required to run our business.",
    ],
  },
  {
    title: "4. Data retention",
    body: [
      "We retain personal information only for as long as needed to handle your request, deliver services, and satisfy legal or accounting requirements.",
    ],
  },
  {
    title: "5. Your rights",
    body: [
      "You may request access, correction, or deletion of your personal data by contacting us.",
      "You may also request that we stop processing your information where legally applicable.",
    ],
  },
  {
    title: "6. Contact",
    body: ["For privacy-related requests, contact us at info@nemnidhi.com."],
  },
];

export default function PrivacyPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-10 md:py-14">
        <header className="mb-8 space-y-4">
          <p className="section-eyebrow">Legal</p>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="max-w-3xl section-copy">
            This page explains how Nemnidhi collects, uses, and protects information when you interact with our website
            and services.
          </p>
        </header>

        <div className="theme-card p-5 md:p-7">
          <p className="mb-6 section-eyebrow">Last updated: February 23, 2026</p>

          <div className="space-y-7">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-[#003464]">{section.title}</h2>
                <div className="space-y-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[#333333]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
