import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onNext: () => void;
}

const timeSlots = ['7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM'];

export function OpenTableReservation({ onNext }: Props) {
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setShowSuccess(true), 600);
    setTimeout(() => onNext(), 3000);
  };

  return (
    <div className="min-h-full bg-white text-gray-900 flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-[58px] pb-2 bg-white">
        <span className="text-xs font-semibold text-gray-900">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#1a1a1a"><rect x="0" y="6" width="3" height="6" rx="0.5"/><rect x="4.5" y="4" width="3" height="8" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fillOpacity="0.3"/></svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="#1a1a1a"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 10 1.5 7.5 1.5C5 1.5 2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z"/><path d="M7.5 7C8.6 7 9.6 7.4 10.4 8.1L11.8 6.7C10.6 5.6 9.1 5 7.5 5C5.9 5 4.4 5.6 3.2 6.7L4.6 8.1C5.4 7.4 6.4 7 7.5 7Z"/><circle cx="7.5" cy="10.5" r="1.5"/></svg>
          <div className="w-[22px] h-[11px] rounded-[3px] border border-gray-400 relative">
            <div className="absolute inset-[1.5px] right-[3px] bg-gray-900 rounded-[1px]"/>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="form"
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col"
          >
            {/* OpenTable Header */}
            <div className="bg-[#DA3743] px-5 py-4">
              <div className="flex items-center gap-2">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="white"><path d="M8 2L2 8l6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span className="text-white font-bold text-lg">OpenTable</span>
                  </div>
                </div>
                <div className="w-4" />
              </div>
            </div>

            {/* Restaurant info */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden">
                  <img src="/images/profile.png" alt="CLAUDIE Miami" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">CLAUDIE Miami</div>
                  <div className="text-sm text-gray-500">Mediterranean Cuisine</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= 4 ? '#DA3743' : '#ddd'}>
                        <path d="M6 0l1.8 3.6L12 4.2 8.9 7.1l.7 4.1L6 9.3 2.4 11.2l.7-4.1L0 4.2l4.2-.6z"/>
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">4.8 (2,341 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Attribution indicator */}
              <motion.div
                className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]"
                style={{ backgroundColor: 'rgba(218,55,67,0.06)', border: '1px solid rgba(218,55,67,0.1)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="gradient-text-linkme font-bold">linkme</span>
                <span className="text-gray-400">→</span>
                <span className="text-[#DA3743] font-medium">Tracked referral</span>
              </motion.div>
            </div>

            {/* Date/Time/Party selectors */}
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="border border-gray-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Date</div>
                  <div className="text-sm font-semibold mt-1 text-gray-900">Sat, Mar 29</div>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Time</div>
                  <div className="text-sm font-semibold mt-1 text-gray-900">7:30 PM</div>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Party</div>
                  <div className="text-sm font-semibold mt-1 text-gray-900">2 guests</div>
                </div>
              </div>

              {/* Time slots */}
              <div className="mt-5">
                <div className="text-sm font-semibold text-gray-700 mb-3">Select a time</div>
                <div className="flex gap-2 flex-wrap">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      style={{
                        backgroundColor: selectedTime === time ? '#DA3743' : '#f5f5f5',
                        color: selectedTime === time ? 'white' : '#666',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Reservation summary */}
              <motion.div
                className="mt-5 bg-gray-50 rounded-xl p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Reservation Summary</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Restaurant</span>
                    <span className="font-medium text-gray-900">CLAUDIE Miami</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-medium text-gray-900">Mar 29, {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Party Size</span>
                    <span className="font-medium text-gray-900">2 guests</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Confirm button */}
            <div className="px-5 pb-8 mt-auto">
              <motion.button
                onClick={handleConfirm}
                disabled={confirmed}
                className="w-full py-4 rounded-2xl text-white font-bold text-base"
                style={{ backgroundColor: confirmed ? '#999' : '#DA3743' }}
                whileHover={!confirmed ? { scale: 1.02 } : {}}
                whileTap={!confirmed ? { scale: 0.98 } : {}}
              >
                {confirmed ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Confirming...
                  </motion.div>
                ) : (
                  'Complete Reservation'
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex-1 flex flex-col items-center justify-center px-8"
          >
            {/* Success checkmark */}
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(52, 199, 89, 0.1)', border: '2px solid rgba(52, 199, 89, 0.3)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            >
              <motion.svg
                width="36" height="36" viewBox="0 0 24 24" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="#34C759"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </motion.svg>
            </motion.div>

            <motion.h2
              className="text-xl font-bold text-gray-900 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Reservation Confirmed!
            </motion.h2>

            <motion.p
              className="text-sm text-gray-500 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              CLAUDIE Miami · Sat, Mar 29 · {selectedTime} · 2 guests
            </motion.p>

            {/* Attribution badge */}
            <motion.div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, rgba(247,168,40,0.1), rgba(230,36,122,0.1))', border: '1px solid rgba(242,107,91,0.2)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="gradient-text-linkme text-xs font-bold">linkme</span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-xs text-gray-600">Full attribution tracked</span>
              <span className="text-xs">✓</span>
            </motion.div>

            <motion.div
              className="mt-6 text-[11px] text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ animation: 'pulse 2s infinite' }}
            >
              Loading attribution dashboard...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
