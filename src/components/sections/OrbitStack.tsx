import { useEffect, useRef } from 'react';
import { ALL_SKILLS, SKILL_CATEGORIES } from '../../data/skills';

export function OrbitStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = containerRef.current;
    if (!st) return;

    const items = st.querySelectorAll<HTMLElement>('.orb-i');
    const rings = st.querySelectorAll<HTMLElement>('.rg');
    if (!items.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = st.clientWidth;
    let H = st.clientHeight;
    let tilt = W < 700 ? 0.74 : 0.34;
    let TS = items[0]?.offsetWidth || 52;
    const RF = [0.17, 0.31, 0.45];
    const SP = [0.2, -0.14, 0.09];
    const ringCounts = [10, 15, items.length - 25];

    function size() {
      if (!st) return;
      W = st.clientWidth;
      H = st.clientHeight;
      tilt = W < 700 ? 0.74 : 0.34;
      TS = items[0]?.offsetWidth || 52;
      rings.forEach((r, i) => {
        const R = W * RF[i];
        r.style.width = `${R * 2}px`;
        r.style.height = `${R * 2 * tilt}px`;
      });
    }

    size();
    const ro = new ResizeObserver(size);
    ro.observe(st);

    let vis = false;
    const io = new IntersectionObserver((entries) => {
      vis = entries[0]?.isIntersecting ?? false;
    });
    io.observe(st);

    let hov = false;
    let px = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
    };
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.orb-i')) hov = true;
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.orb-i')) hov = false;
    };

    st.addEventListener('pointermove', onPointerMove);
    st.addEventListener('mouseover', onMouseOver);
    st.addEventListener('mouseout', onMouseOut);

    const itemStates: { el: HTMLElement; ri: number; a: number }[] = [];
    let pos = 0;
    ringCounts.forEach((n, ri) => {
      for (let i = 0; i < n; i++) {
        const el = items[pos++];
        if (el) {
          itemStates.push({
            el,
            ri,
            a: (i / n) * 6.2832 + ri * 0.6,
          });
        }
      }
    });

    let lt = performance.now();
    let sp = 1;
    let animId = 0;

    function frame(t: number) {
      const dt = Math.min((t - lt) / 1000, 0.05);
      lt = t;
      if (vis && W) {
        sp += ((hov ? 0.1 : 1) - sp) * 0.08;
        const tl = tilt + (reduceMotion ? 0 : px * 0.04);
        itemStates.forEach((it) => {
          it.a += SP[it.ri] * dt * sp * (reduceMotion ? 0 : 1);
          const R = W * RF[it.ri];
          const X = Math.cos(it.a) * R;
          const Z = Math.sin(it.a);
          const Y = Z * R * tl;
          const d = (Z + 1) / 2;
          const sc = 0.7 + d * 0.5;
          it.el.style.transform = `translate3d(${W / 2 + X - TS / 2}px,${H / 2 + Y - TS / 2}px,0) scale(${sc})`;
          it.el.style.opacity = (0.4 + d * 0.6).toFixed(2);
          it.el.style.zIndex = Math.round(d * 100).toString();
        });
      }
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      st.removeEventListener('pointermove', onPointerMove);
      st.removeEventListener('mouseover', onMouseOver);
      st.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <section className="orb" id="orbit" aria-label="Skills">
      <div className="wrap">
        <span className="eb rv in" data-scr>
          stack
        </span>
        <h2 className="h2 sw">
          Chosen per problem, <mark>not per habit</mark>.
        </h2>
        <div className="legend" id="legend">
          {SKILL_CATEGORIES.map((cat) => (
            <span key={cat.name} style={{ '--c': cat.color } as React.CSSProperties}>
              <i></i>
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div className="orb-st" id="orbst" ref={containerRef}>
        <div className="rg"></div>
        <div className="rg"></div>
        <div className="rg"></div>

        <div className="orb-c" role="img" aria-label="Sayandeep Purkait logo mark">
          <svg viewBox="0 0 180 225" aria-hidden="true">
            <path
              d="M154 36 L96 36 L26 100 L72 108 L152 118 L84 190 L22 190"
              fill="none"
              stroke="currentColor"
              strokeWidth="22"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        {ALL_SKILLS.map((k) => (
          <span
            key={k.name}
            className="orb-i"
            style={{ '--c': k.color } as React.CSSProperties}
            data-n={k.name}
            data-g={k.group}
            title={k.name}
          >
            {k.path ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill={k.fillColor || 'currentColor'}
                  d={k.path}
                />
              </svg>
            ) : (
              <b>{k.abbr || k.name.slice(0, 2).toUpperCase()}</b>
            )}
          </span>
        ))}
      </div>

      <p className="mono orb-n">hover a tool to slow the orbit</p>
    </section>
  );
}
