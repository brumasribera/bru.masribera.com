import { useEffect } from 'react';

export function useScrollPosition() {
  // Only restore scroll position on mount, no event listeners
  useEffect(() => {
    // Restore scroll position on mount
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, position);
      });
      // Clear saved position after restoring
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);
}
