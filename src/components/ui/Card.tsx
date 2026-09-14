import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hoverable' | 'glow' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const variantStyles = {
    default: 'bg-white border border-slate-200/90 shadow-card rounded-2xl',
    hoverable: 'bg-white border border-slate-200/90 shadow-card hover:shadow-elevated hover:border-sky-300 transition-all duration-300 rounded-2xl cursor-pointer',
    glow: 'bg-white border border-sky-200 shadow-card rounded-2xl relative overflow-hidden',
    subtle: 'bg-slate-50 border border-slate-200/70 rounded-2xl',
  };

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
