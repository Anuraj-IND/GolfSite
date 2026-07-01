import { Eyebrow, PlusIcon } from "./primitives";

type Product = {
  n: string;
  category: string;
  name: string;
  spec: string;
  price: string;
  img: string;
};

const PRODUCTS: Product[] = [
  { n: "01", category: "Driver", name: "Meridian One", spec: "460cc · C300 steel face", price: "$649", img: "/images/product-driver.jpg" },
  { n: "02", category: "Irons", name: "Forged MB", spec: "5–PW · 1025 carbon steel", price: "$1,499", img: "/images/product-irons.jpg" },
  { n: "03", category: "Ball", name: "Tour Pro", spec: "4-piece urethane cover", price: "$58 / doz", img: "/images/product-ball.jpg" },
  { n: "04", category: "Apparel", name: "Performance Kit", spec: "Polo + structured cap", price: "$148", img: "/images/product-apparel.jpg" },
];

export default function Showcase() {
  return (
    <section id="lineup" className="relative bg-base-2 px-5 py-24 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading row */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg">
              The 2026 Lineup
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted md:block">
            Drivers, irons, balls and apparel — engineered as one coherent system.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-7">
          {PRODUCTS.map((p) => (
            <article
              key={p.n}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative h-[34vh] min-h-[200px] max-h-[420px] overflow-hidden lg:h-[38vh]">
                <img
                  src={p.img}
                  alt={`${p.name} ${p.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                <span className="absolute left-4 top-4 font-display text-sm text-fg/70">
                  {p.n}
                </span>
              </div>

              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-accent">
                    {p.category}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl text-fg">{p.name}</h3>
                  <p className="mt-1 text-[0.8rem] text-muted">{p.spec}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="text-sm font-medium text-fg">{p.price}</span>
                  <button
                    type="button"
                    aria-label={`Add ${p.name} to bag`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,border-color] duration-200 ease-[var(--ease-quiet)] hover:border-accent hover:bg-accent hover:text-base"
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
