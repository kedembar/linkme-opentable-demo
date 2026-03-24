import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

export function PhoneFrame({ children, step }: { children: ReactNode; step: number }) {
  return (
    <div className="relative flex-shrink-0">
      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[375px] h-[812px] rounded-[55px] bg-[#1C1C1E] phone-shadow overflow-hidden border-[3px] border-[#2A2A2E]">
        {/* Dynamic Island */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

        {/* Screen */}
        <div className="absolute inset-[3px] rounded-[52px] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[160px] w-[3px] h-[32px] bg-[#2A2A2E] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[210px] w-[3px] h-[60px] bg-[#2A2A2E] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[280px] w-[3px] h-[60px] bg-[#2A2A2E] rounded-l-sm" />
        <div className="absolute -right-[2px] top-[230px] w-[3px] h-[80px] bg-[#2A2A2E] rounded-r-sm" />
      </div>
    </div>
  );
}
