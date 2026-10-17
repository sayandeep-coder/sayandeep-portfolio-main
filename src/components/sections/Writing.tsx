import React from 'react';
import { Link } from 'react-router-dom';
import { getWritingCaseStudies } from '../../data/projects';
import { ArrowRightIcon } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function Writing() {
  const writingProjects = getWritingCaseStudies();

  return (
    <section className="page active" id="writing">
      <div className="wrap">
        <div className="pg">
          <SectionHeading
            eyebrow="Case studies · Field notes"
            title="Notes on <mark>how I think</mark>."
          />

          <div className="rows">
            {writingProjects.map((c, idx) => (
              <Link
                key={c.id}
                to={`/case-studies/${c.id}`}
                className="row it"
                style={{ '--i': idx + 2 } as React.CSSProperties}
              >
                <span className="n">{c.n}</span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.card}</p>
                </div>
                <span className="cat">{c.cat}</span>
                <span className="rt">{c.rt}</span>
                <ArrowRightIcon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
