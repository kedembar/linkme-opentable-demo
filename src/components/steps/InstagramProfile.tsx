import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const HIGHLIGHTS = [
  { label: 'LUNCH', img: '/images/food1.jpg' },
  { label: 'DINNER', img: '/images/interior2.jpg' },
  { label: 'BRUNCH', img: '/images/brunch.jpg' },
  { label: 'EVENTS', img: '/images/interior3.jpg' },
  { label: 'PRESS', img: '/images/interior4.jpg' },
  { label: 'BEST OF', img: '/images/food3.jpg' },
];

const GRID_PHOTOS = [
  '/images/food1.jpg',
  '/images/interior1.jpg',
  '/images/food2.jpg',
  '/images/interior2.jpg',
  '/images/food3.jpg',
  '/images/brunch.jpg',
  '/images/food4.jpg',
  '/images/interior3.jpg',
  '/images/food5.jpg',
];

export function InstagramProfile({ onNext }: Props) {
  return (
    <div className="bg-white text-black min-h-full flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-[58px] pb-2 bg-white">
        <span className="text-xs font-semibold text-black">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#1a1a1a"><rect x="0" y="6" width="3" height="6" rx="0.5"/><rect x="4.5" y="4" width="3" height="8" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fillOpacity="0.3"/></svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="#1a1a1a"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 10 1.5 7.5 1.5C5 1.5 2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z"/><path d="M7.5 7C8.6 7 9.6 7.4 10.4 8.1L11.8 6.7C10.6 5.6 9.1 5 7.5 5C5.9 5 4.4 5.6 3.2 6.7L4.6 8.1C5.4 7.4 6.4 7 7.5 7Z"/><circle cx="7.5" cy="10.5" r="1.5"/></svg>
          <div className="w-[22px] h-[11px] rounded-[3px] border border-gray-400 relative">
            <div className="absolute inset-[1.5px] right-[3px] bg-gray-900 rounded-[1px]"/>
          </div>
        </div>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-white">
        <div className="flex items-center gap-1">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L2 6l5 5" strokeWidth="1.5" stroke="#262626" fill="none"/></svg>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-[#262626]">claudierestaurant</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#3897F0"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>
        </div>
        <div className="flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </div>
      </div>

      {/* Profile section */}
      <div className="px-4 pt-3">
        <div className="flex items-start gap-5">
          {/* Avatar with story ring - Instagram gradient */}
          <div className="relative flex-shrink-0">
            <div className="w-[86px] h-[86px] rounded-full p-[3px]" style={{ background: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)' }}>
              <div className="w-full h-full rounded-full p-[2px] bg-white">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/images/profile.png"
                    alt="CLAUDIE Miami"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-1 justify-around pt-2">
            {[
              { num: '284', label: 'posts' },
              { num: '77.3K', label: 'followers' },
              { num: '892', label: 'following' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[15px] font-bold text-[#262626]">{stat.num}</div>
                <div className="text-[13px] text-[#262626]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Name & bio */}
        <div className="mt-3">
          <div className="text-[13px] font-semibold text-[#262626]">CLAUDIE Miami</div>
          <div className="text-[13px] text-[#8e8e8e]">Restaurant</div>
          <div className="text-[13px] mt-0.5 leading-[1.35] text-[#262626]">
            Bringing Mediterranean cuisine<br/>
            from the South of France to Miami.<br/>
            Open Everyday
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00376B" strokeWidth="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6v6M20 4L10 14"/></svg>
            <motion.button
              onClick={onNext}
              className="text-[13px] font-medium text-[#00376B]"
              whileTap={{ scale: 0.95 }}
              animate={{
                textShadow: [
                  '0 0 0px rgba(0,55,107,0)',
                  '0 0 8px rgba(0,55,107,0.4)',
                  '0 0 0px rgba(0,55,107,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              link.me/claudierestaurant
            </motion.button>
          </div>
        </div>

        {/* Followed by */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex -space-x-2">
            <div className="w-[18px] h-[18px] rounded-full border border-white overflow-hidden">
              <img src="/images/ig-profile.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[18px] h-[18px] rounded-full border border-white overflow-hidden">
              <img src="/images/fb-profile.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border border-white" />
          </div>
          <div className="text-[11px] text-[#262626]">
            Followed by <span className="font-semibold">friends</span> + 30 more
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5 mt-3.5">
          <button className="flex-1 bg-[#0095F6] text-white text-[13px] font-semibold py-[7px] rounded-lg">
            Follow
          </button>
          <button className="flex-1 bg-[#EFEFEF] text-[#262626] text-[13px] font-semibold py-[7px] rounded-lg border border-[#DBDBDB]">
            Message
          </button>
          <button className="bg-[#EFEFEF] text-[#262626] px-3 py-[7px] rounded-lg border border-[#DBDBDB]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
          </button>
        </div>
      </div>

      {/* Story highlights */}
      <div className="flex gap-4 px-4 mt-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-[64px] h-[64px] rounded-full border border-[#DBDBDB] p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={h.img} alt={h.label} className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-[11px] text-[#262626]">{h.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-t border-[#DBDBDB] mt-1">
        <div className="flex-1 py-2.5 flex justify-center border-b-[1.5px] border-[#262626]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#262626"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
        </div>
        <div className="flex-1 py-2.5 flex justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#8e8e8e"><path d="M3 5v14l8-7-8-7zm10 0v14l8-7-8-7z"/></svg>
        </div>
        <div className="flex-1 py-2.5 flex justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#8e8e8e"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-6-3.22c.03-2 4-3.08 6-3.08s5.97 1.1 6 3.08A7.2 7.2 0 0112 19.2z"/></svg>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-[1px] bg-[#DBDBDB]">
        {GRID_PHOTOS.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden bg-white">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="sticky bottom-0 bg-white border-t border-[#DBDBDB] flex items-center justify-around py-2.5 px-4 mt-auto">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#262626"><path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5"><path d="M3 5v14l8-7-8-7zm10 0v14l8-7-8-7z"/></svg>
        <div className="w-6 h-6 rounded-full overflow-hidden border border-[#DBDBDB]">
          <img src="/images/ig-profile.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
