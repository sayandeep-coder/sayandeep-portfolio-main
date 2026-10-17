import React from 'react';
import { cn } from '../../lib/utils';
import { Eyebrow } from './Badge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  small?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  small = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(small ? 'head-sm' : undefined, className)}>
      {eyebrow && <Eyebrow className="it">{eyebrow}</Eyebrow>}
      {typeof title === 'string' ? (
        <h2 className="grad it" dangerouslySetInnerHTML={{ __html: title }} />
      ) : (
        <h2 className="grad it">{title}</h2>
      )}
      {description &&
        (typeof description === 'string' ? (
          <p className="t it" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="t it">{description}</p>
        ))}
    </div>
  );
}
