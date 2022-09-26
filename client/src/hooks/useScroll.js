import { useEffect } from 'react';

const DEFAULT_TOP = 250;

export function useScroll(top = DEFAULT_TOP) {
  useEffect(() => {
    window.scroll({ top });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
