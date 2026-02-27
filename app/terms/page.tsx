import Container from "@/components/layout/Container";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: [
      "By accessing this website, you agree to these Terms and Conditions and all applicable laws.",
    ],
  },
  {
    title: "2. Services and scope",
    body: [
      "Nemnidhi provides digital strategy, design, development, and operational support services as agreed in project proposals or contracts.",
      "Specific deliverables, timelines, and responsibilities are defined separately in writing for each engagement.",
    ],
  },
  {
    title: "3. Client responsibilities",
    body: [
      "Clients are responsible for providing accurate information, timely feedback, approvals, and required access to systems.",
      "Delays in required client inputs may affect timelines and delivery commitments.",
    ],
  },
  {
    title: "4. Fees and payments",
    body: [
      "Project fees, milestones, and payment terms are defined in each approved proposal or agreement.",
      "Late payments may result in paused work, withheld deliverables, or additional charges where permitted.",
    ],
  },
  {
    title: "5. Intellectual property",
    body: [
      "Unless otherwise agreed, final deliverables are transferred to the client after full payment.",
      "Nemnidhi retains rights to pre-existing tools, frameworks, and general know-how used during delivery.",
    ],
  },
  {
    title: "6. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, Nemnidhi is not liable for indirect, incidental, or consequential damages arising from use of this website or services.",
    ],
  },
  {
    title: "7. Updates to these terms",
    body: [
      "We may update these terms periodically. Continued use of this website after updates constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      "For questions about these terms, contact info@nemnidhi.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="theme-section min-h-screen">
      <Container className="py-16 md:py-22">
        <header className="mb-10 space-y-4">
          <p className="theme-pill">Legal</p>
          <h1 className="text-4xl text-slate-50 md:text-5xl">
            Terms and Conditions
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            These terms govern your use of the Nemnidhi website and any related
            services offered through direct engagement.
          </p>
        </header>

        <div className="theme-card rounded-3xl p-5 md:p-7">
          <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate-400">
            Last updated: February 23, 2026
          </p>

          <div className="space-y-7">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-100">
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-slate-300">
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
