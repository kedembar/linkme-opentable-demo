import { motion } from 'framer-motion';
import { useState } from 'react';
import { EmbeddedBooking } from './EmbeddedBooking';

interface Props {
  onNext: () => void;
}

const socialIcons = [
  { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/claudierestaurant', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { name: 'Facebook', color: '#1877F2', url: 'https://www.facebook.com/claudiemiami', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { name: 'Spotify', color: '#1DB954', url: 'https://open.spotify.com/playlist/3bGVciOvL0CdyLh7DCy6XD', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
  )},
  { name: 'YouTube', color: '#FF0000', url: 'https://www.youtube.com/@claudierestaurant', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
];

const photoCards = [
  { label: 'Join us For Lunch', img: '/images/food1.jpg' },
  { label: 'Easter Dinner', img: '/images/dinner.jpg' },
  { label: "Mother's Day Brunch", img: '/images/brunch.jpg' },
  { label: 'Reserve Prefix Dinner', img: '/images/food2.jpg' },
];

export function LinkmeProfile({ onNext }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden">
      {/* Blurred background image - full page */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: 'blur(30px) brightness(0.6) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(36,29,19,0.4)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-full">
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

        {/* Hero image - large and prominent */}
        <div className="mx-3 rounded-2xl overflow-hidden relative" style={{ height: '240px' }}>
          <img
            src="/images/profile.png"
            alt="CLAUDIE Miami"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(36,29,19,0.4) 70%, rgba(36,29,19,0.85) 100%)' }} />
        </div>

        {/* Profile section */}
        <div className="flex flex-col items-center px-6 pt-4">
          {/* Name + verified */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-[20px] font-bold text-white tracking-wide">CLAUDIE Miami</h1>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#5AC8FA"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>
          </motion.div>

          {/* Handle */}
          <motion.div
            className="text-[13px] text-white/50 mt-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            @claudierestaurant
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex gap-2 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                style={{ backgroundColor: social.color }}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* Follower badge */}
          <motion.div
            className="flex items-center gap-1.5 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <span className="text-[13px] font-semibold text-white">77.3K</span>
            <span className="text-[13px] text-white/60">Total Followers</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white" fillOpacity="0.5"><path d="M3 4l2 2 2-2"/></svg>
          </motion.div>

          {/* Bio - matching the natural flow from the screenshot */}
          <motion.div
            className="text-center mt-4 text-[14px] text-white leading-[1.5] max-w-[260px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Bringing Mediterranean cuisine from the South of France to Miami.<br/>
            <span className="text-white/50">Open Everyday</span>
          </motion.div>
        </div>

        {/* Photo link cards */}
        <div className="px-3 mt-5 space-y-3">
          {/* Reserve with OpenTable - PRIMARY CTA */}
          <motion.button
            onClick={() => setBookingOpen(!bookingOpen)}
            className="w-full relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/10' }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <img
              src="/images/interior1.jpg"
              alt="Reserve with OpenTable"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)' }} />
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(218,55,67,0.35)' }} />
            {/* Red circle indicator */}
            <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#DA3743] flex items-center justify-center shadow-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
                <span className="text-white font-bold text-[15px] drop-shadow-lg">Reserve with OpenTable</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-white/40 text-[10px]">Powered by OpenTable</span>
              </div>
            </div>
          </motion.button>

          {/* Embedded OpenTable Booking Widget */}
          <EmbeddedBooking isOpen={bookingOpen} onConfirmed={onNext} />

          {/* Other photo cards */}
          {photoCards.map((card, i) => (
            <motion.a
              key={card.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="block w-full relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: '16/10' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <img
                src={card.img}
                alt={card.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)' }} />
              {/* OpenTable red circle indicator */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#DA3743] flex items-center justify-center shadow-lg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white font-bold text-[15px] text-center drop-shadow-lg">{card.label}</div>
              </div>
            </motion.a>
          ))}

          {/* Two-column cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Private Events', img: '/images/interior3.jpg' },
              { label: 'Book RDG Venues', img: '/images/interior4.jpg' },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)' }} />
                <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#DA3743] flex items-center justify-center shadow-lg">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-semibold text-[13px] text-center drop-shadow-lg">{card.label}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Another two-column row */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Discover Membership', img: '/images/food4.jpg' },
              { label: 'Join Our Team', img: '/images/food5.jpg' },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)' }} />
                <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#DA3743] flex items-center justify-center shadow-lg">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="white"/></svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-semibold text-[13px] text-center drop-shadow-lg">{card.label}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 pb-8 text-center">
          <span className="text-[10px] text-white/30">Powered by </span>
          <span className="text-[10px] font-bold gradient-text-linkme">linkme</span>
        </div>
      </div>
    </div>
  );
}
