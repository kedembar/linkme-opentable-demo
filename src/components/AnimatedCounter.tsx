import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  format: 'number' | 'currency' | 'percent';
  duration?: number;
}

export function AnimatedCounter({ value, format, duration = 1.5 }: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (latest) => {
    if (format === 'currency') return `$${Math.round(latest).toLocaleString()}`;
    if (format === 'percent') return `${latest.toFixed(1)}%`;
    return Math.round(latest).toLocaleString();
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      spring.set(value);
    }
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
