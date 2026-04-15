import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageSEO } from "@/app/seo";

function NotFoundPage() {
  return (
    <>
      <PageSEO path="/404" />
      <section
        id="not-found"
        aria-labelledby="not-found-title"
        className="px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex min-h-[calc(100svh-var(--header-height)-8rem)] max-w-5xl items-center justify-center">
          <div className="cinematic-panel-strong relative w-full max-w-3xl overflow-hidden rounded-[2rem] px-8 py-10 text-center sm:px-10 sm:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, var(--cinematic-band-accent-a), transparent 26%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 24%)",
              }}
            />
            <div aria-hidden="true" className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] cinematic-text-quaternary">
                404
              </p>
              <h1
                id="not-found-title"
                className="mt-5 text-[clamp(2.2rem,4vw,3.5rem)] font-light tracking-[0.01em] cinematic-text-primary"
              >
                Page not found
              </h1>
              <p className="mt-4 text-[1rem] leading-7 cinematic-text-tertiary">
                That page might have shipped elsewhere. Head back to the portfolio to continue exploring the work.
              </p>
              <p className="mt-3 text-sm leading-6 cinematic-text-quaternary">
                You can jump back into the homepage sections from the main navigation or return directly below.
              </p>

              <div className="mt-8 flex justify-center">
                <Button asChild className="cinematic-btn-primary h-11 rounded-full px-5 text-sm hover:-translate-y-px">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
