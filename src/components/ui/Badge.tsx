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
    brand: 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs',
    gold: 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200 shadow-xs',
    outline: 'bg-white text-slate-700 border border-slate-300 shadow-xs',
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
