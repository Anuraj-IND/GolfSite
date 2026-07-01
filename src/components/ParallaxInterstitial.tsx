import { Eyebrow } from "./primitives";

export default function ParallaxInterstitial() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-base">
      {/* Back plane — fairway */}
      <div className="absolute inset-0">
        <img
          src="/images/scene-fairway.jpg"
          alt="Misty championship fairway at dawn"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Haze for atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,10,9,0.55) 0%, rgba(8,10,9,0.1) 35%, rgba(8,10,9,0.2) 65%, rgba(8,10,9,0.85) 100%)",
        }}
      />

      {/* Outlined kinetic wordmark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="select-none whitespace-nowrap font-display text-[26vw] font-light leading-none tracking-tight text-transparent"
          style={{ WebkitTextStroke: "1px rgba(232,239,230,0.10)" }}
        >
          MERIDIAN
        </span>
      </div>

      {/* Foreground statement */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[1000px] px-5 text-center sm:px-8">
          <div className="flex justify-center">
            <Eyebrow>The Meridian Standard</Eyebrow>
          </div>
          <p className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.7rem,4.4vw,3rem)] font-light leading-[1.15] tracking-[-0.01em] text-fg">
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
