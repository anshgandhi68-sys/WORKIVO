import { ServiceItem, Worker, TimeSlot, CalendarDay, AddressInfo } from '../types';

export const TRADES = [
  { id: 'all', label: 'All Trades', icon: 'Grid' },
  { id: 'cooking', label: 'Cooking & Meals', icon: 'Utensils' },
  { id: 'cleaning', label: 'Cleaning & Housekeeping', icon: 'Sparkles' },
  { id: 'salon', label: 'Manicure & Pedicure', icon: 'Heart' },
  { id: 'electrical', label: 'Electrical & Wiring', icon: 'Zap' },
  { id: 'plumbing', label: 'Plumbing & Water', icon: 'Droplets' },
  { id: 'carpentry', label: 'Carpentry & Wood', icon: 'Hammer' },
  { id: 'appliance', label: 'Appliance Care', icon: 'Tv' },
  { id: 'painting', label: 'Painting & Walls', icon: 'Palette' },
] as const;

export const SERVICES: ServiceItem[] = [
  // --- 1. COOKING & MEAL PREP ---
  {
    id: 'daily-home-cooking',
    title: 'Daily Homestyle Cooking & Meal Prep',
    category: 'cooking',
    description: 'Fresh lunch or dinner cooked at your home. Roti, rice, dal, 2 sabzis, and fresh salad customized to your spice preference.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Most Popular',
      variant: 'recommended'
    },
    isRecommended: true
  },
  {
    id: 'batch-meal-cooking',
    title: 'North & South Indian Meal Batch Prep',
    category: 'cooking',
    description: 'Batch prep for the week: idli/dosa batter, sambar, curries, chapati dough, and vacuum/container storage.',
    price: 199,
    priceUnit: 'fixed package',
    estimatedDuration: '2-3 hrs',
    badge: {
      text: 'Weekly Plan',
      variant: 'fixed'
    }
  },
  {
    id: 'diet-healthy-cooking',
    title: 'Healthy Diet & Low-Oil Meal Cooking',
    category: 'cooking',
    description: 'Keto, diabetic-friendly, high-protein, or Jain meals prepared with hygienic, weighed ingredients.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Special Diet',
      variant: 'standard'
    }
  },
  {
    id: 'festive-feast-cooking',
    title: 'Festive Feast & Family Gathering Cooking',
    category: 'cooking',
    description: 'Multi-course home feast for up to 8 guests: biryani/pulao, paneer/chicken gravy, appetizers, and dessert.',
    price: 249,
    priceUnit: 'fixed package',
    estimatedDuration: '2-4 hrs',
    badge: {
      text: 'Event Special',
      variant: 'priority'
    }
  },

  // --- 2. CLEANING & HOUSEKEEPING ---
  {
    id: 'bathroom-deep-cleaning',
    title: 'Bathroom Deep Scrubbing & Tile Descaling',
    category: 'cleaning',
    description: 'Hard-water stain removal, toilet sanitizer scrub, mirror polish, floor grout cleaning, and exhaust fan wipe.',
    price: 149,
    priceUnit: 'fixed per unit',
    estimatedDuration: '45-60 mins',
    badge: {
      text: 'Top Rated',
      variant: 'recommended'
    },
    isRecommended: true
  },
  {
    id: 'kitchen-degreasing',
    title: 'Kitchen Chimney & Counter Degreasing',
    category: 'cleaning',
    description: 'Removal of sticky oil residue from stove, tiles, chimney filters, sink basin, and countertop polish.',
    price: 199,
    priceUnit: 'fixed package',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Deep Clean',
      variant: 'fixed'
    }
  },
  {
    id: 'full-home-cleaning',
    title: 'Full Home Deep Sanitization (1BHK/2BHK)',
    category: 'cleaning',
    description: 'Cobweb removal, fan/window dry & wet wipe, balcony wash, deep floor vacuuming and organic surface disinfectant.',
    price: 349,
    priceUnit: 'fixed package',
    estimatedDuration: '3-4 hrs',
    badge: {
      text: 'Best Value',
      variant: 'standard'
    }
  },
  {
    id: 'regular-housekeeping-visit',
    title: 'Regular Housekeeping & Mopping (Every Saturday / Weekly)',
    category: 'cleaning',
    description: 'Complete floor sweeping, antiseptic mopping, dusting of furniture, bed making, and waste disposal.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Weekly Favorite',
      variant: 'hourly'
    }
  },

  // --- 3. MANICURE, PEDICURE & SALON AT HOME ---
  {
    id: 'classic-manicure',
    title: 'Classic Express Manicure at Home',
    category: 'salon',
    description: 'Nail shaping, warm cuticle soak, cuticle trimming, exfoliating hand scrub, relaxing massage, and nail polish.',
    price: 149,
    priceUnit: 'fixed package',
    estimatedDuration: '30-40 mins',
    badge: {
      text: 'Essential',
      variant: 'recommended'
    },
    isRecommended: true
  },
  {
    id: 'spa-pedicure',
    title: 'Herbal Spa Pedicure with Foot Massage',
    category: 'salon',
    description: 'Epsom salt soak, heel pumice & callus buffing, aromatic lavender scrub, 15-minute pressure point massage, and polish.',
    price: 199,
    priceUnit: 'fixed package',
    estimatedDuration: '45-60 mins',
    badge: {
      text: 'Spa Relax',
      variant: 'fixed'
    }
  },
  {
    id: 'deluxe-mani-pedi-duo',
    title: 'Deluxe Mani-Pedi Complete Duo Package',
    category: 'salon',
    description: 'Full pampering session: Organic brightening hand & foot pack, deep scrub, dead skin removal, and salon-grade polish.',
    price: 299,
    priceUnit: 'fixed package',
    estimatedDuration: '75-90 mins',
    badge: {
      text: 'Combo Savings',
      variant: 'priority'
    }
  },
  {
    id: 'nail-art-polish-care',
    title: 'Nail Art, Cuticle Care & Gel Polish',
    category: 'salon',
    description: 'Cuticle hydration treatment, long-lasting gel polish application, and accent nail art designs.',
    price: 149,
    priceUnit: 'fixed package',
    estimatedDuration: '30-45 mins',
    badge: {
      text: 'Nail Art',
      variant: 'standard'
    }
  },

  // --- 4. ELECTRICAL (Affordable Living-Wage Rates) ---
  {
    id: 'rewiring-load-balancing',
    title: 'Residential Fan, Switch & MCB Repair',
    category: 'electrical',
    description: 'Comprehensive diagnostics, switchboard repair, MCB tripping check, and safety earthing test.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Recommended',
      variant: 'recommended'
    },
    isRecommended: true
  },
  {
    id: 'ceiling-fan-fitting',
    title: 'Ceiling Fan & Light Fixture Fitting',
    category: 'electrical',
    description: 'Anchor bolt drilling, downrod assembly, balancing blades, and safety hook rigging.',
    price: 149,
    priceUnit: 'fixed per unit',
    estimatedDuration: '30-45 mins',
    badge: {
      text: 'Quick Fix',
      variant: 'standard'
    }
  },
  {
    id: 'emergency-short-circuit',
    title: 'Emergency Short-Circuit Isolation',
    category: 'electrical',
    description: 'Immediate hazard containment, phase separation, and burnt conductor bypass.',
    price: 149,
    priceUnit: 'diagnostic',
    estimatedDuration: 'Avg 20 min arrival',
    arrivalNotice: 'Avg 20 min arrival',
    badge: {
      text: 'Priority',
      variant: 'priority'
    }
  },
  {
    id: 'inverter-battery',
    title: 'Inverter & Battery Backup Setup',
    category: 'electrical',
    description: 'Pure sinewave setup & modular rack installation, battery acid checks, heavy load sync.',
    price: 249,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Hourly',
      variant: 'hourly'
    }
  },
  {
    id: 'smart-home-switchboard',
    title: 'Smart Switchboard & Wi-Fi Automation',
    category: 'electrical',
    description: 'Retrofit micro-relay setup behind plates, neutral wire routing, and Wi-Fi sync.',
    price: 299,
    priceUnit: 'fixed package',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Smart Home',
      variant: 'smart'
    }
  },
  {
    id: 'ev-wallbox',
    title: 'EV Home Wallbox Installation',
    category: 'electrical',
    description: 'Dedicated wallbox setup, industrial isolator switch, earthing certification.',
    price: 499,
    priceUnit: 'fixed package',
    estimatedDuration: '2-3 hrs',
    badge: {
      text: 'Package',
      variant: 'fixed'
    }
  },

  // --- 5. PLUMBING (Affordable Rates) ---
  {
    id: 'plumbing-leak-repair',
    title: 'Tap Leak, Valve & Pipe Joint Repair',
    category: 'plumbing',
    description: 'Washer replacement, mixer cartridge fitting, Teflon sealing, and pressure leak check.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1 hr estimated',
    badge: {
      text: 'Quick Fix',
      variant: 'recommended'
    }
  },
  {
    id: 'drain-clog-clearance',
    title: 'Sink & Drain Clog Clearance',
    category: 'plumbing',
    description: 'Rotary spiral cable drain unclogging, hair trap flush, and odor seal replacement.',
    price: 179,
    priceUnit: 'fixed package',
    estimatedDuration: '30-45 mins',
    badge: {
      text: 'Priority',
      variant: 'priority'
    }
  },
  {
    id: 'geyser-service',
    title: 'Geyser & Water Heater Inspection',
    category: 'plumbing',
    description: 'Thermostat testing, heating coil descaling, pressure release valve check.',
    price: 199,
    priceUnit: 'fixed package',
    estimatedDuration: '1 hr',
    badge: {
      text: 'Safety Audit',
      variant: 'standard'
    }
  },

  // --- 6. CARPENTRY ---
  {
    id: 'carpentry-furniture-repair',
    title: 'Door Latch, Hinge & Drawer Realignment',
    category: 'carpentry',
    description: 'Hydraulic hinge mounting, magnetic catch fix, wooden door trimming and plane smooth.',
    price: 149,
    priceUnit: '/hr',
    estimatedDuration: '1-2 hrs estimated',
    badge: {
      text: 'Standard',
      variant: 'standard'
    }
  },
  {
    id: 'furniture-assembly',
    title: 'Modular Furniture & Shelf Assembly',
    category: 'carpentry',
    description: 'Bed frame, study desk, bookshelf, and IKEA/Urban Ladder furniture assembly.',
    price: 249,
    priceUnit: 'fixed package',
    estimatedDuration: '1-2 hrs',
    badge: {
      text: 'Package',
      variant: 'fixed'
    }
  }
];

