import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SCRUB } from "@/lib/motion";
import { Eyebrow, Button, ArrowRight, SplitLines } from "./primitives";

export default function BallFlight() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const ball = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Scroll-drawn flight arc: the trace draws itself while the ball rides
      // the same path. Scrubbed, so scrolling back rewinds the shot.
      // With motion disabled the markup fallback (full arc, ball at apex of
      // its flight's end) renders untouched.
      mm.add("(min-width: 0px)", () => {
        const p = path.current;
        const b = ball.current;
        if (!p || !b) return;

        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(b, { transformOrigin: "50% 50%" });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "center 38%",
              scrub: SCRUB,
            },
          })
          .to(p, { strokeDashoffset: 0 }, 0)
          .to(
            b,
            { motionPath: { path: p, align: p, alignOrigin: [0.5, 0.5] } },
            0
          )
          .from(b, { scale: 0.4, duration: 0.12 }, 0);
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="flight"
      className="section-fade relative overflow-hidden bg-transparent px-5 py-24 sm:px-8 lg:bg-base"
    >
      {/* Mobile-only legibility wash over the shared Hero+BallFlight
          background (the fixed photo itself lives in App.tsx, one layer
          shared by both sections — see the comment there). Plain overlay,
          not another fixed-attachment layer, so it doesn't duplicate the scene. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/60 via-base/20 to-base/85 lg:hidden" />

      <svg
        className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-40 w-full max-w-2xl opacity-70"
        viewBox="0 0 600 160"
        aria-hidden="true"
      >
        <path
          ref={path}
          d="M 30 150 C 160 10, 440 0, 570 90"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(198,255,58,0.5))" }}
        />
        <circle
          ref={ball}
          cx="570"
          cy="90"
          r="9"
          fill="#fff"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.45))" }}
        />
      </svg>
      <div className="relative mt-28">
        <div data-scrub>
          <Eyebrow>The Lineup</Eyebrow>
        </div>
        <SplitLines className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.02em] text-fg">
          Four clubs. <span className="text-accent">One standard.</span>
        </SplitLines>
        <p data-scrub className="mt-5 max-w-md text-muted">
          Every piece in the 2026 collection is built to the same exacting
          tolerance.
        </p>
        <div data-scrub className="mt-8">
          <Button href="#lineup" variant="primary">
            View the lineup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
