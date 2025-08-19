import React from 'react';
import { cn } from './utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({ 
  children, 
  className, 
  cols = 1,
  gap = 'md',
  padding = 'none'
}: ResponsiveGridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  const gapClasses = {
    none: '',
    sm: 'gap-2 md:gap-3',
    md: 'gap-3 md:gap-4 lg:gap-6',
    lg: 'gap-4 md:gap-6 lg:gap-8',
    xl: 'gap-6 md:gap-8 lg:gap-10',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8 lg:p-10',
    xl: 'p-8 md:p-10 lg:p-12',
  };

  return (
    <div className={cn(
      'grid w-full',
      colsClasses[cols],
      gapClasses[gap],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive flex container component
interface ResponsiveFlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveFlex({ 
  children, 
  className, 
  direction = 'row',
  wrap = false,
  justify = 'start',
  align = 'start',
  gap = 'none',
  padding = 'none'
}: ResponsiveFlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap';

  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  };

  const gapClasses = {
    none: '',
    sm: 'gap-2 md:gap-3',
    md: 'gap-3 md:gap-4 lg:gap-6',
    lg: 'gap-4 md:gap-6 lg:gap-8',
    xl: 'gap-6 md:gap-8 lg:gap-10',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8 lg:p-10',
    xl: 'p-8 md:p-10 lg:p-12',
  };

  return (
    <div className={cn(
      'flex w-full',
      directionClasses[direction],
      wrapClasses,
      justifyClasses[justify],
      alignClasses[align],
      gapClasses[gap],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive stack component (vertical flex with consistent spacing)
interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'end' | 'center' | 'stretch';
}

export function ResponsiveStack({ 
  children, 
  className, 
  spacing = 'md',
  padding = 'none',
  align = 'stretch'
}: ResponsiveStackProps) {
  const spacingClasses = {
    none: '',
    sm: 'space-y-2 md:space-y-3',
    md: 'space-y-4 md:space-y-6 lg:space-y-8',
    lg: 'space-y-6 md:space-y-8 lg:space-y-10',
    xl: 'space-y-8 md:space-y-10 lg:space-y-12',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8 lg:p-10',
    xl: 'p-8 md:p-10 lg:p-12',
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
  };

  return (
    <div className={cn(
      'flex flex-col w-full',
      spacingClasses[spacing],
      paddingClasses[padding],
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  );
}
