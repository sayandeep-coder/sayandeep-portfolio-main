import { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { cn } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';

export function TechStack() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (skillKey: string) => {
    setImageErrors((prev) => ({ ...prev, [skillKey]: true }));
  };

  return (
    <section className="page active" id="stack">
      <div className="wrap">
        <div className="pg">
          <SectionHeading
            eyebrow="Stack"
            title="Chosen per problem, <mark>not per habit</mark>."
          />

          <div className="tree it" style={{ '--i': 2 } as React.CSSProperties}>
            {/* Core Root Node */}
            <div className="t-core">
              <img
                src="/sayandeep.png"
                alt="Sayandeep Purkait"
                className="t-core-logo"
              />
            </div>
            <div className="t-rootl">Sayandeep Purkait</div>
            <div className="t-stem" />

            {/* Tree Columns & Bus Line */}
            <div className="t-cols">
              <div className="t-bus" />

              {SKILL_CATEGORIES.map((cat, cIdx) => (
                <div
                  key={cat.category}
                  className="t-col"
                  style={{ '--c': cIdx } as React.CSSProperties}
                >
                  <span className="t-cat">{cat.category}</span>
                  <ul className="t-leaves">
                    {cat.skills.map((skill, jIdx) => {
                      const skillKey = `${cat.category}-${skill.name}`;
                      const hasError = imageErrors[skillKey];
                      const iconUrl =
                        skill.iconSlug && !hasError
                          ? `https://cdn.simpleicons.org/${skill.iconSlug}${
                              skill.iconColor ? `/${skill.iconColor}` : ''
                            }`
                          : null;

                      const fallbackLetters =
                        skill.iconFallback ||
                        skill.name
                          .replace(/[^A-Za-z+]/g, '')
                          .slice(0, 3)
                          .toUpperCase();

                      return (
                        <li
                          key={skill.name}
                          style={{ '--j': jIdx } as React.CSSProperties}
                        >
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt=""
                              loading="lazy"
                              className={cn(skill.invertOnLight && 'inv')}
                              onError={() => handleImageError(skillKey)}
                            />
                          ) : (
                            <i className="lg">{fallbackLetters}</i>
                          )}
                          <span>{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
