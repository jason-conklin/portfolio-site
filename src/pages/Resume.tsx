import { PageSEO } from "@/app/seo";
import { about } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

function ResumePage() {
  const resumeUrl = about.resumeUrl;

  return (
    <>
      <PageSEO
        path="/resume"
        title="Jason Conklin's Resume"
        description="View or download Jason Conklin's resume highlighting experience, skills, and recent work."
      />
      <div className="flex min-h-[100svh] flex-col bg-background">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <header className="space-y-4">
            <Button
              asChild
              variant="ghost"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <Link to="/about">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to About
              </Link>
            </Button>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Jason Conklin&apos;s Resume
            </h1>
            <p className="text-sm text-muted-foreground">
              Preview the PDF below or download a copy for offline reference.
            </p>
            <Button
              asChild
              className="rounded-full"
              aria-label="Download Jason Conklin's resume as PDF"
            >
              <a href={resumeUrl} download>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
            </Button>
          </header>
          <div className="flex-1 overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-soft">
            <iframe
              title="Jason Conklin resume PDF preview"
              src={`${resumeUrl}#view=fitH`}
              className="h-full min-h-[70vh] w-full"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Can&apos;t view the embed?{" "}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default ResumePage;
