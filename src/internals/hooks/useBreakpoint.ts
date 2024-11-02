'use client';

import { useEffect, useState } from 'react';
import { breakpoints, BreakpointKey } from '../data/breakpoints';

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint: BreakpointKey = 'xs';

      Object.entries(breakpoints).forEach(([key, value]) => {
        if (width >= value) {
          newBreakpoint = key as BreakpointKey;
        }
      });

      setCurrentBreakpoint(newBreakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint: currentBreakpoint,
    isXs: currentBreakpoint === 'xs',
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    up: (key: BreakpointKey) => {
      const currentValue = breakpoints[currentBreakpoint];
      const compareValue = breakpoints[key];
      return currentValue >= compareValue;
    },
    down: (key: BreakpointKey) => {
      const currentValue = breakpoints[currentBreakpoint];
      const compareValue = breakpoints[key];
      return currentValue < compareValue;
    },
    between: (start: BreakpointKey, end: BreakpointKey) => {
      const currentValue = breakpoints[currentBreakpoint];
      return currentValue >= breakpoints[start] && currentValue < breakpoints[end];
    }
  };
}