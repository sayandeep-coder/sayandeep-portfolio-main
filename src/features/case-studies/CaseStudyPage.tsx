import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chips, Eyebrow } from '../../components/ui/Badge';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/ui/Button';
import { SEOHead } from '../../components/ui/SEOHead';
import { getNextCaseStudy } from '../../data/projects';
import { getCaseStudySEO } from '../../lib/seo';
import { cn, scrollToSection } from '../../lib/utils';
import type { CaseStudy } from '../../types/portfolio';
import { CaseStudyRenderer } from './CaseStudyRenderer';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const navigate = useNavigate();
  const nextCase = getNextCaseStudy(caseStudy.id);
  const [activeTocId, setActiveTocId] = useState<string>('c1');

  // Scroll to top on case study mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseStudy.id]);

  // Set up intersection observer for the sticky TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
      }
    );

    const sections = document.querySelectorAll('.case-body .page');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [caseStudy.id]);

  const handleTocClick = (targetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, top - 80),
        behavior: 'smooth',
      });
    }
  };

  const handleBackToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      scrollToSection('work');
    }, 100);
  };

  const seo = getCaseStudySEO(caseStudy);

  return (
    <>
      <SEOHead seo={seo} />

      {/* Case Cover Section */}
      <section className="page cover active" id="c0">
        <div className="wrap">
          <div className="pg">
            <button
              type="button"
              className="back it"
              onClick={handleBackToWork}
              style={{ '--i': 0 } as React.CSSProperties}
            >
              <ArrowLeftIcon /> All case studies
            </button>

            <div className="it" style={{ '--i': 1 } as React.CSSProperties}>
              <Eyebrow>
                Case study {caseStudy.n} &middot; {caseStudy.cat}
              </Eyebrow>
            </div>

            <h1
              className="grad it"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {caseStudy.name}
            </h1>

            <p
              className="lede it"
              style={{ '--i': 3 } as React.CSSProperties}
            >
              {caseStudy.lede}
            </p>

            <div
              className="c-meta it"
              style={{ '--i': 4 } as React.CSSProperties}
            >
              <div>
                <small>Role</small>
                <b>{caseStudy.role}</b>
              </div>
              <div>
                <small>Status</small>
                <b>{caseStudy.status}</b>
              </div>
              <div>
                <small>Year</small>
                <b>
                  {caseStudy.yr} &middot; {caseStudy.rt}
                </b>
              </div>
              <div>
                <small>Source</small>
                <b>
                  {caseStudy.repo ? (
                    <a
                      href={caseStudy.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repository ↗
                    </a>
                  ) : caseStudy.site ? (
                    <a
                      href={caseStudy.site}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {caseStudy.site} ↗
                    </a>
                  ) : (
                    'Essay'
                  )}
                </b>
              </div>
            </div>

            <div
              className="it"
              style={{ '--i': 5, marginTop: '22px' } as React.CSSProperties}
            >
              <Chips items={caseStudy.stack} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sticky TOC */}
      <div className="wrap">
        <div className="case-grid">
          <aside className="toc">
            <h5>On this page</h5>
            {caseStudy.pages.map((p, i) => {
              const targetId = `c${i + 1}`;
              const isActive = activeTocId === targetId;
              return (
                <a
                  key={targetId}
                  href={`#${targetId}`}
                  className={cn(isActive && 'on')}
                  onClick={(e) => handleTocClick(targetId, e)}
                >
                  {p.l}
                </a>
              );
            })}
          </aside>

          <div className="case-body">
            {caseStudy.pages.map((pageData, i) => {
              const sectionId = `c${i + 1}`;
              return (
                <section
                  key={sectionId}
                  className="page active"
                  id={sectionId}
                >
                  <div className="wrap">
                    <div className="pg">
                      <CaseStudyRenderer
                        page={pageData}
                        caseStudy={caseStudy}
                      />
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Case Study Preview Banner */}
      {nextCase && (
        <section className="page next active" id="cn">
          <div className="wrap">
            <div className="pg">
              <div className="next">
                <Link to={`/case-studies/${nextCase.id}`}>
                  <Eyebrow className="it">Next case study</Eyebrow>
                  <h3 className="grad it">
                    {nextCase.name} <ArrowRightIcon />
                  </h3>
                  <p className="t it">{nextCase.card}</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
