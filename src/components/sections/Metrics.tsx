import { useEffect, useRef, useState } from 'react';
import { METRICS } from '../../data/metrics';
import { prefersReducedMotion } from '../../lib/utils';
import { Eyebrow } from '../ui/Badge';

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(() =>
    prefersReducedMotion() ? METRICS.map((m) => m.number) : METRICS.map(() => 0)
  );

  useEffect(() => {
    if (prefersReducedMotion() || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 1400;

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(1, Math.max(0, elapsed / duration));
            // easeOutCubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS.map((m) => Math.round(m.number * ease))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasAnimated]);

  return (
    <section className="page active" id="numbers" ref={sectionRef}>
      <div className="wrap">
        <div className="pg">
          <Eyebrow className="it">By the numbers</Eyebrow>

          <h2 className="grad it">
            Shipped, <mark>not just designed</mark>.
          </h2>

          <div className="metrics it">
            {METRICS.map((metric, idx) => (
              <div key={idx} className="metric">
                <b>{counts[idx]}</b>
                <span>{metric.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
