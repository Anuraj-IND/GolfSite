import { useState } from "react";
import { Eyebrow, PlusIcon } from "./primitives";
import { cn } from "@/utils/cn";

type Item = { name: string; spec: string; price: string; img: string };
type Category = { slug: string; label: string; kicker: string; blurb: string; items: Item[] };

const CATEGORIES: Category[] = [
  {
    slug: "clubs",
    label: "Golf Clubs",
    kicker: "Clubs",
    blurb: "Drivers to putters, forged and fit to one exacting tolerance.",
    items: [
      { name: "Drivers", spec: "460cc · adjustable loft", price: "From $649", img: "/images/product-driver.jpg" },
      { name: "Fairway Woods", spec: "Carbon crown · low CG", price: "From $349", img: "/images/hero-driver.png" },
      { name: "Iron Sets", spec: "5–PW · forged steel", price: "From $1,199", img: "/images/product-irons.jpg" },
      { name: "Wedges", spec: "50°–60° · milled grooves", price: "From $189", img: "/images/product-irons.jpg" },
      { name: "Putters", spec: "34\" · counterbalanced", price: "From $299", img: "https://picsum.photos/seed/meridian-putters/600/750" },
    ],
  },
  {
    slug: "balls",
    label: "Golf Balls",
    kicker: "Balls",
    blurb: "Tour-grade cores and covers, dialed for spin, speed, or feel.",
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

  return (
    <section id="catalog" className="relative bg-base-2 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>The Full Range</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg">
              Everything for your game.
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted md:block">
            Eleven categories, engineered to the same Meridian standard — from
            tour clubs to the last tee in the bag.
          </p>
        </div>

        {/* Category tabs */}
        <div className="no-scrollbar mt-10 flex gap-2.5 overflow-x-auto pb-1 lg:mt-14 lg:flex-wrap lg:overflow-visible">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              aria-pressed={c.slug === active}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[0.82rem] font-medium transition-colors duration-200 ease-[var(--ease-quiet)]",
                c.slug === active
                  ? "border-accent bg-accent text-base"
                  : "border-line-strong text-muted hover:border-fg/40 hover:text-fg"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Active category blurb */}
        <div className="mt-8 flex items-baseline justify-between gap-4 border-t border-line pt-6">
          <p className="max-w-md text-sm leading-relaxed text-muted">{category.blurb}</p>
          <span className="hidden shrink-0 text-[0.7rem] uppercase tracking-[0.2em] text-faint sm:block">
            {category.items.length} collections
          </span>
        </div>

        {/* Item cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {category.items.map((item, i) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative h-[34vh] min-h-[200px] max-h-[420px] overflow-hidden lg:h-[30vh]">
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

              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-accent">
                    {category.kicker}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl text-fg">{item.name}</h3>
                  <p className="mt-1 text-[0.8rem] text-muted">{item.spec}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="text-sm font-medium text-fg">{item.price}</span>
                  <button
                    type="button"
                    aria-label={`Browse ${item.name}`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,border-color] duration-200 ease-[var(--ease-quiet)] hover:border-accent hover:bg-accent hover:text-base"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
