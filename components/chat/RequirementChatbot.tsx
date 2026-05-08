"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageSquareText, Send, X } from "lucide-react";

type ChatRole = "bot" | "user";
type ChatStep = "service" | "goal" | "budget" | "timeline" | "notes" | "contact";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

type RequirementDraft = {
  service: string;
  goal: string;
  budget: string;
  timeline: string;
  notes: string;
};

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactApiResponse = {
  message?: string;
};

const SERVICE_OPTIONS = ["Business website", "Web app / dashboard", "Automation / CRM", "Not sure yet"];
const GOAL_OPTIONS = ["Get more leads", "Streamline operations", "Launch a new product", "Need consultation first"];
const BUDGET_OPTIONS = ["Below INR 50,000", "INR 50,000 to INR 1,00,000", "INR 1,00,000 to INR 3,00,000", "INR 3,00,000+"];
const TIMELINE_OPTIONS = ["ASAP (2-4 weeks)", "1-3 months", "3+ months", "Just exploring"];

const EMPTY_DRAFT: RequirementDraft = {
  service: "",
  goal: "",
  budget: "",
  timeline: "",
  notes: "",
};

const DEFAULT_PHONE_PREFIX = "+91 ";

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  phone: DEFAULT_PHONE_PREFIX,
  message: "",
};

function makeMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
  };
}

function getInitialMessages() {
  return [
    makeMessage("bot", "Hi, I am your requirement assistant."),
    makeMessage(
      "bot",
      "I will quickly understand your requirement and then share a contact form so our team can reach out with the right plan."
    ),
    makeMessage("bot", "What do you need right now?"),
  ];
}

