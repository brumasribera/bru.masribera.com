import React from 'react';
import { cn } from './utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  center?: boolean;
}

export function ResponsiveContainer({ 
  children, 
  className, 
  padding = 'md',
  maxWidth = 'full',
  center = false 
}: ResponsiveContainerProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4 md:p-6 lg:p-8',
    lg: 'p-6 md:p-8 lg:p-10 xl:p-12',
    xl: 'p-8 md:p-10 lg:p-12 xl:p-16',
  };

  const maxWidthClasses = {
    none: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn(
      'w-full',
      paddingClasses[padding],
      maxWidth !== 'full' && center && 'mx-auto',
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive section component
interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveSection({ 
  children, 
  className, 
  padding = 'md',
  spacing = 'md'
}: ResponsiveSectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6 lg:p-8',
    lg: 'p-6 md:p-8 lg:p-10',
    xl: 'p-8 md:p-10 lg:p-12',
  };

  const spacingClasses = {
    none: '',
    sm: 'space-y-2 md:space-y-3',
    md: 'space-y-4 md:space-y-6 lg:space-y-8',
    lg: 'space-y-6 md:space-y-8 lg:space-y-10',
    xl: 'space-y-8 md:space-y-10 lg:space-y-12',
  };

  return (
    <section className={cn(
      'w-full',
      paddingClasses[padding],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </section>
  );
}

// Responsive card component
interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export function ResponsiveCard({ 
  children, 
  className, 
  padding = 'md',
  shadow = 'md'
}: ResponsiveCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6 lg:p-8',
    lg: 'p-6 md:p-8 lg:p-10',
    xl: 'p-8 md:p-10 lg:p-12',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div className={cn(
      'bg-white rounded-2xl border border-gray-100',
      paddingClasses[padding],
      shadowClasses[shadow],
      className
    )}>
      {children}
    </div>
  );
}
