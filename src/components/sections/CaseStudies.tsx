import { useEffect, useRef, useState, useCallback } from 'react';
import { CASES, CASE_ORDER, CASE_HUES } from '../../data/cases';

interface CaseStudiesProps {
  onOpenCase: (id: string) => void;
}

export function CaseStudies({ onOpenCase }: CaseStudiesProps) {
  const [cur, setCur] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const cfRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDown: false, startX: 0, moved: false });

  const goTo = useCallback((idx: number) => {
    setCur((idx + CASE_ORDER.length) % CASE_ORDER.length);
  }, []);

  // Auto-move carousel every 2 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const dr = document.getElementById('dr');
      if (dr && dr.classList.contains('open')) return;

      const el = cfRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
      }

      setCur((c) => (c + 1) % CASE_ORDER.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dr = document.getElementById('dr');
      if (dr && dr.classList.contains('open')) return;
      const el = cfRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;

      if (e.key === 'ArrowRight') {
        setCur((c) => (c + 1) % CASE_ORDER.length);
      } else if (e.key === 'ArrowLeft') {
        setCur((c) => (c - 1 + CASE_ORDER.length) % CASE_ORDER.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsPaused(true);
    dragRef.current = { isDown: true, startX: e.clientX, moved: false };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsPaused(false);
    if (!dragRef.current.isDown) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.isDown = false;
    if (Math.abs(dx) > 50) {
      dragRef.current.moved = true;
      if (dx < 0) {
        setCur((c) => (c + 1) % CASE_ORDER.length);
      } else {
        setCur((c) => (c - 1 + CASE_ORDER.length) % CASE_ORDER.length);
      }
    }
  };

  const onCardClick = (k: string, i: number) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    if (i !== cur) {
      setCur(i);
    } else {
      onOpenCase(k);
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const sp = isMobile ? 150 : 260;

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="hd">
          <div>
            <span className="eb rv in" data-scr>
              case studies
            </span>
            <h2 className="h2 sw">
              Systems, with the <mark>reasoning behind them</mark>.
            </h2>
          </div>
          <p className="rv in">
            Three system case studies, a UPI sandbox, and four field notes. Drag, swipe or use the arrows, then open one.
          </p>
        </div>

        <div
          className="cf"
          id="cf"
          ref={cfRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {CASE_ORDER.map((k, i) => {
            const c = CASES[k];
            const d = i - cur;
            const a = Math.abs(d);
            const hue = CASE_HUES[k] || 222;

            const transform = `translateX(${d * sp}px) translateZ(${-a * 170}px) rotateY(${-Math.min(3, Math.max(-3, d)) * (isMobile ? 34 : 36)}deg) scale(${a ? 1 : 1.04})`;
            const opacity = a > 3 ? 0 : 1 - a * 0.18;
            const pointerEvents = a > 3 ? 'none' : 'auto';
            const filter = a ? `brightness(${1 - Math.min(a, 3) * 0.18})` : 'none';

            return (
              <button
                key={k}
                className="cf-c"
                data-k={k}
                style={
                  {
                    '--h': hue,
                    transform,
                    opacity,
                    pointerEvents,
                    zIndex: 10 - a,
                    filter,
                  } as React.CSSProperties
                }
                onClick={() => onCardClick(k, i)}
              >
                <div>
                  <span className="mono">
                    CASE {c.n} · {c.cat.toUpperCase()}
                  </span>
                  <h3>{c.name}</h3>
                  <div className="t">{c.title}</div>
                </div>
                <div>
                  <p>{c.card}</p>
                  <span className="go">Read case study →</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="cf-nav">
          <button className="cf-b" id="cfp" aria-label="previous" onClick={() => goTo(cur - 1)}>
            ←
          </button>
          <div className="cf-dots" id="cfd">
            {CASE_ORDER.map((k, i) => (
              <button
                key={k}
                className={i === cur ? 'on' : ''}
                aria-label={CASES[k].name}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="cf-b" id="cfn" aria-label="next" onClick={() => goTo(cur + 1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
