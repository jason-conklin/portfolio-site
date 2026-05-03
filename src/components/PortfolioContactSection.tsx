import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Clock3, Copy, Github, Linkedin, Mail, RadioTower } from "lucide-react";

import { Button } from "@/components/ui/button";
import jasonHeadshot from "@/assets/jason.png";
import { about, contact, hero } from "@/data/profile";

const emailAddress = contact.email.replace(/^mailto:/, "");
const contactLocation = about.location.replace(", USA", "").replace(" · ", " · ");

export function PortfolioContactSection() {
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = emailAddress;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = window.setTimeout(() => {
        setCopied(false);
        copyResetRef.current = null;
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-[var(--section-scroll-offset)] px-6 pb-20 pt-[4.5rem] sm:px-8 sm:pb-24 sm:pt-20 lg:px-14 lg:pb-28 lg:pt-24 lg:pl-[12rem] lg:pr-16 xl:pl-[14rem]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-[92rem]" data-section-anchor="contact">
        <div className="cinematic-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, var(--cinematic-band-accent-a), transparent 24%), radial-gradient(circle at 100% 0%, var(--cinematic-band-accent-b), transparent 20%)",
            }}
          />
          <div
            aria-hidden="true"
            className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px"
          />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1.02fr)_minmax(23rem,0.98fr)] lg:items-stretch lg:gap-10">
            <div className="flex flex-col">
              <div>
                <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.26em] cinematic-text-quaternary">
                  <RadioTower className="h-3.5 w-3.5 cinematic-text-tertiary" aria-hidden="true" />
                  Closing Note
                </p>
                <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] cinematic-text-tertiary">
                  Contact
                </p>
              </div>

              <div className="mt-4">
                <h2
                  id="contact-title"
                  className="max-w-[21ch] text-[clamp(1.55rem,2.7vw,2.45rem)] font-light tracking-[0.01em] cinematic-text-primary"
                >
                  Open to serious product work, strong teams, and production problems worth solving.
                </h2>
                <p className="mt-5 max-w-2xl text-[1rem] leading-7 cinematic-text-tertiary">
                  Reach out for full-time roles, contract work, or collaboration around applied AI,
                  secure product systems, and production-grade web engineering.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] cinematic-text-quaternary">
                  <span className="cinematic-chip inline-flex items-center gap-2 rounded-full px-3.5 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    Available for serious opportunities
                  </span>
                  <span className="cinematic-chip rounded-full px-3.5 py-2">
                    Remote-friendly
                  </span>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-6 cinematic-text-quaternary">
                Best fit: production product teams, technically ambitious early-stage companies,
                and organizations that need strong execution across full-stack systems and applied AI.
              </p>
            </div>

            <div className="cinematic-subpanel relative flex h-full flex-col rounded-[1.85rem] p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.85rem]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03), transparent 24%), radial-gradient(circle at 100% 0%, var(--cinematic-band-accent-a), transparent 26%)",
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="cinematic-chip-strong rounded-[1.4rem] px-4 py-3.5 sm:px-4.5 sm:py-4">
                  <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.75rem] border border-[color:var(--cinematic-border-strong)] bg-white/[0.04] shadow-[0_20px_42px_-22px_rgba(255,170,84,0.56)] sm:h-32 sm:w-32">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.1) 0%, transparent 44%), radial-gradient(circle at 82% 82%, rgba(255,184,88,0.14) 0%, transparent 40%)",
                        }}
                      />
                      <img
                        src={jasonHeadshot}
                        alt="Jason Conklin headshot"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="min-w-0 flex-1 sm:py-1">
                      <p className="text-[1.04rem] font-medium tracking-[0.01em] cinematic-text-primary">
                        {hero.name}
                      </p>
                      <p className="mt-1 text-sm cinematic-text-secondary">
                        Full-stack developer
                      </p>
                      <p className="mt-1 text-[0.76rem] uppercase tracking-[0.17em] cinematic-text-quaternary">
                        {contactLocation}
                      </p>

                      <div
                        aria-hidden="true"
                        className="mt-2.5 h-px bg-white/8"
                      />

                      <div className="mt-2.5">
                        <p className="text-[0.64rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                          Direct
                        </p>
                        <div className="mt-1.5 flex items-start gap-3">
                          <p className="min-w-0 flex-1 break-all text-[1.08rem] font-medium tracking-[0.01em] cinematic-text-primary sm:text-[1.14rem]">
                            {emailAddress}
                          </p>
                          <button
                            type="button"
                            data-cursor-interactive="true"
                            onClick={handleCopyEmail}
                            aria-label={copied ? "Email copied" : "Copy email address"}
                            title={copied ? "Copied" : "Copy email"}
                            className="cinematic-chip inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)]"
                          >
                            {copied ? (
                              <Check className="h-4.5 w-4.5 cinematic-text-primary" aria-hidden="true" />
                            ) : (
                              <Copy className="h-4.5 w-4.5 cinematic-text-tertiary" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.18em] cinematic-text-quaternary">
                    Reach Out
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
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
                </div>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <div className="cinematic-chip rounded-[1.15rem] px-3.5 py-3">
                    <p className="inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.16em] cinematic-text-quaternary">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      Response
                    </p>
                    <p className="mt-1.5 text-[0.92rem] leading-5.5 cinematic-text-tertiary">
                      Replies within 1–2 days
                    </p>
                  </div>
                  <div className="cinematic-chip rounded-[1.15rem] px-3.5 py-3">
                    <p className="text-[0.66rem] font-medium uppercase tracking-[0.16em] cinematic-text-quaternary">
                      Demo access
                    </p>
                    <p className="mt-1.5 text-[0.92rem] leading-5.5 cinematic-text-tertiary">
                      Private repos and walkthroughs on request
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <a
                    href={contact.email}
                    className="inline-flex items-center gap-2 text-sm cinematic-text-secondary transition hover:[color:var(--cinematic-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cinematic-focus-ring)] focus-visible:ring-offset-2"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
