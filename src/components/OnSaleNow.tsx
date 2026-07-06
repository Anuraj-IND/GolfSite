import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { Eyebrow, CartIcon, ArrowRight, SplitLines } from "./primitives";

type SaleItem = {
  n: string;
  category: string;
  name: string;
  spec: string;
  price: string;
  original: string;
  discount: string;
  img: string;
};

const SALE_ITEMS: SaleItem[] = [
  { n: "01", category: "Driver", name: "Aero Driver X", spec: "460cc · adjustable loft", price: "$549", original: "$649", discount: "15% off", img: "/images/product-driver.jpg" },
  { n: "02", category: "Irons", name: "Forged MB Irons", spec: "5–PW · 1025 carbon steel", price: "$1,199", original: "$1,499", discount: "20% off", img: "/images/product-irons.jpg" },
  { n: "03", category: "Ball", name: "Tour Pro Balls", spec: "4-piece · urethane cover", price: "$42 / doz", original: "$58 / doz", discount: "Save $16", img: "/images/product-ball.jpg" },
  { n: "04", category: "Apparel", name: "Performance Kit", spec: "Polo + structured cap", price: "$99", original: "$148", discount: "33% off", img: "/images/product-apparel.jpg" },
  { n: "05", category: "Shoes", name: "Spikeless Golf Shoes", spec: "Multi-surface traction", price: "$99", original: "$139", discount: "29% off", img: "https://picsum.photos/seed/golfthing-spikeless-shoes/600/750" },
  { n: "06", category: "Bags", name: "Stand Bag", spec: "4-way top · dual strap", price: "$179", original: "$229", discount: "22% off", img: "https://picsum.photos/seed/golfthing-stand-bags/600/750" },
  { n: "07", category: "Accessories", name: "Golf Gloves 3-Pack", spec: "Cabretta leather", price: "$59", original: "$79", discount: "25% off", img: "https://picsum.photos/seed/golfthing-gloves/600/750" },
  { n: "08", category: "Tech", name: "Laser Rangefinder", spec: "±1 yard · slope mode", price: "$299", original: "$399", discount: "25% off", img: "/images/tech-face.jpg" },
];

export default function OnSaleNow() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        gsap.from(".sale-card", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.08,
          scrollTrigger: {
            trigger: track.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".sale-card");
    if (!el || !card) return;
    const amount = card.getBoundingClientRect().width + 20;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="on-sale"
      className="section-fade relative bg-base px-5 py-24 sm:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div data-scrub>
              <Eyebrow>Limited Time</Eyebrow>
            </div>
            <SplitLines className="mt-4 max-w-xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg">
              In Sales right now
            </SplitLines>
          </div>

          {/* Swipe controls — desktop; mobile relies on native touch swipe */}
          <div data-scrub className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Scroll to previous items"
              onClick={() => scrollByCard(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-200 hover:border-fg/40"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Scroll to next items"
              onClick={() => scrollByCard(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-200 hover:border-fg/40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal swipe track — sized so at least 2 cards show on phone */}
        <div
          ref={track}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 pb-4 sm:gap-5 lg:mt-14"
        >
          {SALE_ITEMS.map((item) => (
            <article
              key={item.n}
              className="sale-card group relative w-[46%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface sm:w-[31%] lg:w-[23%]"
            >
              <div className="relative h-[26vh] min-h-[160px] max-h-[380px] overflow-hidden sm:h-[34vh] sm:min-h-[200px]">
                <img
                  src={item.img}
                  alt={`${item.name} ${item.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-base">
                  {item.discount}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-3.5 sm:p-5">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.22em] text-accent sm:text-[0.68rem]">
                    {item.category}
                  </div>
                  <h3 className="mt-1.5 font-display text-base text-fg sm:text-xl">{item.name}</h3>
                  <p className="mt-1 text-[0.72rem] text-muted sm:text-[0.8rem]">{item.spec}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-[0.8rem] font-medium text-fg sm:text-sm">{item.price}</span>
                    <span className="text-[0.68rem] text-faint line-through sm:text-xs">{item.original}</span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Add ${item.name} to cart`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,border-color] duration-200 ease-[var(--ease-quiet)] hover:border-accent hover:bg-accent hover:text-base sm:h-10 sm:w-10"
                  >
                    <CartIcon className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={`Buy ${item.name} now`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-[0.82rem] font-medium text-base transition-[background-color,transform] duration-200 ease-[var(--ease-quiet)] hover:bg-accent-2 active:scale-[0.98] sm:text-[0.88rem]"
                >
                  Buy Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
