import React from 'react';
import { cn } from '../../lib/utils';

export const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <path d="M13 8H3M7 4L3 8l4 4" />
  </svg>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'pill';
  withArrow?: boolean;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = 'primary',
  withArrow = false,
  asAnchor = false,
  href,
  target,
  rel,
  className,
  ...rest
}: ButtonProps) {
  const baseClass =
    variant === 'pill'
      ? 'pill-btn'
      : variant === 'ghost'
        ? 'btn g'
        : 'btn p';

  const fullClass = cn(baseClass, className);

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className={fullClass}>
        {children}
        {withArrow && <ArrowRightIcon />}
      </a>
    );
  }

  return (
    <button type="button" className={fullClass} {...rest}>
      {children}
      {withArrow && <ArrowRightIcon />}
    </button>
  );
}
