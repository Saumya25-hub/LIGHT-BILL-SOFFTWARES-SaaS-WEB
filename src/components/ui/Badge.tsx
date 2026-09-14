import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'gold' | 'success' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'brand',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wide gap-1',
    md: 'text-xs px-3 py-1 font-medium tracking-wide gap-1.5',
  };

  const variantStyles = {
    brand: 'bg-sky-500/10 text-sky-300 border border-sky-500/30 shadow-sm',
    gold: 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-glow-gold',
    success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
    neutral: 'bg-white/5 text-slate-300 border border-white/10',
    outline: 'bg-transparent text-slate-300 border border-white/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full uppercase font-mono select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
