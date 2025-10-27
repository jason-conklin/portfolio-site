import { Mail, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { contact } from "@/data/profile";

function ContactPage() {
  return (
    <>
      <PageSEO path="/contact" />
      <Section
        id="contact"
        title="Contact"
        description="Reach out for collaborations, contract work, or full-time opportunities. I am especially excited about building AI evaluation systems and developer tooling."
      >
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-card/70 p-10 shadow-soft backdrop-blur-sm">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Let’s build something together.
            </h3>
            <p className="text-base text-muted-foreground">
              Share a short brief, link to a problem statement, or ask about the
              current Render deployments — replies typically include a roadmap
              and next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a href={contact.email}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Email me
              </a>
            </Button>
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
            {contact.responseTimeNote}
          </p>
        </div>
      </Section>
    </>
  );
}

export default ContactPage;
