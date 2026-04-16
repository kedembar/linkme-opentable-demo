import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { TapIndicator, PreTapGlow } from '../TapIndicator';

interface Props {
  isOpen: boolean;
  onConfirmed: () => void;
  autoPlay?: boolean;
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

export function EmbeddedBooking({ isOpen, onConfirmed, autoPlay }: Props) {
  const [dates] = useState(generateDates);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedParty, setSelectedParty] = useState<number | string>(2);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Helper: scroll the booking widget into view within the PhoneFrame
  const scrollWidgetIntoView = () => {
    if (!widgetRef.current) return;
    // Find the scrollable PhoneFrame ancestor
    let scrollParent = widgetRef.current.parentElement;
    while (scrollParent) {
      if (scrollParent.scrollHeight > scrollParent.clientHeight + 10) {
        const overflowY = window.getComputedStyle(scrollParent).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') break;
      }
      scrollParent = scrollParent.parentElement;
    }
    if (!scrollParent) return;
    // Use getBoundingClientRect for accurate position (works with animated elements)
    const widgetRect = widgetRef.current.getBoundingClientRect();
    const parentRect = scrollParent.getBoundingClientRect();
    // How far the widget top is from the scroll container top (in current scroll position)
    const widgetTopRelative = widgetRect.top - parentRect.top;
    // The Dynamic Island + status bar covers the top ~58px of the phone screen.
    // Content scrolled above that line is hidden behind the notch.
    // Position the widget top just below the safe area.
    const safeAreaTop = 58;
    const scrollDelta = widgetTopRelative - safeAreaTop;
    scrollParent.scrollTo({ top: scrollParent.scrollTop + scrollDelta, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedTime(null);
      setConfirmed(false);
      setConfirming(false);
      setSelectedDate(0);
      setSelectedParty(2);
      setAutoPhase(null);
      setAutoTap(null);
    }
  }, [isOpen]);

  // Auto-play phase tracking: 'party' | 'date' | 'time' | 'confirm' | null
  const [autoPhase, setAutoPhase] = useState<string | null>(null);
  const [autoTap, setAutoTap] = useState<string | null>(null);

