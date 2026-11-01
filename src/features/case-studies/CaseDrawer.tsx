import { useEffect, useRef } from 'react';
import { CASES, CASE_ORDER, type CaseStudyData, type CaseStudyPage } from '../../data/cases';

interface CaseDrawerProps {
  activeCaseId: string | null;
  onClose: () => void;
  onSelectCase: (id: string) => void;
}

export function CaseDrawer({ activeCaseId, onClose, onSelectCase }: CaseDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const isOpen = Boolean(activeCaseId && CASES[activeCaseId]);
  const activeCase: CaseStudyData | null = activeCaseId ? CASES[activeCaseId] || null : null;

  const nextCaseId = activeCaseId
    ? CASE_ORDER[(CASE_ORDER.indexOf(activeCaseId) + 1) % CASE_ORDER.length]
    : CASE_ORDER[0];
  const nextCase = CASES[nextCaseId];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('lock');
      if (panelRef.current) panelRef.current.scrollTop = 0;
    } else {
      document.body.classList.remove('lock');
    }
    return () => {
      document.body.classList.remove('lock');
    };
  }, [isOpen, activeCaseId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!activeCase) {
    return (
      <div className={`dr ${isOpen ? 'open' : ''}`} id="dr" aria-hidden={!isOpen}>
        <div className="dr-bk" id="drbk" onClick={onClose} />
        <aside className="dr-p" id="drp" ref={panelRef} role="dialog" aria-modal="true" aria-label="Case study" />
      </div>
    );
  }

  return (
    <div className={`dr ${isOpen ? 'open' : ''}`} id="dr" aria-hidden={!isOpen}>
      <div className="dr-bk" id="drbk" onClick={onClose} />
      <aside className="dr-p" id="drp" ref={panelRef} role="dialog" aria-modal="true" aria-label="Case study">
        <button className="dr-x" id="drx" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="dc">
          {/* Cover Header */}
          <div className="cover">
            <span className="eb">
              Case study {activeCase.n} · {activeCase.cat}
            </span>
            <h1>{activeCase.name}</h1>
            <p className="lede">{activeCase.lede}</p>

            <div className="cm">
              <div>
                <small>Role</small>
                <b>{activeCase.role}</b>
              </div>
              <div>
                <small>Status</small>
                <b>{activeCase.status}</b>
              </div>
              <div>
                <small>Year</small>
                <b>
                  {activeCase.yr} · {activeCase.rt}
                </b>
              </div>
              <div>
                <small>Source</small>
                <b>
                  {activeCase.repo ? (
                    <a href={activeCase.repo} target="_blank" rel="noopener noreferrer">
                      Repository ↗
                    </a>
                  ) : (
                    'Essay'
                  )}
                </b>
              </div>
            </div>

            <div className="cc">
              {activeCase.stack.map((s, idx) => (
                <span key={idx}>{s}</span>
              ))}
            </div>
          </div>

          {/* Dynamic Page Sections */}
          {activeCase.pages.map((p, idx) => (
            <section key={idx} className="cs rv in">
              <PageSection page={p} caseName={activeCase.name} />
            </section>
          ))}

          {/* Next Case Study */}
          {nextCase && (
            <button className="nxt" id="drnx" onClick={() => onSelectCase(nextCaseId)}>
              <span className="eb">Next case study</span>
              <h3>{nextCase.name} →</h3>
              <p>{nextCase.card}</p>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function PageSection({ page, caseName }: { page: CaseStudyPage; caseName: string }) {
  const eyebrow = (
    <span className="eb">
      {caseName} · {page.l}
    </span>
  );
  const heading = <h2 dangerouslySetInnerHTML={{ __html: page.h }} />;
  const note = page.note ? <p className="note">{page.note}</p> : null;

  switch (page.k) {
    case 'two':
      return (
        <div className="two">
          <div>
            {eyebrow}
            {heading}
          </div>
          <div className="body">
            {page.p?.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
            {page.list && (
              <ul className="klist">
                {page.list.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
            {page.chips && (
              <div className="cc" style={{ marginTop: '14px' }}>
                {page.chips.map((chip, i) => (
                  <span key={i}>{chip}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="two">
          <div>
            {eyebrow}
            {heading}
          </div>
          <ul className="klist">
            {page.list.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      );

    case 'chips':
      return (
        <div className="two">
          <div>
            {eyebrow}
            {heading}
            {page.p && (
              <div className="body" style={{ marginTop: '20px' }}>
                {page.p.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            )}
          </div>
          <div className="cc">
            {page.chips.map((chip, i) => (
              <span key={i}>{chip}</span>
            ))}
          </div>
        </div>
      );

    case 'steps':
      return (
        <>
          {eyebrow}
          {heading}
          <div className="stp">
            {page.steps.map((s, i) => (
              <div key={i} style={{ display: 'contents' }}>
                {i > 0 && <span className="ar">→</span>}
                <div className="s">
                  {s[0]}
                  {s[1] && <small>{s[1]}</small>}
                </div>
              </div>
            ))}
          </div>
          <div className="body" style={{ maxWidth: '760px' }}>
            {page.p.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </>
      );

    case 'cards':
      return (
        <>
          {eyebrow}
          {heading}
          <div className={`cg c${page.cols}`}>
            {page.items.map((it, i) => (
              <div key={i} className="cd">
                {it.n && <span className="n">{it.n}</span>}
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
          {note}
        </>
      );

    case 'ticks':
      return (
        <>
          {eyebrow}
          {heading}
          <ul className="tk">
            {page.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </>
      );

    case 'vs':
      return (
        <>
          {eyebrow}
          {heading}
          <div className="vs">
            <div>
              <small>{page.a.s}</small>
              <h3>{page.a.t}</h3>
              <p>{page.a.p}</p>
            </div>
            <div>
              <small>{page.b.s}</small>
              <h3>{page.b.t}</h3>
              <p>{page.b.p}</p>
            </div>
          </div>
          {note}
        </>
      );

    case 'stats':
    case 'outcome':
      return (
        <>
          {eyebrow}
          {heading}
          <p className="note">{page.p}</p>
          <div className="st3">
            {page.stats.map((s, i) => (
              <div key={i}>
                <b>{s[0]}</b>
                <span>{s[1]}</span>
              </div>
            ))}
          </div>
        </>
      );

    default:
      return null;
  }
}
