import { useEffect, useRef, useState } from 'react';

const METRICS_DATA = [
  { target: 2, label: 'Production-ready products delivered as tech lead', sc: 1 },
  { target: 10, label: 'Services in the VERO2026 payments platform', sc: -1 },
  { target: 4, label: 'Client surfaces on one agent backend (Mads)', sc: 1 },
  { target: 7, label: 'Case studies and field notes written', sc: -1 },
];

export function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const t0 = performance.now();
          const dur = 1600;

          function animate(t: number) {
            const k = Math.min(1, Math.max(0, (t - t0) / dur));
            const ease = 1 - Math.pow(1 - k, 3);
            setCounts(METRICS_DATA.map((m) => Math.round(m.target * ease)));
            if (k < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.metric');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        const k = Math.min(1, Math.max(-1, c));
        const d = parseFloat(card.dataset.sc || '1');
        const opacity = Math.min(1, Math.max(0, 1 - Math.min(0.7, Math.max(0, Math.abs(c) - 0.3)) * 1.5));
        card.style.opacity = opacity.toString();
        card.style.transform = `perspective(1200px) rotateX(${k * 16}deg) rotateY(${-k * 12 * d}deg) translateZ(${-Math.abs(k) * 100}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="nums">
      <div className="wrap">
        <span className="eb rv in" data-scr>
          by the numbers
        </span>
        <h2 className="h2 sw">
          Shipped, <mark>not just designed</mark>.
        </h2>
        <div className="metrics" ref={containerRef}>
          {METRICS_DATA.map((m, idx) => (
            <div className="metric" data-sc={m.sc} key={idx}>
              <b>{counts[idx]}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
