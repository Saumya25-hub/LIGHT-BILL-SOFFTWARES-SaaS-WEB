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
    default: 'glass-card rounded-2xl',
    hoverable: 'glass-card glass-card-hover rounded-2xl cursor-pointer',
    glow: 'glass-card rounded-2xl border-sky-500/30 shadow-glow-sm relative overflow-hidden',
    subtle: 'bg-navy-900/40 border border-white/5 rounded-2xl backdrop-blur-md',
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
