import { motion } from 'framer-motion';
import { METRICS } from '../../data/constants';
import { AnimatedCounter } from '../AnimatedCounter';

const cards = [
  {
    label: 'Profile Views',
    value: METRICS.profileViews,
    format: 'number' as const,
    icon: '👁️',
    color: '#5AC8FA',
  },
  {
    label: 'OpenTable Clicks',
    value: METRICS.openTableClicks,
    format: 'number' as const,
    icon: '🍽️',
    color: '#DA3743',
  },
  {
    label: 'Reservations',
    value: METRICS.reservations,
    format: 'number' as const,
    icon: '✅',
    color: '#34C759',
  },
  {
    label: 'Conversion Rate',
    value: METRICS.conversionRate,
    format: 'percent' as const,
    icon: '📈',
    color: '#C9A84C',
  },
  {
    label: 'Attributed Revenue',
    value: METRICS.attributedRevenue,
    format: 'currency' as const,
    icon: '💰',
    color: '#F7A828',
  },
];

export function BottomMetrics({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full flex gap-3 justify-center flex-wrap mt-8">
      {cards.map((card, i) => {
        const isActive = currentStep >= 3 || (currentStep >= 2 && i < 2);
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isActive ? 1 : 0.3,
              y: isActive ? 0 : 10,
            }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-4 min-w-[170px] flex-1 max-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{card.icon}</span>
              <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                {card.label}
              </span>
            </div>
            <div className="text-xl font-bold text-text">
              {isActive ? (
                <AnimatedCounter value={card.value} format={card.format} />
              ) : (
                <span className="text-text-muted">—</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
