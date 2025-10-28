import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
            Typically replies within 1-2 days.
          </p>
        </div>
      </Section>
    </>
  );
}

export default ContactPage;
