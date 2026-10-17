import React from 'react';
import { Link } from 'react-router-dom';
import { getSystemCaseStudies } from '../../data/projects';
import { ArrowRightIcon } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function CaseStudies() {
  const systemProjects = getSystemCaseStudies();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  return (
    <section className="page active" id="work">
      <div className="wrap">
        <div className="pg">
          <SectionHeading
            eyebrow="Case studies · Systems"
            title="Systems, with the <mark>reasoning behind them</mark>."
          />

          <div className="cards c2">
            {systemProjects.map((c, idx) => (
              <Link
                key={c.id}
                to={`/case-studies/${c.id}`}
                className="card it"
                style={{ '--i': idx + 2 } as React.CSSProperties}
                onMouseMove={handleMouseMove}
              >
                <span className="n">
                  CASE {c.n} &middot; {c.cat.toUpperCase()}
                </span>
                <h3>{c.name}</h3>
                <div className="tag">{c.title}</div>
                <p className="s">{c.card}</p>
                <span className="more">
                  Read case study <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