export const WORKERS: Worker[] = [
  // --- Cooking Artisans ---
  {
    id: 'radha-murthy',
    name: 'Radha Murthy',
    initials: 'RM',
    title: 'Master Home Cook & Chef',
    tradeCategory: 'cooking',
    guildPartner: 'Karnataka Culinary Guild #408',
    rating: 4.95,
    reviewCount: 342,
    jobsDone: 480,
    experienceYears: 12,
    distanceKm: 1.8,
    hubLocation: 'Indiranagar Hub',
    skills: ['South Indian', 'North Indian', 'Sattvic/Jain', 'Roti Soft Prep'],
    earliestSlotText: 'Tomorrow 7:30 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Top Rated Cook',
      variant: 'selected'
    }
  },
  {
    id: 'kavita-rao',
    name: 'Chef Kavita Rao',
    initials: 'KR',
    title: 'Homestyle & Diet Meal Specialist',
    tradeCategory: 'cooking',
    guildPartner: 'Cooperative Kitchen Circle',
    rating: 4.88,
    reviewCount: 215,
    jobsDone: 310,
    experienceYears: 8,
    distanceKm: 2.7,
    hubLocation: 'Koramangala Hub',
    skills: ['Healthy Low-Oil', 'Diabetic Meals', 'Batch Curries', 'Breakfasts'],
    earliestSlotText: 'Tomorrow 8:00 AM',
    hourlyRate: 169,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Diet Specialist',
      variant: 'member'
    }
  },

  // --- Cleaning Artisans ---
  {
    id: 'sunita-bai',
    name: 'Sunita Bai',
    initials: 'SB',
    title: 'Senior Housekeeping & Deep Clean Lead',
    tradeCategory: 'cleaning',
    guildPartner: 'Domestic Care Co-op #408',
    rating: 4.92,
    reviewCount: 418,
    jobsDone: 620,
    experienceYears: 11,
    distanceKm: 1.5,
    hubLocation: 'Indiranagar Hub',
    skills: ['Bathroom Scrubbing', 'Kitchen Degrease', 'Full Home Mop', 'Tile Polish'],
    earliestSlotText: 'Tomorrow 8:00 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Co-op Clean Lead',
      variant: 'selected'
    }
  },
  {
    id: 'lakshmi-devi',
    name: 'Lakshmi Devi',
    initials: 'LD',
    title: 'Hospitality-Trained Housekeeper',
    tradeCategory: 'cleaning',
    guildPartner: 'Civic Sanitation Guild',
    rating: 4.85,
    reviewCount: 194,
    jobsDone: 290,
    experienceYears: 6,
    distanceKm: 2.9,
    hubLocation: 'Domlur Hub',
    skills: ['Eco-Sanitization', 'Weekly Mopping', 'Balcony Wash', 'Organizing'],
    earliestSlotText: 'Tomorrow 9:00 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Eco Certified',
      variant: 'member'
    }
  },

  // --- Manicure & Pedicure Artisans ---
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    initials: 'PS',
    title: 'Certified Aesthetician & Nail Artist',
    tradeCategory: 'salon',
    guildPartner: 'Artisan Wellness Guild #408',
    rating: 4.96,
    reviewCount: 285,
    jobsDone: 420,
    experienceYears: 7,
    distanceKm: 2.1,
    hubLocation: 'Indiranagar Hub',
    skills: ['Spa Pedicure', 'French Manicure', 'Cuticle Therapy', 'Foot Massage'],
    earliestSlotText: 'Tomorrow 10:00 AM',
    hourlyRate: 179,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Nail Specialist',
      variant: 'selected'
    }
  },
  {
    id: 'ananya-sen',
    name: 'Ananya Sen',
    initials: 'AS',
    title: 'Wellness & Spa Pedicurist',
    tradeCategory: 'salon',
    guildPartner: 'Co-op Beauty Collective',
    rating: 4.89,
    reviewCount: 168,
    jobsDone: 240,
    experienceYears: 5,
    distanceKm: 3.4,
    hubLocation: 'Koramangala Hub',
    skills: ['Herbal Foot Spa', 'Hand Exfoliation', 'Gel Polish', 'Organic Packs'],
    earliestSlotText: 'Tomorrow 11:30 AM',
    hourlyRate: 189,
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Spa Therapist',
      variant: 'member'
    }
  },

  // --- Electrical Artisans ---
  {
    id: 'ravi-kumar',
    name: 'Ravi Kumar',
    initials: 'RK',
    title: 'Master Electrician',
    tradeCategory: 'electrical',
    guildPartner: 'Guild Equity Partner #408',
    rating: 4.8,
    reviewCount: 142,
    jobsDone: 318,
    experienceYears: 9,
    distanceKm: 2.4,
    hubLocation: 'Bengaluru Hub #408',
    skills: ['Inverter', 'Tripping', 'Industrial Relays'],
    earliestSlotText: 'Tomorrow 8:00 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Selected Co-owner',
      variant: 'selected'
    }
  },
  {
    id: 'suresh-gowda',
    name: 'Suresh Gowda',
    initials: 'SG',
    title: 'Senior Wireman & Switch Specialist',
    tradeCategory: 'electrical',
    guildPartner: 'Guild Equity Partner #312',
    rating: 4.9,
    reviewCount: 198,
    jobsDone: 310,
    experienceYears: 8,
    distanceKm: 3.2,
    hubLocation: 'Indiranagar Hub',
    skills: ['MCB Repair', 'Earthing', 'Fan Fixture'],
    earliestSlotText: 'Tomorrow 9:30 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Co-owner Member',
      variant: 'member'
    }
  },

  // --- Plumbing Artisans ---
  {
    id: 'ramesh-varma',
    name: 'Ramesh Varma',
    initials: 'RV',
    title: 'Master Plumber',
    tradeCategory: 'plumbing',
    guildPartner: 'Bengaluru Water Guild #408',
    rating: 4.85,
    reviewCount: 230,
    jobsDone: 390,
    experienceYears: 10,
    distanceKm: 2.8,
    hubLocation: 'Bengaluru Hub #408',
    skills: ['Tap Leaks', 'Drain Clearance', 'Geyser Piping'],
    earliestSlotText: 'Tomorrow 8:30 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Senior Co-owner',
      variant: 'senior'
    }
  },

  // --- Carpentry Artisans ---
  {
    id: 'manjunath-shetty',
    name: 'Manjunath Shetty',
    initials: 'MS',
    title: 'Master Woodcraft Artisan',
    tradeCategory: 'carpentry',
    guildPartner: 'Karnataka Wood Guild',
    rating: 4.88,
    reviewCount: 175,
    jobsDone: 260,
    experienceYears: 11,
    distanceKm: 3.5,
    hubLocation: 'Koramangala Hub',
    skills: ['Door Latches', 'Hydraulic Hinges', 'Shelf Assembly'],
    earliestSlotText: 'Tomorrow 10:00 AM',
    hourlyRate: 149,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badge: {
      text: 'Craftsman',
      variant: 'member'
    }
  }
];

