import { useState, useEffect } from 'react';

// Breakpoint definitions
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.sm) {
        setBreakpoint('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint('lg');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setBreakpoint('2xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Add event listener
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const isAbove = (bp: Breakpoint) => {
    return window.innerWidth >= BREAKPOINTS[bp];
  };

  const isBelow = (bp: Breakpoint) => {
    return window.innerWidth < BREAKPOINTS[bp];
  };

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isAbove,
    isBelow,
    BREAKPOINTS,
  };
}

// Responsive class utilities
export const responsiveClasses = {
  // Padding
  padding: {
    sm: 'p-2',
    md: 'p-4 md:p-6',
    lg: 'p-4 md:p-6 lg:p-8',
    xl: 'p-4 md:p-6 lg:p-8 xl:p-10',
  },
  // Spacing
  spacing: {
    sm: 'space-y-2',
    md: 'space-y-4 md:space-y-6',
    lg: 'space-y-4 md:space-y-6 lg:space-y-8',
    xl: 'space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10',
  },
  // Text sizes
  text: {
    h1: 'text-2xl md:text-3xl lg:text-4xl',
    h2: 'text-xl md:text-2xl lg:text-3xl',
    h3: 'text-lg md:text-xl lg:text-2xl',
    body: 'text-sm md:text-base lg:text-lg',
    small: 'text-xs md:text-sm',
  },
  // Button sizes
  button: {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 md:py-4 px-4 md:px-6 text-sm md:text-base',
    lg: 'py-3 md:py-4 lg:py-5 px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg',
  },
  // Icon sizes
  icon: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 md:w-6 md:h-6',
    lg: 'w-6 h-6 md:w-8 md:h-8',
  },
  // Grid layouts
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
    },
    gap: {
      sm: 'gap-2 md:gap-3',
      md: 'gap-3 md:gap-4',
      lg: 'gap-4 md:gap-6',
    },
  },
} as const;
