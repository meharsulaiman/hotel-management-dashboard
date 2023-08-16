import { useEffect, useRef } from 'react';

export function useOutSideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () => document.removeEventListener('click', handleClick, true);
    },
    [handler, listenCapturing]
  );
  return { ref };
}
