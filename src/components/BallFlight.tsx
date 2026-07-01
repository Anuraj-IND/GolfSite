import { Eyebrow, Button, ArrowRight } from "./primitives";

export default function BallFlight() {
  return (
    <section id="flight" className="relative overflow-hidden bg-base px-5 py-24 sm:px-8">
      <svg
        className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-40 w-full max-w-2xl opacity-70"
        viewBox="0 0 600 160"
        aria-hidden="true"
      >
        <path
          d="M 30 150 C 160 10, 440 0, 570 90"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(198,255,58,0.5))" }}
        />
        <circle cx="570" cy="90" r="9" fill="#fff" />
      </svg>
      <div className="relative mt-28">
        <Eyebrow>The Lineup</Eyebrow>
        <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.02em] text-fg">
          Four clubs. <span className="text-accent">One standard.</span>
        </h2>
        <p className="mt-5 max-w-md text-muted">
          Every piece in the 2026 collection is built to the same exacting
          tolerance.
        </p>
        <Button href="#lineup" variant="primary" className="mt-8">
          View the lineup
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
