import { useState, useEffect } from 'react';

export function useSingleAndDoubleClick(actionSimpleClick, actionDoubleClick, delay = 200) {
  const [click, setClick] = useState(0);
  const [event, setEvent] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (click === 1) actionSimpleClick(event);
      setClick(0);
    }, delay);
    if (click === 2) actionDoubleClick(event);
    return () => clearTimeout(timer);
  }, [click]);

  return (e) => {
    setEvent((ev) => e);
    setClick((prev) => prev + 1);
  };
}
