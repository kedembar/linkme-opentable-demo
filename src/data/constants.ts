export const STEPS = [
  {
    id: 1,
    title: 'Instagram Discovery',
    description: 'A potential diner discovers MILA Miami Beach on Instagram and taps the link in bio.',
    tracking: 'Source: Instagram @milagroup_miami',
    trackingNodes: ['Instagram'],
  },
  {
    id: 2,
    title: 'Linkme Profile & Booking',
    description: 'The Linkme profile showcases MILA\'s brand with embedded OpenTable booking — the user never leaves.',
    tracking: 'Instagram → Linkme → OpenTable (tracked)',
    trackingNodes: ['Instagram', 'Linkme', 'OpenTable'],
  },
  {
    id: 3,
    title: 'Full Attribution',
    description: 'Complete end-to-end attribution from social discovery to confirmed reservation.',
    tracking: 'Full Attribution: Instagram → Linkme → OpenTable → Reservation Confirmed',
    trackingNodes: ['Instagram', 'Linkme', 'OpenTable', 'Reservation'],
  },
] as const;

export const METRICS = {
  profileViews: 12847,
  openTableClicks: 3241,
  reservations: 1893,
  conversionRate: 58.4,
  attributedRevenue: 142750,
  avgPartySize: 3.2,
  avgBill: 75.50,
  funnel: [
    { label: 'Instagram Reach', value: 215000, shortLabel: '215K' },
    { label: 'Linkme Profile', value: 3200, shortLabel: '3.2K' },
    { label: 'OpenTable Click', value: 1900, shortLabel: '1.9K' },
    { label: 'Confirmed', value: 1800, shortLabel: '1.8K' },
  ],
  attributionPaths: [
    { path: 'Instagram → Linkme → OpenTable', percentage: 68, color: '#DA3743' },
    { path: 'Direct → Linkme → OpenTable', percentage: 23, color: '#C9A84C' },
    { path: 'Other Sources', percentage: 9, color: '#636366' },
  ],
};

export const HIGHLIGHTS = ['LUNCH', 'DINNER', 'BRUNCH', 'EVENTS', 'PRESS'];

export const FOOD_IMAGES = [
  'linear-gradient(135deg, #8B6914 0%, #2C1810 50%, #C9A84C 100%)',
  'linear-gradient(135deg, #1a0a00 0%, #4a2010 50%, #8B4513 100%)',
  'linear-gradient(135deg, #2C1810 0%, #C9A84C 50%, #8B6914 100%)',
  'linear-gradient(135deg, #4a2010 0%, #1a0a00 50%, #2C1810 100%)',
  'linear-gradient(135deg, #C9A84C 0%, #8B6914 50%, #4a2010 100%)',
  'linear-gradient(135deg, #1a0a00 0%, #2C1810 50%, #C9A84C 100%)',
  'linear-gradient(135deg, #8B4513 0%, #C9A84C 50%, #1a0a00 100%)',
  'linear-gradient(135deg, #2C1810 0%, #4a2010 50%, #8B6914 100%)',
  'linear-gradient(135deg, #C9A84C 0%, #1a0a00 50%, #4a2010 100%)',
];
