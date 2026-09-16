import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Wrench, 
  Hammer, 
  Flower2, 
  Utensils, 
  HeartHandshake, 
  Tv, 
  Compass,
  ShieldAlert
} from 'lucide-react';

interface ServicesPageProps {
  onSelectServiceCategory: (trade: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectServiceCategory }) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'home' | 'technical' | 'personal' | 'specialty'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    {
      id: 'cooking',
      title: 'Cooking & Meal Prep',
      trade: 'cooking',
      icon: Utensils,
      group: 'personal',
      description: 'Daily homestyle cooking, roti-sabzi prep, weekly meal batches, and diet-specific catering.',
      startingRate: 'From ₹149/hr • 85% to artisan'
    },
    {
      id: 'cleaning',
      title: 'Cleaning & Housekeeping',
      trade: 'cleaning',
      icon: Sparkles,
      group: 'home',
      description: 'Bathroom scrubbing, kitchen degreasing, full home deep cleaning, and weekly mopping.',
      startingRate: 'From ₹149 fixed • 85% to artisan'
    },
    {
      id: 'salon',
      title: 'Manicure & Pedicure',
      trade: 'salon',
      icon: HeartHandshake,
      group: 'personal',
      description: 'Classic express manicure, herbal foot spa pedicure, cuticle care, and nail art at home.',
      startingRate: 'From ₹149 fixed • 85% to artisan'
    },
    {
      id: 'electrical',
      title: 'Electrical & Wiring',
      trade: 'electrical',
      icon: Zap,
      group: 'technical',
      description: 'Certified wiring, fan/switch repair, MCB troubleshooting, inverter and EV setups.',
      startingRate: 'From ₹149/hr • 85% to artisan'
    },
    {
      id: 'plumbing',
      title: 'Plumbing & Water',
      trade: 'plumbing',
      icon: Droplets,
      group: 'technical',
      description: 'Leak diagnostics, tap washer fixing, drain clearance, and geyser maintenance.',
      startingRate: 'From ₹149/hr • 85% to artisan'
    },
    {
      id: 'repairs',
      title: 'Carpentry & Furniture',
      trade: 'carpentry',
      icon: Hammer,
      group: 'home',
      description: 'Door latches, hydraulic hinges, furniture assembly, and custom woodwork repair.',
      startingRate: 'From ₹149/hr • 85% to artisan'
    },
    {
      id: 'gardening',
      title: 'Gardening & Plants',
      trade: 'appliance',
      icon: Flower2,
      group: 'home',
      description: 'Landscape grooming, seasonal pruning, turf care, and soil enrichment.',
      startingRate: 'From ₹149/hr • 85% to artisan'
    },
    {
      id: 'appliance',
      title: 'Appliance Repair',
      trade: 'electrical',
      icon: Tv,
      group: 'technical',
      description: 'Diagnostics and component replacement for refrigerators, washers, and ovens.',
      startingRate: 'From ₹179/hr • 85% to artisan'
    },
    {
      id: 'other',
      title: 'Specialty Handyman',
      trade: 'all',
      icon: Compass,
      group: 'specialty',
      description: 'Custom guild assignments, bespoke handyman tasks, and specialty requests.',
      startingRate: 'From ₹149/hr • Custom scope'
    }
  ];

  const filteredCategories = CATEGORIES.filter(cat => {
    const matchesTab = selectedTab === 'all' || cat.group === selectedTab;
    const matchesSearch = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Top Hero Section */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-[#5415A0] text-xs font-bold mb-3 border border-purple-200">
          <span>VERIFIED COOPERATIVE GUILDS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Community-Crafted Services.
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-500 font-medium">
          Transparent living-wage rates booked directly with verified member-owners.
        </p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'home', label: 'Home Care' },
            { id: 'technical', label: 'Technical Trades' },
            { id: 'personal', label: 'Personal & Daily' },
            { id: 'specialty', label: 'Specialty' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedTab === tab.id
                  ? 'bg-[#5415A0] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 w-full md:w-80 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trades, tasks, or guilds..."
            className="w-full bg-transparent text-xs font-medium outline-none text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* 9 Service Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectServiceCategory(cat.trade)}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:border-[#5415A0] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-purple-50 group-hover:bg-purple-100/80 text-[#5415A0] flex items-center justify-center transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#5415A0] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600 text-[11px]">
                  {cat.startingRate}
                </span>
                <span className="text-[#5415A0] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Artisans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Protected Cooperative Exchange Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#5415A0] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">
              Protected Cooperative Exchange
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Every task protected by WORKIVO 25/75 Dual Escrow & 100% Peer Replacement Guarantee.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF8FE] text-slate-700 border border-purple-100">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5415A0]" />
            85% Living Wage Floor
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF8FE] text-slate-700 border border-purple-100">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5415A0]" />
            ₹50,000 Guild Bond
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF8FE] text-slate-700 border border-purple-100">
            <Zap className="w-3.5 h-3.5 text-[#5415A0]" />
            Zero Surge Surcharges
          </span>
        </div>
      </div>
    </div>
  );
};
