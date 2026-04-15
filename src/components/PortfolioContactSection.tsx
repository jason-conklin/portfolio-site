import { ArrowUpRight, Clock3, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact } from "@/data/profile";

const emailAddress = contact.email.replace(/^mailto:/, "");

export function PortfolioContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-6 pb-20 pt-[4.5rem] sm:px-8 sm:pb-24 sm:pt-20 lg:px-14 lg:pb-28 lg:pt-24 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="cinematic-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, var(--cinematic-band-accent-a), transparent 24%), radial-gradient(circle at 100% 0%, var(--cinematic-band-accent-b), transparent 20%)",
            }}
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
                Contact
              </p>
              <h2
                id="contact-title"
                className="mt-5 text-[clamp(2rem,3.8vw,3.4rem)] font-light tracking-[0.01em] cinematic-text-primary"
              >
                Open to serious product work, strong teams, and production problems worth solving.
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 cinematic-text-tertiary">
                Reach out for full-time roles, contract work, or collaboration around applied AI,
                secure product systems, and production-grade web engineering.
              </p>
            </div>

            <div className="cinematic-subpanel rounded-[1.75rem] p-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                Direct
              </p>
              <p className="mt-3 text-lg font-medium cinematic-text-primary">{emailAddress}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="cinematic-btn-primary h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                >
                  <a href={contact.email}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email Jason
                  </a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="cinematic-btn-ghost h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                >
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="cinematic-btn-ghost h-11 rounded-full px-5 text-sm hover:-translate-y-px"
                >
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="cinematic-chip rounded-2xl px-4 py-3">
                  <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] cinematic-text-quaternary">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    Response
                  </p>
                  <p className="mt-2 text-sm leading-6 cinematic-text-tertiary">
                    {contact.responseTimeNote}
                  </p>
                </div>
                <div className="cinematic-chip rounded-2xl px-4 py-3">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] cinematic-text-quaternary">
                    Demo access
                  </p>
                  <p className="mt-2 text-sm leading-6 cinematic-text-tertiary">
                    Private repositories and deeper walkthroughs are available on request.
                  </p>
                </div>
              </div>

              <a
                href={contact.email}
                className="mt-5 inline-flex items-center gap-2 text-sm cinematic-text-secondary transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
