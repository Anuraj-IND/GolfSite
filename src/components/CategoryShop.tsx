import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { Eyebrow, CartIcon, SplitLines } from "./primitives";
import { cn } from "@/utils/cn";

type Item = { name: string; spec: string; price: string; img: string };
type Category = {
  slug: string;
  label: string;
  kicker: string;
  blurb: string;
  img: string;
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    slug: "clubs",
    label: "Golf Clubs",
    kicker: "Clubs",
    blurb: "Drivers to putters, forged and fit to one exacting tolerance.",
    img: "/images/product-driver.jpg",
    items: [
      { name: "Drivers", spec: "460cc · adjustable loft", price: "From $649", img: "/images/product-driver.jpg" },
      { name: "Fairway Woods", spec: "Carbon crown · low CG", price: "From $349", img: "/images/hero-driver.png" },
      { name: "Iron Sets", spec: "5–PW · forged steel", price: "From $1,199", img: "/images/product-irons.jpg" },
      { name: "Wedges", spec: "50°–60° · milled grooves", price: "From $189", img: "/images/product-irons.jpg" },
      { name: "Putters", spec: "34\" · counterbalanced", price: "From $299", img: "/images/product-irons.jpg" },
    ],
  },
  {
    slug: "balls",
    label: "Golf Balls",
    kicker: "Balls",
    blurb: "Tour-grade cores and covers, dialed for spin, speed, or feel.",
    img: "/images/product-ball.jpg",
    items: [
      { name: "Tour Golf Balls", spec: "4-piece · urethane cover", price: "$58 / doz", img: "/images/product-ball.jpg" },
      { name: "Distance Golf Balls", spec: "2-piece · low compression", price: "$32 / doz", img: "https://picsum.photos/seed/meridian-distance-balls/600/750" },
      { name: "Soft Feel Golf Balls", spec: "3-piece · low spin", price: "$36 / doz", img: "https://picsum.photos/seed/meridian-soft-balls/600/750" },
      { name: "Practice Golf Balls", spec: "Foam core · limited flight", price: "$18 / doz", img: "https://picsum.photos/seed/meridian-practice-balls/600/750" },
    ],
  },
  {
    slug: "bags",
    label: "Golf Bags",
    kicker: "Bags",
    blurb: "Stand, cart, and staff bags built to carry the whole system.",
    img: "https://picsum.photos/seed/meridian-stand-bags/600/750",
    items: [
      { name: "Stand Bags", spec: "4-way top · dual strap", price: "From $229", img: "https://picsum.photos/seed/meridian-stand-bags/600/750" },
      { name: "Cart Bags", spec: "14-way top · full dividers", price: "From $259", img: "https://picsum.photos/seed/meridian-cart-bags/600/750" },
      { name: "Staff Bags", spec: "Tour spec · 9\" top", price: "From $549", img: "https://picsum.photos/seed/meridian-staff-bags/600/750" },
      { name: "Travel Covers", spec: "Hard-shell · wheeled", price: "From $199", img: "https://picsum.photos/seed/meridian-travel-covers/600/750" },
    ],
  },
  {
    slug: "apparel",
    label: "Golf Apparel",
    kicker: "Apparel",
    blurb: "Performance fabric on and off the course, in the Meridian palette.",
    img: "/images/product-apparel.jpg",
    items: [
      { name: "Polo Shirts", spec: "Moisture-wicking · UPF 30", price: "From $68", img: "/images/product-apparel.jpg" },
      { name: "Golf Pants", spec: "4-way stretch", price: "From $89", img: "https://picsum.photos/seed/meridian-pants/600/750" },
      { name: "Jackets", spec: "Wind-resistant shell", price: "From $148", img: "https://picsum.photos/seed/meridian-jackets/600/750" },
      { name: "Rainwear", spec: "Fully seam-sealed", price: "From $179", img: "https://picsum.photos/seed/meridian-rainwear/600/750" },
      { name: "Dresses", spec: "Stretch woven · built-in shorts", price: "From $98", img: "https://picsum.photos/seed/meridian-dresses/600/750" },
    ],
  },
  {
    slug: "shoes",
    label: "Golf Shoes",
    kicker: "Shoes",
    blurb: "Spiked, spikeless, and waterproof — traction for every fairway.",
    img: "https://picsum.photos/seed/meridian-spiked-shoes/600/750",
    items: [
      { name: "Spiked Golf Shoes", spec: "Removable cleats", price: "From $159", img: "https://picsum.photos/seed/meridian-spiked-shoes/600/750" },
      { name: "Spikeless Golf Shoes", spec: "Multi-surface traction", price: "From $139", img: "https://picsum.photos/seed/meridian-spikeless-shoes/600/750" },
      { name: "Waterproof Golf Shoes", spec: "1-year waterproof warranty", price: "From $169", img: "https://picsum.photos/seed/meridian-waterproof-shoes/600/750" },
      { name: "Women's Golf Shoes", spec: "Lightweight · spikeless", price: "From $139", img: "https://picsum.photos/seed/meridian-womens-shoes/600/750" },
    ],
  },
  {
    slug: "accessories",
    label: "Golf Accessories",
    kicker: "Accessories",
    blurb: "The small details that finish the bag.",
    img: "https://picsum.photos/seed/meridian-gloves/600/750",
    items: [
      { name: "Golf Gloves", spec: "Cabretta leather", price: "$24", img: "https://picsum.photos/seed/meridian-gloves/600/750" },
      { name: "Golf Towels", spec: "Microfiber · carabiner clip", price: "$19", img: "https://picsum.photos/seed/meridian-towels/600/750" },
      { name: "Headcovers", spec: "Set of 3 · numbered", price: "$59", img: "https://picsum.photos/seed/meridian-headcovers/600/750" },
      { name: "Golf Umbrellas", spec: "62\" · vented canopy", price: "$45", img: "https://picsum.photos/seed/meridian-umbrellas/600/750" },
      { name: "Divot Repair Tools", spec: "Stainless steel", price: "$14", img: "https://picsum.photos/seed/meridian-divot-tools/600/750" },
    ],
  },
  {
    slug: "tech",
    label: "Golf Technology",
    kicker: "Technology",
    blurb: "Rangefinders, launch monitors, and data for every swing.",
    img: "/images/tech-face.jpg",
    items: [
      { name: "Laser Rangefinders", spec: "±1 yard · slope mode", price: "$399", img: "/images/tech-face.jpg" },
      { name: "GPS Golf Watches", spec: "40,000+ courses mapped", price: "$299", img: "https://picsum.photos/seed/meridian-gps-watches/600/750" },
      { name: "Launch Monitors", spec: "Doppler radar · club data", price: "$599", img: "https://picsum.photos/seed/meridian-launch-monitors/600/750" },
      { name: "Golf Simulators", spec: "Full swing · impact screen", price: "From $2,499", img: "https://picsum.photos/seed/meridian-simulators/600/750" },
    ],
  },
  {
    slug: "training",
    label: "Training Aids",
    kicker: "Training",
    blurb: "Deliberate practice tools, built around real swing data.",
    img: "https://picsum.photos/seed/meridian-putting-mats/600/750",
    items: [
      { name: "Putting Mats", spec: "10ft · true roll surface", price: "$89", img: "https://picsum.photos/seed/meridian-putting-mats/600/750" },
      { name: "Practice Nets", spec: "7x7 · quick-fold frame", price: "$149", img: "https://picsum.photos/seed/meridian-practice-nets/600/750" },
      { name: "Alignment Sticks", spec: "Set of 2 · carry sleeve", price: "$29", img: "https://picsum.photos/seed/meridian-alignment-sticks/600/750" },
      { name: "Swing Trainers", spec: "Tempo + plane feedback", price: "$59", img: "https://picsum.photos/seed/meridian-swing-trainers/600/750" },
    ],
  },
  {
    slug: "carts",
    label: "Golf Carts & Storage",
    kicker: "Carts",
    blurb: "Push carts, trolleys, and travel cases for getting there.",
    img: "https://picsum.photos/seed/meridian-push-carts/600/750",
    items: [
      { name: "Push Carts", spec: "3-wheel · foldable", price: "From $249", img: "https://picsum.photos/seed/meridian-push-carts/600/750" },
      { name: "Electric Golf Trolleys", spec: "18-hole battery life", price: "From $649", img: "https://picsum.photos/seed/meridian-electric-trolleys/600/750" },
      { name: "Travel Cases", spec: "Hard-shell · TSA lock", price: "From $229", img: "https://picsum.photos/seed/meridian-travel-cases/600/750" },
      { name: "Club Organizers", spec: "Wall-mounted · 6 slots", price: "$79", img: "https://picsum.photos/seed/meridian-club-organizers/600/750" },
    ],
  },
  {
    slug: "gifts",
    label: "Golf Gifts",
    kicker: "Gifts",
    blurb: "Gift sets and personalized pieces for the golfer who has it all.",
    img: "https://picsum.photos/seed/meridian-gift-sets/600/750",
    items: [
      { name: "Gift Cards", spec: "Digital · no expiration", price: "From $25", img: "https://picsum.photos/seed/meridian-gift-cards/600/750" },
      { name: "Golf Gift Sets", spec: "Balls + tees + towel", price: "From $65", img: "https://picsum.photos/seed/meridian-gift-sets/600/750" },
      { name: "Personalized Golf Balls", spec: "Custom text or logo", price: "$64 / doz", img: "/images/product-ball.jpg" },
      { name: "Golf Mugs", spec: "Ceramic · 12oz", price: "$18", img: "https://picsum.photos/seed/meridian-mugs/600/750" },
    ],
  },
  {
    slug: "sale",
    label: "Sale",
    kicker: "Sale",
    blurb: "Past-season clubs, balls, and apparel — same standard, lower price.",
    img: "/images/product-irons.jpg",
    items: [
      { name: "Clearance Clubs", spec: "Past-season · forged steel", price: "Up to 40% off", img: "/images/product-irons.jpg" },
      { name: "Discount Golf Balls", spec: "Tour-grade overstock", price: "Up to 30% off", img: "/images/product-ball.jpg" },
      { name: "Discount Apparel", spec: "Past-season fits", price: "Up to 50% off", img: "/images/product-apparel.jpg" },
      { name: "Discount Shoes", spec: "Select sizes", price: "Up to 35% off", img: "https://picsum.photos/seed/meridian-discount-shoes/600/750" },
    ],
  },
];

