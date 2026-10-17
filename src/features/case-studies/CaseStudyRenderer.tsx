import React from 'react';
import { Chips, Eyebrow } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import type { CaseStudy, CaseStudyPageData, CaseStudyPageItem } from '../../types/portfolio';

interface CaseStudyRendererProps {
  page: CaseStudyPageData;
  caseStudy: CaseStudy;
}

export function CaseStudyRenderer({ page, caseStudy }: CaseStudyRendererProps) {
  const eyebrowText = `${caseStudy.name} · ${page.l}`;

  const renderParagraphs = (p?: string | string[]) => {
    if (!p) return null;
    const items = Array.isArray(p) ? p : [p];
    return items.map((text, i) => (
      <p
        key={i}
        className="t it"
        style={{ '--i': i + 2 } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    ));
  };

  const renderKeyList = (items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="klist">
        {items.map((item, i) => (
          <li
            key={i}
            className="it"
            style={{ '--i': i + 2 } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
    );
  };

  switch (page.k) {
    case 'two':
      return (
        <div className="two">
          <div>
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          <div className="body">
            {renderParagraphs(page.p)}
            {renderKeyList(page.list)}
            {page.chips && (
              <div className="it" style={{ '--i': 5 } as React.CSSProperties}>
                <Chips items={page.chips} />
              </div>
            )}
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="two">
          <div>
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          {renderKeyList(page.list)}
        </div>
      );

    case 'chips':
      return (
        <div className="two">
          <div>
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
            {page.p && (
              <div className="body" style={{ marginTop: '22px' }}>
                {renderParagraphs(page.p)}
              </div>
            )}
          </div>
          <div className="it" style={{ '--i': 3 } as React.CSSProperties}>
            <div className="chips" style={{ gap: '9px' }}>
              {page.chips?.map((c, i) => (
                <span
                  key={i}
                  className="chip"
                  style={{
                    fontSize: '13.5px',
                    padding: '9px 14px',
                    borderRadius: '10px',
                    color: 'var(--sub)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    case 'steps':
      return (
        <div>
          <div className="head-sm">
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          <div className="steps it" style={{ '--i': 2 } as React.CSSProperties}>
            {page.steps?.map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <i className="sar" />}
                <div className="stp" style={{ '--k': i } as React.CSSProperties}>
                  {step[0]}
                  {step[1] && <small>{step[1]}</small>}
                </div>
              </React.Fragment>
            ))}
          </div>
          {page.p && (
            <div
              className="body"
              style={{
                marginTop: 'clamp(22px, 4vh, 40px)',
                maxWidth: '760px',
              }}
            >
              {renderParagraphs(page.p)}
            </div>
          )}
        </div>
      );

    case 'cards':
      return (
        <div>
          <div className="head-sm">
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          <div className={cn('cards', `c${page.cols || 3}`)}>
            {(page.items as CaseStudyPageItem[])?.map((item, i) => (
              <div
                key={i}
                className="card it"
                style={{ '--i': i + 2 } as React.CSSProperties}
              >
                {item.n && <span className="n">{item.n}</span>}
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            ))}
          </div>
          {page.note && (
            <p
              className="t it"
              style={{ marginTop: '20px', maxWidth: '760px' }}
              dangerouslySetInnerHTML={{ __html: page.note }}
            />
          )}
        </div>
      );

    case 'ticks':
      return (
        <div>
          <div className="head-sm">
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          <ul className="ticks">
            {(page.items as string[])?.map((item, i) => (
              <li
                key={i}
                className="it"
                style={{ '--i': i + 2 } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>
      );

    case 'vs':
      return (
        <div>
          <div className="head-sm">
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
          </div>
          {page.a && page.b && (
            <div className="vs it" style={{ '--i': 2 } as React.CSSProperties}>
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
          )}
          {page.note && (
            <p
              className="t it"
              style={{ marginTop: '20px', maxWidth: '760px' }}
              dangerouslySetInnerHTML={{ __html: page.note }}
            />
          )}
        </div>
      );

    case 'stats':
    case 'outcome':
      return (
        <div>
          <div className="head-sm">
            <Eyebrow className="it">{eyebrowText}</Eyebrow>
            <h2 className="it" dangerouslySetInnerHTML={{ __html: page.h }} />
            {page.p && renderParagraphs(page.p)}
          </div>
          {page.stats && (
            <div className="stat3">
              {page.stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat it"
                  style={{ '--i': i + 3 } as React.CSSProperties}
                >
                  <b>{stat[0]}</b>
                  <span>{stat[1]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
