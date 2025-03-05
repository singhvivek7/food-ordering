import { useRef, useState } from 'react';

export const useTimer = (maxTime: number) => {
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const ref = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimeLeft(maxTime);
    ref.current = setInterval(() => {
      setTimeLeft(prev => {
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (ref.current) {
      clearInterval(ref.current);
    }
  };

  return {
    timeLeft,
    startTimer,
    stopTimer,
  };
};
