import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { Eyebrow, SplitLines } from "./primitives";

type Feature = { n: string; title: string; desc: string; img: string };

const FEATURES: Feature[] = [
  {
    n: "01",
    title: "Aerodynamics",
    desc: "A carbon crown tuned across 400 wind-tunnel hours cuts drag and holds a penetrating, wind-boring flight.",
    img: "/images/product-driver.jpg",
  },
  {
    n: "02",
    title: "The Face",
    desc: "A variable-thickness C300 steel face, milled to ±0.01mm, returns ball speed across the entire hitting area.",
    img: "/images/tech-face.jpg",
  },
  {
    n: "03",
    title: "Stability",
    desc: "A 10,000 MOI perimeter weighting keeps the face square to the ball when the strike is anything but perfect.",
    img: "/images/product-irons.jpg",
  },
];

const STATS = [
  { value: "317", suffix: "yd", label: "Avg. carry" },
  { value: "10,000", suffix: "MOI", label: "Forgiveness" },
  { value: "176", suffix: "mph", label: "Ball speed" },
  { value: "0.01", suffix: "mm", label: "Face tolerance" },
];

export default function TechBreakdown() {
  const root = useRef<HTMLElement>(null);
  const features = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        // Feature columns rise in sequence.
        gsap.from(".tech-card", {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.14,
          scrollTrigger: {
            trigger: features.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Scroll-scrubbed parallax inside each feature image (pre-scaled so
        // the drift never exposes edges).
        gsap.utils.toArray<HTMLElement>(".tech-parallax").forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: layer.closest(".tech-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // Count-up stats. Final values are already in the markup (static /
        // reduced-motion fallback); the tween counts from 0 once on enter.
        gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
          const raw = el.dataset.value ?? "0";
          const target = parseFloat(raw.replace(/,/g, ""));
          const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: stats.current, start: "top 85%", once: true },
            onUpdate() {
              el.textContent = counter.v.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="tech" className="section-fade relative bg-base">
      <div className="px-5 py-24 sm:px-8 lg:mx-auto lg:max-w-[1400px] lg:px-10">
        <div data-scrub>
          <Eyebrow>Engineering</Eyebrow>
        </div>
        <SplitLines className="mt-4 font-display text-[clamp(2.1rem,6vw,3.6rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg">
          Built down to the micron.
        </SplitLines>
        <div ref={features} className="mt-14 space-y-16 lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0">
          {FEATURES.map((f) => (
            <div key={f.n} className="tech-card">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
                <div className="tech-parallax h-full w-full will-change-transform">
                  <img src={f.img} alt={f.title} loading="lazy" className="h-full w-full scale-[1.16] object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
              </div>
              <div className="mt-5 font-display text-sm text-accent">{f.n}</div>
              <h3 className="mt-2 font-display text-2xl text-fg">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-line bg-base-2">
        <div ref={stats} className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px px-5 py-14 sm:px-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 py-4">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="stat-value font-display text-[clamp(2rem,4vw,3rem)] font-light text-fg tabular-nums"
                  data-value={s.value}
                >
                  {s.value}
                </span>
                <span className="text-sm text-accent">{s.suffix}</span>
              </div>
              <div className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
