import { useEffect, useRef, useState } from 'react';
import { EXPERIENCES, GANTT_AXIS, GANTT_DATA } from '../../data/experience';
import { cn, prefersReducedMotion } from '../../lib/utils';
import { Chips } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  const xpRef = useRef<HTMLDivElement>(null);
  const [fillScale, setFillScale] = useState<number>(() =>
    prefersReducedMotion() ? 1 : 0
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;

    const onScroll = () => {
      const el = xpRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.66 - rect.top) / rect.height)
      );
      setFillScale(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="page active" id="experience">
      <div className="wrap">
        <div className="pg">
          <SectionHeading
            eyebrow="Experience"
            title="Three roles, <mark>one direction</mark>."
          />

          {/* Gantt Chart Timeline */}
          <div className="gantt it">
            <div className="g-axis">
              {GANTT_AXIS.map((axis) => (
                <span key={axis.label} style={{ left: `${axis.offsetPercent}%` }}>
                  {axis.label}
                </span>
              ))}
            </div>

            {GANTT_DATA.map((row) => (
              <div key={row.company} className="g-row">
                <b>{row.company}</b>
                <div className="g-track">
                  {row.isCurrent && (
                    <span
                      className="g-out"
                      style={{ right: 'calc(5.88% + 16px)' }}
                    >
                      {row.label}
                    </span>
                  )}
                  <div
                    className={cn('g-bar', row.colorClass)}
                    style={{
                      left: `${row.leftPercent}%`,
                      width: `${row.widthPercent}%`,
                    }}
                  >
                    {!row.isCurrent && row.label}
                  </div>
                  {row.isCurrent && (
                    <i className="g-now" style={{ left: '97%' }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Experience Cards & Ladder */}
          <div className="xp" id="xp" ref={xpRef}>
            <div className="xp-line">
              <i
                id="xpfill"
                style={{
                  transform: `scaleY(${fillScale})`,
                  transformOrigin: 'top',
                }}
              />
            </div>

            {EXPERIENCES.map((exp, idx) => (
              <article
                key={exp.company}
                className={cn('xcard it on', exp.isCurrent && 'cur')}
                style={
                  {
                    '--i': idx + 3,
                    '--c1': exp.colors.c1,
                    '--c2': exp.colors.c2,
                  } as React.CSSProperties
                }
              >
                <div className="x-logo">
                  {exp.logoUrl ? (
                    <img
                      src={exp.logoUrl}
                      alt={`${exp.company} logo`}
                      loading="lazy"
                      className="x-logo-img"
                    />
                  ) : (
                    exp.initial
                  )}
                </div>
                <div className="x-main">
                  <div className="x-top">
                    <h3>{exp.company}</h3>
                    <span className={cn('x-badge', exp.isCurrent && 'now')}>
                      {exp.badge}
                    </span>
                  </div>

                  <div className="x-role">{exp.role}</div>
                  <div className="x-meta">{exp.meta}</div>

                  {exp.bullets.length > 0 && (
                    <ul>
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} dangerouslySetInnerHTML={{ __html: b }} />
                      ))}
                    </ul>
                  )}

                  {/* Career Ladder Progression for Eastri */}
                  {exp.ladder && (
                    <div className="ladder">
                      {exp.ladder.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className={cn('lad', step.isTop && 'top')}
                        >
                          <small>
                            {step.period} &middot; {step.location}
                          </small>
                          <h4 dangerouslySetInnerHTML={{ __html: step.title }} />
                          <p>{step.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <Chips items={exp.chips} style={{ marginTop: '18px' }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
