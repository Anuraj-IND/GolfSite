import { useState } from "react";
import { Eyebrow, Button, ArrowRight } from "./primitives";

const BAG_PREVIEW = [
  { name: "Driver", img: "/images/product-driver.jpg" },
  { name: "Irons", img: "/images/product-irons.jpg" },
  { name: "Ball", img: "/images/product-ball.jpg" },
  { name: "Apparel", img: "/images/product-apparel.jpg" },
];

const PERKS = ["Free shipping", "Custom fitting", "30-day returns"];

export default function ShopCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    // Instant, quiet confirmation — no celebratory motion on a utility action.
    setDone(true);
  };

  return (
    <section id="shop" className="relative bg-base px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12 lg:py-24">
          {/* ambient accent glow (static) */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[120%] -translate-x-1/2 -translate-y-1/3 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(198,255,58,0.16), transparent 62%)",
              filter: "blur(10px)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[420px] max-w-[80%] translate-x-1/4 translate-y-1/3 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(198,255,58,0.14), transparent 65%)",
              filter: "blur(14px)",
            }}
          />

          <div className="relative">
            <div className="flex justify-center">
              <Eyebrow>The 2026 Collection</Eyebrow>
            </div>

            {/* Bag preview — the pieces the headline is talking about */}
            <div className="mt-7 flex justify-center -space-x-3">
              {BAG_PREVIEW.map((p, i) => (
                <div
                  key={p.name}
                  className="h-12 w-12 overflow-hidden rounded-full border-2 border-surface bg-surface-2 shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14"
                  style={{ zIndex: BAG_PREVIEW.length - i }}
                >
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <h2 className="mx-auto mt-7 max-w-2xl font-display text-[clamp(2.4rem,6vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em] text-fg">
              Build your bag.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-muted">
              Drivers, irons, balls and apparel — engineered as one system.
              Free shipping and custom fitting on every order.
            </p>

            {/* Perks — concrete, not decorative */}
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.78rem] text-muted">
              {PERKS.map((perk) => (
                <li key={perk} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="#lineup" variant="primary">
                Shop the collection
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button href="#athletes" variant="ghost">
                Book a fitting
              </Button>
            </div>

            {/* Newsletter — quiet, fast utility interaction */}
            <div className="mx-auto mt-12 max-w-md border-t border-line pt-8">
              {done ? (
                <p className="text-sm text-accent">
                  You're on the list. Watch your inbox for early access.
                </p>
              ) : (
                <>
                  <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="shop-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="shop-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email for early access"
                      className="h-14 flex-1 rounded-full border border-line-strong bg-base px-6 text-[0.95rem] text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/30"
                    />
                    <Button as="button" type="submit" variant="ghost" className="h-14 shrink-0">
                      Notify me
                    </Button>
                  </form>
                  <p className="mt-3 text-[0.72rem] text-faint">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
