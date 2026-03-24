import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onConfirmed: () => void;
}

function generateDates() {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    dates.push({
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      num: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      full: d,
      isToday: i === 0,
    });
  }
  return dates;
}

const TIME_SLOTS = [
  { time: '5:00 PM', available: true },
  { time: '5:30 PM', available: true },
  { time: '6:00 PM', available: true },
  { time: '6:30 PM', available: false },
  { time: '7:00 PM', available: true },
  { time: '7:30 PM', available: true },
  { time: '8:00 PM', available: true },
  { time: '8:30 PM', available: false },
  { time: '9:00 PM', available: true },
];

const PARTY_SIZES = [1, 2, 3, 4, 5, '6+'];

export function EmbeddedBooking({ isOpen, onConfirmed }: Props) {
  const [dates] = useState(generateDates);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedParty, setSelectedParty] = useState<number | string>(2);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTime(null);
      setConfirmed(false);
      setConfirming(false);
      setSelectedDate(0);
      setSelectedParty(2);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
    }, 1200);
    setTimeout(() => {
      onConfirmed();
    }, 3500);
  };

  const selectedDateObj = dates[selectedDate];
  const summaryText = `${selectedDateObj.day}, ${selectedDateObj.month} ${selectedDateObj.num} · ${selectedTime} · ${selectedParty} guest${selectedParty === 1 ? '' : 's'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mx-3 mt-2 rounded-2xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4"
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#DA3743"><circle cx="12" cy="12" r="10" fill="none" stroke="#DA3743" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#DA3743"/></svg>
                    <span className="text-[11px] font-semibold text-white/90">Book with OpenTable</span>
                  </div>

                  {/* Party size */}
                  <div className="mb-3">
                    <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1.5">Party size</div>
                    <div className="flex gap-1.5">
                      {PARTY_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedParty(size)}
                          className="w-8 h-8 rounded-lg text-[11px] font-medium transition-all"
                          style={{
                            backgroundColor: selectedParty === size ? '#DA3743' : 'rgba(255,255,255,0.06)',
                            color: selectedParty === size ? 'white' : 'rgba(255,255,255,0.5)',
                            border: selectedParty === size ? 'none' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date selector */}
                  <div className="mb-3">
                    <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1.5">Select date</div>
                    <div
                      ref={scrollRef}
                      className="flex gap-1.5 overflow-x-auto pb-1"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {dates.slice(0, 14).map((date, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(i)}
                          className="flex-shrink-0 w-[46px] py-2 rounded-xl text-center transition-all"
                          style={{
                            backgroundColor: selectedDate === i ? '#DA3743' : 'rgba(255,255,255,0.06)',
                            border: selectedDate === i ? 'none' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <div className="text-[9px] font-medium" style={{ color: selectedDate === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)' }}>
                            {date.day}
                          </div>
                          <div className="text-[13px] font-bold" style={{ color: selectedDate === i ? 'white' : 'rgba(255,255,255,0.6)' }}>
                            {date.num}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="mb-3">
                    <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1.5">Available times</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className="py-2 rounded-xl text-[11px] font-medium transition-all"
                          style={{
                            backgroundColor: selectedTime === slot.time
                              ? '#DA3743'
                              : slot.available
                                ? 'rgba(255,255,255,0.04)'
                                : 'rgba(255,255,255,0.02)',
                            border: selectedTime === slot.time
                              ? 'none'
                              : slot.available
                                ? '1px solid rgba(218,55,67,0.3)'
                                : '1px solid rgba(255,255,255,0.04)',
                            color: selectedTime === slot.time
                              ? 'white'
                              : slot.available
                                ? 'rgba(255,255,255,0.6)'
                                : 'rgba(255,255,255,0.15)',
                            cursor: slot.available ? 'pointer' : 'default',
                          }}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirm section */}
                  <AnimatePresence>
                    {selectedTime && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-[10px] text-white/40 text-center mb-2">{summaryText}</div>
                        <motion.button
                          onClick={handleConfirm}
                          disabled={confirming}
                          className="w-full py-3 rounded-xl text-white font-bold text-[12px] flex items-center justify-center gap-2"
                          style={{ backgroundColor: confirming ? '#999' : '#DA3743' }}
                          whileHover={!confirming ? { scale: 1.02 } : {}}
                          whileTap={!confirming ? { scale: 0.98 } : {}}
                        >
                          {confirming ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              />
                              Confirming...
                            </>
                          ) : (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
                              Book with OpenTable
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Powered by */}
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#DA3743"><circle cx="12" cy="12" r="10" fill="none" stroke="#DA3743" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#DA3743"/></svg>
                    <span className="text-[8px] text-white/25">Powered by OpenTable</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 flex flex-col items-center"
                >
                  {/* Success checkmark */}
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: 'rgba(52, 199, 89, 0.15)', border: '2px solid rgba(52, 199, 89, 0.3)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  >
                    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="#34C759"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.div
                    className="text-[14px] font-bold text-white mb-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Reservation Confirmed!
                  </motion.div>

                  <motion.div
                    className="text-[11px] text-white/50 text-center mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {summaryText}
                  </motion.div>

                  <motion.div
                    className="text-[9px] text-white/30 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Added to your calendar
                  </motion.div>

                  {/* Attribution badge */}
                  <motion.div
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full mt-1"
                    style={{ background: 'rgba(218,55,67,0.1)', border: '1px solid rgba(218,55,67,0.2)' }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="gradient-text-linkme text-[9px] font-bold">linkme</span>
                    <span className="text-white/20 text-[9px]">·</span>
                    <span className="text-[9px] text-white/40">Full attribution tracked</span>
                    <span className="text-[9px] text-green-400">✓</span>
                  </motion.div>

                  {/* Powered by */}
                  <motion.div
                    className="flex items-center gap-1.5 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#DA3743"><circle cx="12" cy="12" r="10" fill="none" stroke="#DA3743" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#DA3743"/></svg>
                    <span className="text-[8px] text-white/25">Powered by OpenTable</span>
                  </motion.div>

                  <motion.div
                    className="mt-3 text-[8px] text-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ animation: 'pulse 2s infinite' }}
                  >
                    Loading attribution dashboard...
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