  // Auto-play: walk through each selection with visible glow → tap → action
  useEffect(() => {
    if (!autoPlay || !isOpen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timers.push(id); };

    // Initial scroll to show the widget once it opens (wait for height animation to finish)
    t(() => scrollWidgetIntoView(), 800);
    // Re-scroll after layout has fully settled
    t(() => scrollWidgetIntoView(), 1200);

    // Phase 1: Party size — glow then tap "4"
    t(() => { setAutoPhase('party'); scrollWidgetIntoView(); }, 1600);
    t(() => { setAutoTap('party'); setSelectedParty(4); }, 2800);

    // Phase 2: Date — glow then tap 3rd date
    t(() => { setAutoPhase('date'); setAutoTap(null); scrollWidgetIntoView(); }, 3800);
    t(() => { setAutoTap('date'); setSelectedDate(2); }, 5000);

    // Phase 3: Time slot — glow then tap "7:00 PM"
    t(() => { setAutoPhase('time'); setAutoTap(null); scrollWidgetIntoView(); }, 6000);
    t(() => { setAutoTap('time'); setSelectedTime('7:00 PM'); }, 7200);

    // Phase 4: Confirm button — glow then tap
    t(() => { setAutoPhase('confirm'); setAutoTap(null); scrollWidgetIntoView(); }, 8600);
    t(() => {
      setAutoTap('confirm');
      setConfirming(true);
      setTimeout(() => { setConfirming(false); setConfirmed(true); scrollWidgetIntoView(); }, 1200);
      setTimeout(() => onConfirmed(), 3500);
    }, 9800);

    return () => timers.forEach(clearTimeout);
  }, [autoPlay, isOpen, onConfirmed]);

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
          ref={widgetRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mx-3 mt-1 rounded-2xl overflow-hidden" style={{ background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(239,237,237,0.1)' }}>
            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 pb-2"
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#DA3743"><circle cx="12" cy="12" r="10" fill="none" stroke="#DA3743" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#DA3743"/></svg>
                    <span className="text-[11px] font-semibold" style={{ color: 'rgba(239,237,237,0.9)' }}>Book with OpenTable</span>
                  </div>

                  {/* Party size */}
                  <div className="mb-2">
                    <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(239,237,237,0.4)' }}>Party size</div>
                    <div className="flex gap-1.5">
                      {PARTY_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedParty(size)}
                          className="w-8 h-8 rounded-lg text-[11px] font-medium transition-all relative"
                          style={{
                            backgroundColor: selectedParty === size ? '#DA3743' : 'rgba(239,237,237,0.06)',
                            color: selectedParty === size ? '#fff' : 'rgba(239,237,237,0.5)',
                            border: selectedParty === size ? 'none' : '1px solid rgba(239,237,237,0.1)',
                          }}
                        >
                          {size}
                          {size === 4 && <PreTapGlow show={autoPhase === 'party' && autoTap !== 'party'} />}
                          {size === 4 && <TapIndicator show={autoTap === 'party'} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date selector */}
                  <div className="mb-2">
                    <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(239,237,237,0.4)' }}>Select date</div>
                    <div
                      ref={scrollRef}
                      className="flex gap-1.5 overflow-x-auto pb-1"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {dates.slice(0, 14).map((date, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(i)}
                          className="flex-shrink-0 w-[44px] py-1.5 rounded-xl text-center transition-all relative"
                          style={{
                            backgroundColor: selectedDate === i ? '#DA3743' : 'rgba(239,237,237,0.06)',
                            border: selectedDate === i ? 'none' : '1px solid rgba(239,237,237,0.1)',
                          }}
                        >
                          <div className="text-[9px] font-medium" style={{ color: selectedDate === i ? 'rgba(255,255,255,0.7)' : 'rgba(239,237,237,0.35)' }}>
                            {date.day}
                          </div>
                          <div className="text-[13px] font-bold" style={{ color: selectedDate === i ? '#fff' : 'rgba(239,237,237,0.6)' }}>
                            {date.num}
                          </div>
                          {i === 2 && <PreTapGlow show={autoPhase === 'date' && autoTap !== 'date'} />}
                          {i === 2 && <TapIndicator show={autoTap === 'date'} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="mb-2">
                    <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(239,237,237,0.4)' }}>Available times</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className="py-1.5 rounded-xl text-[11px] font-medium transition-all relative"
                          style={{
                            backgroundColor: selectedTime === slot.time
                              ? '#DA3743'
                              : slot.available
                                ? 'rgba(239,237,237,0.04)'
                                : 'rgba(239,237,237,0.02)',
                            border: selectedTime === slot.time
                              ? 'none'
                              : slot.available
                                ? '1px solid rgba(218,55,67,0.3)'
                                : '1px solid rgba(239,237,237,0.05)',
                            color: selectedTime === slot.time
                              ? '#fff'
                              : slot.available
                                ? 'rgba(239,237,237,0.6)'
                                : 'rgba(239,237,237,0.15)',
                            cursor: slot.available ? 'pointer' : 'default',
                          }}
                        >
                          {slot.time}
                          {slot.time === '7:00 PM' && <PreTapGlow show={autoPhase === 'time' && autoTap !== 'time'} />}
                          {slot.time === '7:00 PM' && <TapIndicator show={autoTap === 'time'} />}
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
                        <div className="text-[10px] text-center mb-2" style={{ color: 'rgba(239,237,237,0.4)' }}>{summaryText}</div>
                        <motion.button
                          onClick={handleConfirm}
                          disabled={confirming}
                          className="w-full py-3 rounded-xl text-white font-bold text-[12px] flex items-center justify-center gap-2 relative overflow-hidden"
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
                          <PreTapGlow show={autoPhase === 'confirm' && autoTap !== 'confirm'} />
                          <TapIndicator show={autoTap === 'confirm'} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Powered by */}
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#DA3743"><circle cx="12" cy="12" r="10" fill="none" stroke="#DA3743" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="#DA3743"/></svg>
                    <span className="text-[8px]" style={{ color: 'rgba(239,237,237,0.25)' }}>Powered by OpenTable</span>
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
                    className="text-[14px] font-bold mb-1"
                    style={{ color: '#efeded' }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Reservation Confirmed!
                  </motion.div>

                  <motion.div
                    className="text-[11px] text-center mb-3"
                    style={{ color: 'rgba(239,237,237,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {summaryText}
                  </motion.div>

                  <motion.div
                    className="text-[9px] mb-2"
                    style={{ color: 'rgba(239,237,237,0.3)' }}
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
                    <span className="text-[9px]" style={{ color: 'rgba(239,237,237,0.2)' }}>·</span>
                    <span className="text-[9px]" style={{ color: 'rgba(239,237,237,0.4)' }}>Full attribution tracked</span>
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
                    <span className="text-[8px]" style={{ color: 'rgba(239,237,237,0.25)' }}>Powered by OpenTable</span>
                  </motion.div>

                  <motion.div
                    className="mt-3 text-[8px]"
                    style={{ color: 'rgba(239,237,237,0.2)', animation: 'pulse 2s infinite' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
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