export const CALENDAR_DAYS: CalendarDay[] = [
  {
    dayName: 'Mon',
    dateNumber: 13,
    month: 'October',
    year: 2025,
    slotStatusText: 'Available',
    isFull: false,
    isAvailable: true
  },
  {
    dayName: 'Tue',
    dateNumber: 14,
    month: 'October',
    year: 2025,
    slotStatusText: '2 left',
    isFull: false,
    isAvailable: true
  },
  {
    dayName: 'Wed',
    dateNumber: 15,
    month: 'October',
    year: 2025,
    slotStatusText: 'Optimal',
    isFull: false,
    isOptimal: true,
    isAvailable: true
  },
  {
    dayName: 'Thu',
    dateNumber: 16,
    month: 'October',
    year: 2025,
    slotStatusText: '3 left',
    isFull: false,
    isAvailable: true
  },
  {
    dayName: 'Fri',
    dateNumber: 17,
    month: 'October',
    year: 2025,
    slotStatusText: '4 left',
    isFull: false,
    isAvailable: true
  },
  {
    dayName: 'Sat',
    dateNumber: 18,
    month: 'October',
    year: 2025,
    slotStatusText: 'Popular (Weekend)',
    isFull: false,
    isOptimal: true,
    isAvailable: true
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'slot-morning',
    key: 'morning',
    title: 'Morning Window',
    timeRange: '08:00 AM – 10:00 AM',
    subtitle: 'Recommended • High energy slot',
    badge: 'Recommended',
    isAvailable: true
  },
  {
    id: 'slot-midday',
    key: 'midday',
    title: 'Midday Window',
    timeRange: '11:30 AM – 01:00 PM',
    subtitle: 'Great for cooking lunch or cleaning',
    badge: 'Available',
    isAvailable: true
  },
  {
    id: 'slot-afternoon',
    key: 'afternoon',
    title: 'Afternoon Window',
    timeRange: '03:30 PM – 05:00 PM',
    subtitle: 'Relaxing spa / salon / repairs',
    badge: 'Available',
    isAvailable: true
  },
  {
    id: 'slot-evening',
    key: 'evening',
    title: 'Evening Window',
    timeRange: '06:00 PM – 07:30 PM',
    subtitle: 'Dinner preparation / end-of-day visit',
    badge: 'Available',
    isAvailable: true
  }
];

export const DEFAULT_ADDRESS: AddressInfo = {
  street: 'Flat 402, Shanthi Nilaya, 12th Main Road',
  locality: 'Indiranagar 2nd Stage',
  city: 'Bengaluru',
  pincode: '560038',
  apartmentDetails: '4th Floor, Tower B, Lift Available',
  landmark: 'Near CMH Hospital Metro Station'
};
