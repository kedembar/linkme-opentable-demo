import { motion } from 'framer-motion';

/**
 * Visual "finger tap" indicator for auto-play mode.
 * Renders an animated cursor dot + expanding ripple to show where the click is happening.
 */
export function TapIndicator({ show, delay = 0 }: { show: boolean; delay?: number }) {
  if (!show) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay }}
    >
      {/* Cursor dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 24,
          height: 24,
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 50%, transparent 70%)',
          boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 0.9, 1],
          opacity: [0, 1, 1, 0.8],
        }}
        transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      />

      {/* Expanding ripple ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 24,
          height: 24,
          border: '2px solid rgba(255,255,255,0.6)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 2.5],
          opacity: [0.8, 0],
        }}
        transition={{ delay: delay + 0.2, duration: 0.6, ease: 'easeOut' }}
      />

      {/* Second ripple */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 24,
          height: 24,
          border: '1.5px solid rgba(255,255,255,0.4)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 3],
          opacity: [0.6, 0],
        }}
        transition={{ delay: delay + 0.35, duration: 0.7, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

/**
 * A subtle pulsing glow that appears BEFORE the tap to draw attention to the element.
 * Shows a "look here" effect before the click happens.
 */
export function PreTapGlow({ show, delay = 0 }: { show: boolean; delay?: number }) {
  if (!show) return null;

  return (
    <motion.div
      className="absolute inset-0 z-40 pointer-events-none rounded-[inherit]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0.3, 0.6, 0.3, 0.7, 0] }}
      transition={{ delay, duration: 1.8, ease: 'easeInOut' }}
      style={{
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3), 0 0 25px rgba(255,255,255,0.15)',
        border: '1.5px solid rgba(255,255,255,0.25)',
      }}
    />
  );
}
