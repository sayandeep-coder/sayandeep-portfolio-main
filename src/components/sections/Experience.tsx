import { useEffect, useRef } from 'react';

const INSTANT_LABZ_LOGO =
  'data:image/png;base64,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';

export function Experience() {
  const lineFillRef = useRef<HTMLElement>(null);
  const xpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xp = xpRef.current;
    const f = lineFillRef.current;
    if (!xp || !f) return;

    const onScroll = () => {
      const r = xp.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      f.style.transform = `scaleY(${p})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <span className="eb rv in" data-scr>
          experience
        </span>
        <h2 className="h2 sw">
          Three companies, <mark>one direction</mark>.
        </h2>

        {/* Gantt Timeline */}
        <div className="gantt in" id="gantt">
          <div className="g-axis">
            <span style={{ left: '0.00%' }}>Jun 25</span>
            <span style={{ left: '17.65%' }}>Sep 25</span>
            <span style={{ left: '35.29%' }}>Dec 25</span>
            <span style={{ left: '52.94%' }}>Mar 26</span>
            <span style={{ left: '70.59%' }}>Jun 26</span>
            <span style={{ left: '88.24%' }}>Sep 26</span>
          </div>

          <div className="g-row">
            <b>Instant Labz</b>
            <div className="g-track">
              <div className="g-bar b1" style={{ left: '82.35%', width: '17.65%', '--d': '1.1s' } as React.CSSProperties}>
                Aug 26 — now
              </div>
            </div>
          </div>

          <div className="g-row">
            <b>Khwaaish</b>
            <div className="g-track">
              <div className="g-bar b2" style={{ left: '17.65%', width: '58.82%', '--d': '.7s' } as React.CSSProperties}>
                Sep 2025 — Jul 2026 · 11 mos
              </div>
            </div>
          </div>

          <div className="g-row">
            <b>Eastri</b>
            <div className="g-track">
              <div className="g-bar b3" style={{ left: '0', width: '35.29%', '--d': '.3s' } as React.CSSProperties}>
                Jun 2025 — Nov 2025 · 6 mos
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="xp" id="xp" ref={xpRef}>
          <div className="xp-line">
            <i id="xpf" ref={lineFillRef}></i>
          </div>

          {/* Instant Labz */}
          <article className="xc cur rv in" data-tilt>
            <div className="xh">
              <div className="logo il">
                <img src={INSTANT_LABZ_LOGO} alt="Instant Labz logo" />
              </div>
              <div>
                <h3>Instant Labz Pvt. Ltd.</h3>
                <div className="m">Full-time · 4 mos</div>
                <div className="m2">Mumbai, Maharashtra, India · Remote</div>
              </div>
              <span className="badge now">Current</span>
            </div>

            <div className="roles">
              <div className="role top">
                <h4>Head of Engineering &amp; Product</h4>
                <div className="when">Nov 2026 – Present · 1 mo</div>
                <p>
                  Architected and led the development of systems, combining product thinking with engineering execution to turn ideas into reliable, production-ready solutions.
                </p>
                <ul>
                  <li>
                    Architected an <b>AI-powered document-to-output backend</b>.
                  </li>
                  <li>
                    Combined <b>LLM extraction with deterministic, auditable decision rules</b> for reliable results.
                  </li>
                </ul>
                <div className="skl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 12L2 9z" />
                    <path d="M2 9h20M9 3l3 6 3-6M12 21 9 9M12 21l3-12" />
                  </svg>
                  Communication, Hands-on Technical Leadership and +3 skills
                </div>
              </div>

              <div className="role">
                <h4>Product Research &amp; Strategy</h4>
                <div className="when">Aug 2026 – Oct 2026 · 3 mos</div>
                <p>
                  Contributed to the early-stage development of the startup by conducting product research, exploring market opportunities, validating ideas, and translating concepts into actionable product workflows.
                </p>
                <div className="skl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 12L2 9z" />
                    <path d="M2 9h20M9 3l3 6 3-6M12 21 9 9M12 21l3-12" />
                  </svg>
                  Project Management, Research Skills and +3 skills
                </div>
              </div>
            </div>

            <div className="chips">
              <span className="chip">LLM extraction</span>
              <span className="chip">Decision rules</span>
              <span className="chip">Document AI</span>
              <span className="chip">Backend architecture</span>
            </div>
          </article>

          {/* Khwaaish */}
          <article className="xc rv in" data-tilt style={{ '--c1': '#ef4444', '--c2': '#f97316' } as React.CSSProperties}>
            <div className="xh">
              <div className="logo">
                <img src="/logos/khwaaish.png" alt="Khwaaish logo" />
              </div>
              <div>
                <h3>Khwaaish</h3>
                <div className="m">Full-time · Sep 2025 — Jul 2026</div>
                <div className="m2">Mumbai · Hybrid</div>
              </div>
              <span className="badge">11 mos</span>
            </div>

            <div className="roles">
              <div className="role top">
                <h4>Tech Lead — AI Engineer (Founding Team)</h4>
                <div className="when">Sep 2025 – Jul 2026 · 11 mos</div>
                <ul>
                  <li>
                    Contributed to the founding team, building an <b>AI-driven platform that simplifies ordering and booking</b>.
                  </li>
                  <li>
                    Owned end-to-end engineering and delivered <b>two production-ready products</b>, with scalable backends and AI-driven automation workflows.
                  </li>
                  <li>
                    Designed cloud infrastructure and led a cross-functional team from product design through deployment.
                  </li>
                </ul>
              </div>
            </div>

            <div className="chips">
              <span className="chip">Generative AI</span>
              <span className="chip">LLMs</span>
              <span className="chip">LangGraph</span>
              <span className="chip">Flutter</span>
              <span className="chip">Python</span>
              <span className="chip">Next.js</span>
              <span className="chip">PostgreSQL</span>
              <span className="chip">Celery</span>
              <span className="chip">AWS</span>
            </div>
          </article>

          {/* Eastri */}
          <article className="xc rv in" data-tilt style={{ '--c1': '#2a86c6', '--c2': '#123f6b' } as React.CSSProperties}>
            <div className="xh">
              <div className="logo">
                <img src="/logos/eastri.png" alt="Eastri logo" />
              </div>
              <div>
                <h3>Eastri</h3>
                <div className="m">Full-time · Jun 2025 — Nov 2025</div>
                <div className="m2">Intern to founding-team Tech Lead</div>
              </div>
              <span className="badge">6 mos</span>
            </div>

            <div className="roles">
              <div className="role top">
                <h4>Tech Lead (founding team)</h4>
                <div className="when">Sep 2025 · Hybrid</div>
                <p>
                  Drove design and development of scalable, user-focused software, from hands-on coding to guiding the team.
                </p>
              </div>
              <div className="role">
                <h4>Lead Software Developer</h4>
                <div className="when">Aug 2025 · Remote</div>
                <p>
                  Built scalable software across teams. Shipped Partner and Consumer apps with Razorpay payments and OTP + JWT auth.
                </p>
              </div>
              <div className="role">
                <h4>Flutter Developer</h4>
                <div className="when">Jun 2025 · Remote</div>
                <p>
                  Started as an intern on cross-platform app development for real-world projects.
                </p>
              </div>
            </div>

            <div className="chips">
              <span className="chip">Flutter</span>
              <span className="chip">Node.js</span>
              <span className="chip">PostgreSQL</span>
              <span className="chip">Prisma</span>
              <span className="chip">JWT</span>
              <span className="chip">Razorpay</span>
              <span className="chip">Team leadership</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
