import { motion } from 'framer-motion';
import { STEPS } from '../../data/constants';

const NODE_COLORS: Record<string, string> = {
  Instagram: '#E4405F',
  Linkme: '#F26B5B',
  OpenTable: '#DA3743',
  Reservation: '#34C759',
};

const NODE_ICONS: Record<string, string> = {
  Instagram: '📸',
  Linkme: '🔗',
  OpenTable: '🍽️',
  Reservation: '✓',
};

export function SidePanel({ currentStep }: { currentStep: number }) {
  const step = STEPS[currentStep - 1];

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-2">
        {STEPS.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
              animate={{
                backgroundColor: currentStep >= s.id ? 'rgba(201,168,76,0.15)' : 'rgba(0,0,0,0.04)',
                color: currentStep >= s.id ? '#9A7B2C' : '#9A9A9F',
                borderColor: currentStep >= s.id ? 'rgba(201,168,76,0.4)' : 'rgba(0,0,0,0.1)',
              }}
              style={{ border: '1.5px solid' }}
              transition={{ duration: 0.3 }}
            >
              {s.id}
            </motion.div>
            {s.id < 3 && (
              <motion.div
                className="w-6 h-[2px] rounded-full"
                animate={{
                  backgroundColor: currentStep > s.id ? 'rgba(201,168,76,0.4)' : 'rgba(0,0,0,0.08)',
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current step info */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-text-muted text-xs font-medium uppercase tracking-widest mb-2">
          Step {step.id} of 3
        </div>
        <h2 className="text-2xl font-bold text-text mb-3">{step.title}</h2>
        <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
      </motion.div>

      {/* Attribution Tracker */}
      <div className="glass-card rounded-2xl p-5">
        <div className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
          Live Attribution Tracking
        </div>

        <div className="flex flex-col gap-3">
          {step.trackingNodes.map((node, i) => (
            <motion.div
              key={node}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${NODE_COLORS[node]}20`, border: `1px solid ${NODE_COLORS[node]}40` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.1, type: 'spring', stiffness: 300 }}
                >
                  {NODE_ICONS[node]}
                </motion.div>
                <div>
                  <div className="text-sm font-medium text-text">{node}</div>
                  <div className="text-[10px] text-text-muted">
                    {node === 'Instagram' && 'Source detected'}
                    {node === 'Linkme' && 'Profile visited'}
                    {node === 'OpenTable' && 'Click tracked'}
                    {node === 'Reservation' && 'Confirmed ✓'}
                  </div>
                </div>
              </div>
              {i < step.trackingNodes.length - 1 && (
                <motion.div
                  className="absolute left-[22px] mt-12 w-[2px] h-4"
                  style={{ backgroundColor: `${NODE_COLORS[node]}40` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tracking status line */}
        <motion.div
          className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-muted font-mono"
          key={step.tracking}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {step.tracking}
        </motion.div>
      </div>

      {/* Navigation hint */}
      {currentStep < 3 && (
        <motion.div
          className="text-center text-xs text-text-muted"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap the highlighted element on the phone to continue →
        </motion.div>
      )}
    </div>
  );
}
