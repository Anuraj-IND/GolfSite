import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Eyebrow } from "./primitives";

export default function ParallaxInterstitial() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        // Kinetic wordmark — drifts laterally as the scene scrolls past.
        gsap.fromTo(
          word.current,
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Statement fills in word by word as the scene scrolls through the
        // viewport — scrubbed, so it drains back out on scroll-up.
        if (!statement.current) return;
        const split = SplitText.create(statement.current, { type: "words" });
        gsap.from(split.words, {
          opacity: 0.12,
          y: 14,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            end: "center 42%",
            scrub: 0.4,
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-base"
    >
      {/* Back plane — fairway, fixed to the viewport so the page scrolls
          over it (classic "static background" window effect). Falls back to
          normal attachment on iOS where fixed backgrounds are broken. */}
      <div
        className="bg-fixed-scene absolute inset-0"
        style={{
          backgroundImage: "url(/images/scene-fairway.jpg)",
          filter: "saturate(0.55) brightness(0.95)",
        }}
        role="img"
        aria-label="Misty championship fairway at dawn"
      />

      {/* Haze for atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,10,9,0.55) 0%, rgba(8,10,9,0.1) 35%, rgba(8,10,9,0.2) 65%, rgba(8,10,9,0.85) 100%)",
        }}
      />

      {/* Outlined kinetic wordmark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          ref={word}
          className="select-none whitespace-nowrap font-display text-[clamp(2.5rem,12vw,9rem)] font-light leading-none tracking-tight text-transparent will-change-transform"
          style={{ WebkitTextStroke: "1px rgba(232,239,230,0.24)" }}
        >
          GOLF THING
        </span>
      </div>

      {/* Foreground statement */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[1000px] px-5 text-center sm:px-8">
          <div data-scrub className="flex justify-center">
            <Eyebrow>The Golf Thing Standard</Eyebrow>
          </div>
          <p
            ref={statement}
            className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.7rem,4.4vw,3rem)] font-light leading-[1.15] tracking-[-0.01em] text-fg"
          >
            We don't chase distance. We{" "}
            <span className="text-accent">engineer</span> it — one micron, one
            swing, one Sunday at a time.
          </p>
        </div>
      </div>

      {/* Ground vignette */}
      <div
        className="absolute bottom-0 left-0 h-1/2 w-full"
        style={{ background: "linear-gradient(to top, var(--color-base) 8%, transparent 100%)" }}
      />
    </section>
  );
}
