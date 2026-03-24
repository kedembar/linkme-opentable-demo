import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { SidePanel } from './components/layout/SidePanel';
import { BottomMetrics } from './components/layout/BottomMetrics';
import { InstagramProfile } from './components/steps/InstagramProfile';
import { LinkmeProfile } from './components/steps/LinkmeProfile';
import { AttributionDashboard } from './components/steps/AttributionDashboard';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 3) setCurrentStep(step);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentStep((s) => Math.min(s + 1, 3));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentStep((s) => Math.max(s - 1, 1));
      } else if (e.key === 'r' || e.key === 'R') {
        setCurrentStep(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InstagramProfile onNext={() => goToStep(2)} />;
      case 2:
        return <LinkmeProfile onNext={() => goToStep(3)} />;
      case 3:
        return <AttributionDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 text-center pt-4 pb-2 px-4 bg-bg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="gradient-text-linkme text-2xl font-bold tracking-tight">linkme</span>
          <span className="text-text-muted text-xl font-light">×</span>
          <span className="text-ot-red text-2xl font-bold tracking-tight">OpenTable</span>
        </div>
        <h1 className="text-sm text-text-secondary font-medium tracking-wide">
          Full Attribution Journey & Revenue Tracking Demo
        </h1>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center gap-12 px-8 pb-4 pt-[72px]">
        {/* Side panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SidePanel currentStep={currentStep} />
        </motion.div>

        {/* Phone + nav buttons */}
        <div className="flex items-center gap-4" style={{ transform: 'scale(0.85)', transformOrigin: 'center center', margin: '-20px 0' }}>
          {/* Back button */}
          <div className="w-[60px] flex justify-end">
            {currentStep > 1 && (
              <motion.button
                onClick={() => setCurrentStep((s) => Math.max(s - 1, 1))}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-muted hover:text-text hover:bg-black/5 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PhoneFrame step={currentStep}>
              {renderStep()}
            </PhoneFrame>
          </motion.div>

          {/* Next / Restart button */}
          <div className="w-[60px]">
            {currentStep < 3 ? (
              <motion.button
                onClick={() => setCurrentStep((s) => Math.min(s + 1, 4))}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-muted hover:text-text hover:bg-black/5 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setCurrentStep(1)}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-muted hover:text-text hover:bg-black/5 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Right spacer for centering (optional info panel) */}
        <motion.div
          className="w-[280px] flex-shrink-0 hidden xl:flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Quick stats that appear based on progress */}
          {currentStep >= 2 && (
            <motion.div
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-xs text-text-muted uppercase tracking-widest font-medium mb-3">Partnership Value</div>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-text">$142,750</div>
                  <div className="text-xs text-text-muted">Monthly attributed revenue</div>
                </div>
                <div className="h-px bg-border-subtle" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm font-bold text-success">58.4%</div>
                    <div className="text-[10px] text-text-muted">Conversion rate</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-noor-gold">847%</div>
                    <div className="text-[10px] text-text-muted">ROI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep >= 3 && (
            <motion.div
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs text-text-muted uppercase tracking-widest font-medium mb-3">Why This Matters</div>
              <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <p>Currently, restaurants lose attribution when diners move from social media to booking platforms.</p>
                <p className="text-noor-gold font-medium">Linkme bridges this gap — providing end-to-end tracking from discovery to reservation.</p>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xs text-text-muted uppercase tracking-widest font-medium mb-3">Key Takeaway</div>
              <p className="text-sm text-text leading-relaxed">
                Every reservation through this flow is <span className="text-success font-semibold">fully attributed</span> — from the Instagram page to the confirmed table. With <span className="text-[#DA3743] font-semibold">OpenTable</span> and <span className="gradient-text-linkme font-semibold">linkme</span>.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom metrics */}
      <motion.div
        className="px-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <BottomMetrics currentStep={currentStep} />
      </motion.div>

      {/* Keyboard hint */}
      <div className="fixed bottom-4 right-4 text-[10px] text-text-muted/40 hidden lg:block">
        ← → Arrow keys to navigate · R to restart
      </div>
    </div>
  );
}

export default App;
