import { motion, AnimatePresence } from 'framer-motion';
import { METRICS } from '../../data/constants';
import { AnimatedCounter } from '../AnimatedCounter';
import { useState } from 'react';

const tabs = ['Overview', 'Funnel', 'Revenue'];

function OverviewTab() {
  return (
    <>
      {/* Funnel */}
      <motion.div
        className="rounded-2xl p-4 mb-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Conversion Funnel</div>
        <div className="space-y-2">
          {METRICS.funnel.map((item, i) => {
            const maxVal = METRICS.funnel[0].value;
            const width = Math.max((item.value / maxVal) * 100, 8);
            const colors = ['#E4405F', '#F26B5B', '#DA3743', '#34C759'];
            return (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-400">{item.label}</span>
                  <span className="text-[11px] font-semibold text-white">{item.shortLabel}</span>
                </div>
                <div className="h-6 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <motion.div
                    className="h-full rounded-lg"
                    style={{ backgroundColor: colors[i] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: 'Profile Views', value: METRICS.profileViews, format: 'number' as const, icon: '👁️' },
          { label: 'OT Clicks', value: METRICS.openTableClicks, format: 'number' as const, icon: '🍽️' },
          { label: 'Reservations', value: METRICS.reservations, format: 'number' as const, icon: '✅' },
          { label: 'Conversion', value: METRICS.conversionRate, format: 'percent' as const, icon: '📈' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{metric.icon}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              <AnimatedCounter value={metric.value} format={metric.format} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Card */}
      <motion.div
        className="rounded-2xl p-4 mb-3"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-xs font-medium text-[#C9A84C] uppercase tracking-wider mb-1">Attributed Revenue</div>
        <div className="text-2xl font-bold text-white">
          <AnimatedCounter value={METRICS.attributedRevenue} format="currency" />
        </div>
        <div className="flex gap-4 mt-2">
          <div>
            <div className="text-[10px] text-gray-500">Avg Party</div>
            <div className="text-sm font-semibold text-white">{METRICS.avgPartySize}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">Avg Bill</div>
            <div className="text-sm font-semibold text-white">${METRICS.avgBill}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">ROI</div>
            <div className="text-sm font-semibold text-[#34C759]">847%</div>
          </div>
        </div>
      </motion.div>

      {/* Attribution Paths */}
      <motion.div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Top Attribution Paths</div>
        <div className="space-y-3">
          {METRICS.attributionPaths.map((path, i) => (
            <div key={path.path}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-gray-300">{path.path}</span>
                <span className="text-xs font-bold text-white">{path.percentage}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: path.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${path.percentage}%` }}
                  transition={{ duration: 0.8, delay: 1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function FunnelTab() {
  const funnelDetailed = [
    { stage: 'Instagram Impression', value: 77300, label: '77.3K', color: '#E4405F', rate: '100%' },
    { stage: 'Profile Click', value: 12847, label: '12.8K', color: '#F26B5B', rate: '16.6%' },
    { stage: 'Linkme Profile View', value: 3200, label: '3.2K', color: '#F7A828', rate: '24.9%' },
    { stage: 'OpenTable Widget Open', value: 2400, label: '2.4K', color: '#DA3743', rate: '75.0%' },
    { stage: 'Time Slot Selected', value: 2100, label: '2.1K', color: '#DA3743', rate: '87.5%' },
    { stage: 'Reservation Confirmed', value: 1893, label: '1.9K', color: '#34C759', rate: '90.1%' },
  ];

  return (
    <>
      <motion.div
        className="rounded-2xl p-4 mb-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Detailed Conversion Funnel</div>
        <div className="space-y-3">
          {funnelDetailed.map((item, i) => {
            const width = Math.max((item.value / funnelDetailed[0].value) * 100, 5);
            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-400">{item.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{item.rate}</span>
                    <span className="text-[11px] font-semibold text-white">{item.label}</span>
                  </div>
                </div>
                <div className="h-5 rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <motion.div
                    className="h-full rounded-md"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Drop-off analysis */}
      <motion.div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Drop-off Analysis</div>
        <div className="space-y-2.5">
          {[
            { from: 'Impression → Click', drop: '83.4%', insight: 'Standard for social media' },
            { from: 'Click → Profile View', drop: '75.1%', insight: 'Bio link engagement healthy' },
            { from: 'Profile → Widget Open', drop: '25.0%', insight: 'Strong CTA performance' },
            { from: 'Widget → Confirmed', drop: '21.1%', insight: 'Excellent booking completion' },
          ].map((item, i) => (
            <motion.div
              key={item.from}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <div>
                <div className="text-[11px] text-gray-300">{item.from}</div>
                <div className="text-[9px] text-gray-500">{item.insight}</div>
              </div>
              <span className="text-[11px] font-semibold text-[#DA3743]">{item.drop}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function RevenueTab() {
  const weeklyRevenue = [
    { week: 'Week 1', value: 28500, height: '45%' },
    { week: 'Week 2', value: 34200, height: '55%' },
    { week: 'Week 3', value: 38750, height: '62%' },
    { week: 'Week 4', value: 41300, height: '66%' },
  ];

  return (
    <>
      {/* Revenue overview */}
      <motion.div
        className="rounded-2xl p-4 mb-3"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs font-medium text-[#C9A84C] uppercase tracking-wider mb-1">Total Attributed Revenue</div>
        <div className="text-3xl font-bold text-white">
          <AnimatedCounter value={METRICS.attributedRevenue} format="currency" />
        </div>
        <div className="text-[11px] text-[#34C759] mt-1">↑ 23.4% vs previous month</div>
      </motion.div>

      {/* Weekly breakdown */}
      <motion.div
        className="rounded-2xl p-4 mb-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Weekly Revenue</div>
        <div className="flex items-end gap-3 h-[120px]">
          {weeklyRevenue.map((week, i) => (
            <div key={week.week} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-gray-400">${(week.value / 1000).toFixed(1)}K</span>
              <motion.div
                className="w-full rounded-t-lg"
                style={{ backgroundColor: '#C9A84C', height: week.height }}
                initial={{ height: 0 }}
                animate={{ height: week.height }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[9px] text-gray-500">{week.week}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: 'Avg Bill', value: '$75.50', sub: 'Per reservation' },
          { label: 'Avg Party', value: '3.2', sub: 'Guests per booking' },
          { label: 'Rev/Profile View', value: '$11.11', sub: 'Attribution value' },
          { label: 'ROI', value: '847%', sub: 'Return on investment', color: '#34C759' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</div>
            <div className="text-lg font-bold mt-0.5" style={{ color: metric.color || 'white' }}>{metric.value}</div>
            <div className="text-[9px] text-gray-600">{metric.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Top revenue sources */}
      <motion.div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Revenue by Source</div>
        <div className="space-y-2.5">
          {[
            { source: 'Instagram → Linkme', rev: '$97,070', pct: '68%', color: '#DA3743' },
            { source: 'Direct → Linkme', rev: '$32,833', pct: '23%', color: '#C9A84C' },
            { source: 'Other Sources', rev: '$12,848', pct: '9%', color: '#636366' },
          ].map((item, i) => (
            <motion.div
              key={item.source}
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.08 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-gray-300">{item.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-white">{item.rev}</span>
                <span className="text-[10px] text-gray-500">{item.pct}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export function AttributionDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #0F1419 0%, #0a0e12 100%)' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-[58px] pb-2">
        <span className="text-xs font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="6" width="3" height="6" rx="0.5"/><rect x="4.5" y="4" width="3" height="8" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fillOpacity="0.3"/></svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="white"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 10 1.5 7.5 1.5C5 1.5 2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z"/><path d="M7.5 7C8.6 7 9.6 7.4 10.4 8.1L11.8 6.7C10.6 5.6 9.1 5 7.5 5C5.9 5 4.4 5.6 3.2 6.7L4.6 8.1C5.4 7.4 6.4 7 7.5 7Z"/><circle cx="7.5" cy="10.5" r="1.5"/></svg>
          <div className="w-[22px] h-[11px] rounded-[3px] border border-white/30 relative">
            <div className="absolute inset-[1.5px] right-[3px] bg-white rounded-[1px]"/>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="gradient-text-linkme text-sm font-bold">linkme</span>
          <span className="text-gray-600 text-xs">×</span>
          <span className="text-[#DA3743] text-sm font-bold">OpenTable</span>
        </div>
        <h1 className="text-lg font-bold text-white mt-1">Attribution Dashboard</h1>
        <div className="text-xs text-gray-500 mt-0.5">CLAUDIE Miami · Last 30 days</div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-5 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === tab ? '#C9A84C' : '#636366',
              border: activeTab === tab ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-6" style={{ scrollbarWidth: 'none' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'Overview' && <OverviewTab />}
            {activeTab === 'Funnel' && <FunnelTab />}
            {activeTab === 'Revenue' && <RevenueTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