export default function CategoryShop() {
  const [active, setActive] = useState(CATEGORIES[0].slug);
  const category = CATEGORIES.find((c) => c.slug === active) ?? CATEGORIES[0];

  const root = useRef<HTMLElement>(null);
  const tiles = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  // One-time entrance for the category tiles.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        gsap.from(".cat-tile", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: EASE.out,
          stagger: 0.045,
          scrollTrigger: {
            trigger: tiles.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // Sub-category cards animate in on first scroll AND on every category
  // switch (the grid is keyed by the active slug, so cards re-mount fresh).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        gsap.from(".shop-card", {
          y: 30,
          autoAlpha: 0,
          duration: 0.75,
          ease: EASE.out,
          stagger: 0.07,
          scrollTrigger: { trigger: grid.current, start: "top 94%" },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: grid }
  );

  return (
    <section ref={root} id="catalog" className="section-fade relative bg-base-2 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div data-scrub>
              <Eyebrow>The Full Range</Eyebrow>
            </div>
            <SplitLines className="mt-4 max-w-xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg">
              Everything for your game.
            </SplitLines>
          </div>
          <p data-scrub className="hidden max-w-xs text-right text-sm leading-relaxed text-muted md:block">
            Eleven categories, engineered to the same Meridian standard — from
            tour clubs to the last tee in the bag.
          </p>
        </div>

        {/* Category cards (replaces the old filter pills) */}
        <div
          ref={tiles}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:mt-14 lg:grid-cols-6"
        >
          {CATEGORIES.map((c) => {
            const isActive = c.slug === active;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(c.slug)}
                aria-pressed={isActive}
                className={cn(
                  "cat-tile group relative overflow-hidden rounded-xl border text-left transition-[border-color,box-shadow] duration-200 ease-[var(--ease-quiet)]",
                  isActive
                    ? "border-accent shadow-[0_0_0_1px_rgba(198,255,58,0.25),0_0_40px_-14px_rgba(198,255,58,0.5)]"
                    : "border-line hover:border-fg/30"
                )}
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-[transform,opacity] duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.06]",
                      isActive ? "opacity-100" : "opacity-70 group-hover:opacity-90"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/30 to-transparent" />
                  {isActive && (
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(198,255,58,0.8)]" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <div
                    className={cn(
                      "text-[0.86rem] font-medium leading-snug transition-colors duration-200",
                      isActive ? "text-accent" : "text-fg"
                    )}
                  >
                    {c.label}
                  </div>
                  <div className="mt-0.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    {c.items.length} collections
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active category heading + blurb */}
        <div className="mt-10 border-t border-line pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-tight tracking-[-0.01em] text-fg">
              {category.label}
            </h3>
            <span className="hidden shrink-0 text-[0.7rem] uppercase tracking-[0.2em] text-faint sm:block">
              {category.items.length} collections
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{category.blurb}</p>
        </div>

        {/* Sub-category cards */}
        <div
          ref={grid}
          key={category.slug}
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5 lg:gap-5"
        >
          {category.items.map((item, i) => (
            <article
              key={item.name}
              className="shop-card group relative overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative h-[26vh] min-h-[150px] max-h-[420px] overflow-hidden sm:h-[34vh] sm:min-h-[200px] lg:h-[30vh]">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                <span className="absolute left-4 top-4 font-display text-sm text-fg/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-3.5 sm:p-5">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.22em] text-accent sm:text-[0.68rem]">
                    {category.kicker}
                  </div>
                  <h3 className="mt-1.5 font-display text-base text-fg sm:text-xl">{item.name}</h3>
                  <p className="mt-1 text-[0.72rem] text-muted sm:text-[0.8rem]">{item.spec}</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.8rem] font-medium text-fg sm:text-sm">{item.price}</span>
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
