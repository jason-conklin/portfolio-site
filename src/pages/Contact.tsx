import { useEffect, useRef, useState } from "react";
import { Mail, Copy, Github, Linkedin } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { contact } from "@/data/profile";

// If you installed `emailjs-com`:
import emailjs from "@emailjs/browser";
// If you instead installed `@emailjs/browser`, swap the import:
// import emailjs from "@emailjs/browser";
import.meta.env;

console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);

const EMAIL = "jasonconklin.dev@gmail.com";
const SUBJECT = encodeURIComponent("Inquiry – Jason Conklin (Portfolio)");
const PREFILLED_BODY = encodeURIComponent("Hi Jason,\n\n");

function ContactPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageSEO path="/contact" />
      <Section
        id="contact"
        title="Contact"
        description="Reach out for collaborations, contract work, or full-time opportunities. I'm especially excited about building AI evaluation systems and developer tooling."
      >
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-card/70 p-10 shadow-soft backdrop-blur-sm">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Let's build something together.
            </h3>
            <p className="text-base text-muted-foreground">
              Whether it's a new idea, a creative engineering challenge, or a full-time role, I'm ready to collaborate.
            </p>
            <ContactCTAs />
            <motion.div
              id="demo-request"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-4 rounded-md border border-border/50 bg-muted/30 p-3 text-sm text-muted-foreground"
            >
              <strong className="mb-1 block text-foreground/80">
                Request a Demo
              </strong>
              <p>
                Some of my projects are hosted in private repositories. To explore one in more detail,
                include the project name in your message, and I'll provide a private demo link or
                recorded walkthrough.
              </p>
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Typically replies within 1–2 days.
          </p>
        </div>
      </Section>
    </>
  );
}

function ContactCTAs() {
  const [showForm, setShowForm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToastMessage("Email copied");
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastMessage(null), 2500);
    } catch {
      window.prompt("Copy email address", EMAIL);
    }
  };

  const mailto = `mailto:${EMAIL}?subject=${SUBJECT}&body=${PREFILLED_BODY}`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild className="rounded-full" aria-label="Email Jason">
          <a href={mailto} rel="noopener">
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            Email Me
          </a>
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={copyEmail}
          aria-label="Copy email address"
        >
          <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
          Copy email
        </Button>
        <button
          type="button"
          className="text-sm text-muted-foreground underline-offset-4 transition hover:underline"
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? "Hide form" : "Use form instead"}
        </button>
      </div>

      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            key="contact-toast"
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-foreground shadow-sm"
          >
            {toastMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showForm ? (
          <motion.div
            key="contact-form"
            initial={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ContactForm />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
    } else {
      console.warn("EmailJS public key is missing");
    }
  }, []);

  const isEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return;

    if (!name.trim() || !email.trim() || !isEmail(email) || message.trim().length < 20) {
      setError("Please enter a valid email and a message of at least 20 characters.");
      return;
    }

    setStatus("sending");
    setError(null);

    // 🚨 These keys MUST match your EmailJS template placeholders
    const params = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setError("Something went wrong while sending. Please try again or use the email button.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 grid max-w-md gap-3">
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          Work email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={honeypot}
        aria-hidden="true"
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Share a bit about your project or role (min 20 characters)"
          className="min-h-[120px] rounded-md border border-border/60 bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={20}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" className="rounded-full" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </Button>

        {status === "sent" && (
          <span className="text-xs text-green-500" aria-live="polite">
            ✅ Message sent! Expect a reply within 1–2 days.
          </span>
        )}
        {status === "error" && (
          <span className="text-xs text-destructive" aria-live="polite">
            ❌ Failed to send — please email manually.
          </span>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <p className="text-xs text-muted-foreground">
        Prefer email? Write to <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>
      </p>
    </form>
  );
}

export default ContactPage;
