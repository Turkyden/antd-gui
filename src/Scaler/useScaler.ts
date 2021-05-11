import { useEffect, useState } from 'react';

export type Action = {
  onZoomUp: () => void;
  onZoomDown: () => void;
  onReset: () => void;
  onWheel: (event: WheelEvent) => void;
};

export default function useScaler(initial: number): [number, Action] {
  const [scale, setScale] = useState(initial);

  useEffect(() => {
    const handlePreventWindowEvent = (event: any) => {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    };

    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.which === 61 ||
          event.which === 107 ||
          event.which === 173 ||
          event.which === 109 ||
          event.which === 187 ||
          event.which === 189)
      ) {
        event.preventDefault();
      }
    };
    // Ketdown
    window.addEventListener('keydown', handleKeyDownEvent, false);
    // Chrome IE 360
    window.addEventListener('mousewheel', handlePreventWindowEvent, {
      passive: false,
    });
    // Firefox
    window.addEventListener('DOMMouseScroll', handlePreventWindowEvent, {
      passive: false,
    });

    return () => {
      // Ketdown
      window.removeEventListener('keydown', handleKeyDownEvent, false);
      // Chrome IE 360
      window.removeEventListener('mousewheel', handlePreventWindowEvent);
      // Firefox
      window.removeEventListener('DOMMouseScroll', handlePreventWindowEvent);
    };
  });

  return [
    scale,
    {
      onZoomUp: () => setScale(scale + 10),
      onZoomDown: () => scale > 10 && setScale(scale - 10),
      onReset: () => setScale(initial),
      onWheel: (event: any) => {
        if (!event.ctrlKey) return;
        event.deltaY > 0
          ? scale > 10 && setScale(scale - 5)
          : setScale(scale + 5);
      },
    },
  ];
}