export default function RequirementChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("service");
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [draft, setDraft] = useState<RequirementDraft>(EMPTY_DRAFT);
  const [noteInput, setNoteInput] = useState("");
  const [contactForm, setContactForm] = useState<ContactForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const requirementSummary = useMemo(() => {
    const parts = [
      `Requirement type: ${draft.service || "Not shared"}`,
      `Primary goal: ${draft.goal || "Not shared"}`,
      `Budget: ${draft.budget || "Not shared"}`,
      `Timeline: ${draft.timeline || "Not shared"}`,
    ];

    if (draft.notes.trim()) {
      parts.push(`Additional note: ${draft.notes.trim()}`);
    }

    return parts.join("\n");
  }, [draft]);

  const options = useMemo(() => {
    if (step === "service") return SERVICE_OPTIONS;
    if (step === "goal") return GOAL_OPTIONS;
    if (step === "budget") return BUDGET_OPTIONS;
    if (step === "timeline") return TIMELINE_OPTIONS;
    return [];
  }, [step]);

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, makeMessage("bot", text)]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, makeMessage("user", text)]);
  };

  const resetChat = () => {
    setStep("service");
    setMessages(getInitialMessages());
    setDraft(EMPTY_DRAFT);
    setNoteInput("");
    setContactForm(EMPTY_FORM);
    setSuccess(null);
    setError(null);
    setSubmitting(false);
  };

  const openContactStep = (notes: string) => {
    setDraft((prev) => ({ ...prev, notes }));
    setStep("contact");
    pushBot("Perfect. Please fill this contact form and we will send you a tailored recommendation.");
  };

  const handleOptionSelect = (answer: string) => {
    pushUser(answer);

    if (step === "service") {
      setDraft((prev) => ({ ...prev, service: answer }));
      setStep("goal");
      pushBot("Great. What outcome matters most for you right now?");
      return;
    }

    if (step === "goal") {
      setDraft((prev) => ({ ...prev, goal: answer }));
      setStep("budget");
      pushBot("Helpful. What budget range are you planning for this?");
      return;
    }

    if (step === "budget") {
      setDraft((prev) => ({ ...prev, budget: answer }));
      setStep("timeline");
      pushBot("Nice. What timeline do you have in mind?");
      return;
    }

    if (step === "timeline") {
      setDraft((prev) => ({ ...prev, timeline: answer }));
      setStep("notes");
      pushBot("Any specific feature or challenge we should know? You can type it below or skip.");
    }
  };

  const handleNotesSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = noteInput.trim();
    if (!note) return;

    pushUser(note);
    setNoteInput("");
    openContactStep(note);
  };

  const handleSkipNotes = () => {
    pushUser("Skip for now");
    openContactStep("");
  };

  const handleContactChange = (field: keyof ContactForm, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const composeFinalMessage = () => {
    const trimmed = contactForm.message.trim();
    if (!trimmed) return requirementSummary;
    if (trimmed === requirementSummary) return trimmed;
    return `${trimmed}\n\n[Chatbot summary]\n${requirementSummary}`;
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          phone: contactForm.phone.trim(),
          budget: draft.budget,
          timeline: draft.timeline,
          message: composeFinalMessage(),
          source: "Chatbot assistant",
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data: ContactApiResponse | null = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Could not submit enquiry.");
      }

      setSuccess(data?.message || "Thanks. Our team will contact you shortly.");
      pushBot("Thank you. Your requirement has been submitted successfully.");
      setContactForm((prev) => ({
        ...EMPTY_FORM,
        message: prev.message,
      }));
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === "contact") {
      setContactForm((prev) => ({
        ...prev,
        message: prev.message.trim() ? prev.message : requirementSummary,
      }));
    }
  }, [step, requirementSummary]);

  useEffect(() => {
    if (!isOpen) return;
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, messages, step, error, success]);

  return (
    <div className="fixed bottom-[5.25rem] right-3 z-[70] md:bottom-6 md:right-6">
      {isOpen && (
        <section className="mb-3 w-[calc(100vw-1.5rem)] max-w-[390px] overflow-hidden rounded-2xl border border-[#325173]/70 bg-[linear-gradient(165deg,rgba(14,23,37,0.97),rgba(10,18,30,0.98))] shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-[#2D4662]/75 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#37628E]/65 bg-[#132538] p-2 text-[#7BC4FF]">
                <Bot size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#E7F0FF]">Requirement Assistant</p>
                <p className="text-[11px] text-[#8095AC]">Guided help + contact handoff</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[#375778] bg-[#132338] p-1.5 text-[#93AEC8] transition hover:border-[#4B7AA6] hover:text-[#D3E7FF]"
              aria-label="Close chatbot"
            >
              <X size={14} />
            </button>
          </div>

          <div ref={messagesRef} className="max-h-[315px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                  message.role === "bot"
                    ? "bg-[#101C2C] text-[#D0E3F7]"
                    : "ml-auto bg-[#1A3A63] text-[#EAF3FF]"
                }`}
              >
                {message.text}
              </div>
            ))}

            {step === "contact" && (
              <div className="rounded-xl border border-[#2E4864]/70 bg-[#0E1929]/85 p-3 text-[11px] text-[#8EA9C4]">
                <p className="mb-1 font-semibold uppercase tracking-[0.12em] text-[#B8D8F5]">Captured Requirement</p>
                <pre className="whitespace-pre-wrap font-sans leading-5 text-[#AFC7DF]">{requirementSummary}</pre>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
            )}
            {success && (
              <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                {success}
              </div>
            )}
          </div>

          <div className="border-t border-[#2D4662]/75 px-3 py-3">
            {(step === "service" || step === "goal" || step === "budget" || step === "timeline") && (
              <div className="grid gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className="rounded-xl border border-[#385A7B]/75 bg-[#101D2E] px-3 py-2 text-left text-xs font-medium text-[#D6E8FB] transition hover:border-[#5A8BB8] hover:bg-[#15263A]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step === "notes" && (
              <form onSubmit={handleNotesSubmit} className="space-y-2">
                <textarea
                  value={noteInput}
                  onChange={(event) => setNoteInput(event.target.value)}
                  placeholder="Example: Need WhatsApp integration and lead dashboard."
                  className="h-20 w-full rounded-xl border border-[#345474]/80 bg-[#101D2E] px-3 py-2 text-xs text-[#D7E8FA] outline-none transition placeholder:text-[#7F9AB5] focus:border-[#69A3D7]"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-[#1E68B1]/80 bg-[linear-gradient(140deg,#33DEC0,#004DC5)] px-3 py-2 text-xs font-semibold text-[#EAF3FF] transition hover:brightness-[1.04]"
                  >
                    <Send size={12} />
                    Send detail
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipNotes}
                    className="rounded-xl border border-[#3B5E80]/75 bg-[#101D2E] px-3 py-2 text-xs font-medium text-[#C5DAF0] transition hover:border-[#5A88B2]"
                  >
                    Skip
                  </button>
                </div>
              </form>
            )}

            {step === "contact" && (
              <form onSubmit={handleContactSubmit} className="space-y-2 text-xs">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    value={contactForm.name}
                    onChange={(event) => handleContactChange("name", event.target.value)}
                    className="rounded-xl border border-[#345474]/80 bg-[#101D2E] px-3 py-2 text-xs text-[#D7E8FA] outline-none transition placeholder:text-[#7F9AB5] focus:border-[#69A3D7]"
                    placeholder="Your name *"
                    required
                  />
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(event) => handleContactChange("email", event.target.value)}
                    className="rounded-xl border border-[#345474]/80 bg-[#101D2E] px-3 py-2 text-xs text-[#D7E8FA] outline-none transition placeholder:text-[#7F9AB5] focus:border-[#69A3D7]"
                    placeholder="Work email *"
                    required
                  />
                </div>

                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(event) => handleContactChange("phone", event.target.value)}
                  className="w-full rounded-xl border border-[#345474]/80 bg-[#101D2E] px-3 py-2 text-xs text-[#D7E8FA] outline-none transition placeholder:text-[#7F9AB5] focus:border-[#69A3D7]"
                  placeholder="Mobile number *"
                  required
                />

                <textarea
                  value={contactForm.message}
                  onChange={(event) => handleContactChange("message", event.target.value)}
                  className="h-24 w-full rounded-xl border border-[#345474]/80 bg-[#101D2E] px-3 py-2 text-xs text-[#D7E8FA] outline-none transition placeholder:text-[#7F9AB5] focus:border-[#69A3D7]"
                  placeholder="Anything else you want us to know?"
                  required
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-[#1E68B1]/80 bg-[linear-gradient(140deg,#33DEC0,#004DC5)] px-3 py-2 text-xs font-semibold text-[#EAF3FF] transition hover:brightness-[1.04] disabled:opacity-65"
                  >
                    {submitting ? "Submitting..." : "Submit contact form"}
                  </button>
                  <button
                    type="button"
                    onClick={resetChat}
                    className="rounded-xl border border-[#3B5E80]/75 bg-[#101D2E] px-3 py-2 text-xs font-medium text-[#C5DAF0] transition hover:border-[#5A88B2]"
                  >
                    Restart
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group inline-flex items-center gap-2 rounded-full border border-[#2C5A86]/80 bg-[linear-gradient(140deg,rgba(12,24,40,0.97),rgba(14,35,57,0.97))] px-4 py-2.5 text-sm font-semibold text-[#E6F1FF] shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition hover:border-[#4F88BD] hover:shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
        aria-label={isOpen ? "Close requirement assistant" : "Open requirement assistant"}
      >
        <MessageSquareText size={16} className="text-[#7BC4FF] transition group-hover:text-[#ABDAFF]" />
        {isOpen ? "Close Chat" : "Need Help?"}
      </button>
    </div>
  );
}
