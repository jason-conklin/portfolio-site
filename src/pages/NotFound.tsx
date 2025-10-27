import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";

function NotFoundPage() {
  return (
    <>
      <PageSEO path="/404" />
      <Section
        id="not-found"
        title="Page not found"
        description="That page might have shipped elsewhere. Head back to the portfolio to continue exploring Jason's work."
        className="min-h-[60vh] items-center justify-center text-center"
        headingClassName="text-4xl font-bold"
      >
        <div className="mx-auto max-w-xl space-y-6">
          <p className="text-base text-muted-foreground">
            Try navigating from the header or jump straight into the featured
            projects.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

export default NotFoundPage;
