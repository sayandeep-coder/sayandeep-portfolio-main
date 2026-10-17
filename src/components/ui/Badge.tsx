import React from 'react';
import { cn } from '../../lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Eyebrow({ children, className, style }: EyebrowProps) {
  return (
    <span className={cn('eyebrow', className)} style={style}>
      {children}
    </span>
  );
}

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Chip({ children, className, style }: ChipProps) {
  return (
    <span className={cn('chip', className)} style={style}>
      {children}
    </span>
  );
}

interface ChipsProps {
  items: string[];
  className?: string;
  chipClassName?: string;
  style?: React.CSSProperties;
}

export function Chips({ items, className, chipClassName, style }: ChipsProps) {
  return (
    <div className={cn('chips', className)} style={style}>
      {items.map((item, idx) => (
        <span key={idx} className={cn('chip', chipClassName)}>
          {item}
        </span>
      ))}
    </div>
  );
}

interface BadgeProps {
  tag: string;
  text: string;
  className?: string;
}

export function Badge({ tag, text, className }: BadgeProps) {
  return (
    <div className={cn('badge', className)}>
      <b>{tag}</b>
      <span>{text}</span>
    </div>
  );
}
