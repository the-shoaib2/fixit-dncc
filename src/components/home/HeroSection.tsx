'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { WasteMap } from '@/components/WasteMap';
import { Camera, Search } from 'lucide-react';

interface HeroSectionProps {
  mapMarkers: any[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mapMarkers }) => {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative bg-[#0F4C2E] text-[#F8F7EC] overflow-hidden border-b-2 border-[#182619] min-h-[calc(100vh-52px)] flex items-center">
      <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none"></div>
      <div className="relative max-w-[1180px] mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#E39A2E] text-[#182619] font-bold text-xs px-3 py-1.5 rounded-full border-2 border-[#182619] mb-6">
            {t('hero.eyebrow')}
          </span>
          <h1 className="font-['Archivo'] text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
            FixIt <em className="not-italic text-[#E39A2E]">DNCC</em>
            <br />
            Report Waste. Build a
            <br />
            Cleaner Dhaka.
          </h1>
          <p className="font-['Hind_Siliguri'] text-lg sm:text-xl font-semibold text-[#DCE8DD] max-w-xl mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 bg-[#E39A2E] text-[#182619] font-bold text-base px-6 py-3.5 rounded-full border-2 border-[#182619] shadow-[4px_4px_0_rgba(0,0,0,0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.4)] transition-all"
            >
              <Camera className="w-5 h-5" />
              {t('hero.ctaReport')}
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 bg-transparent text-white font-bold text-base px-6 py-3.5 rounded-full border-2 border-white hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5" />
              {t('hero.ctaTrack')}
            </Link>
          </div>
        </div>

        {/* Hero Ticket-Map Graphic */}
        <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-lg p-4 sm:p-5 shadow-[8px_8px_0_rgba(0,0,0,0.35)] text-[#182619]">
          <div className="relative rounded-md overflow-hidden bg-[#DDE6D3] grid-texture">
            {/* Instant design pins from index.html */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-[30%] left-[22%] w-4 h-4 rounded-full bg-[#C23B36] border-2 border-[#182619] shadow-sm animate-pulse" title="মিরপুর ১০ — জমা দেওয়া হয়েছে" />
              <div className="absolute top-[55%] left-[60%] w-4 h-4 rounded-full bg-[#E39A2E] border-2 border-[#182619] shadow-sm" title="উত্তরা — কাজ চলছে" />
              <div className="absolute top-[20%] left-[72%] w-4 h-4 rounded-full bg-[#2F9E5A] border-2 border-[#182619] shadow-sm" title="গুলশান — সমাধান হয়েছে" />
              <div className="absolute top-[72%] left-[38%] w-4 h-4 rounded-full bg-[#E39A2E] border-2 border-[#182619] shadow-sm" title="ধানমন্ডি — পরিদর্শনাধীন" />
            </div>
            <WasteMap markers={mapMarkers.slice(0, 5)} height="290px" />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-xs text-[#0F4C2E]">
              {t('hero.liveMapCaption')} — মিরপুর, উত্তরা, গুলশান
            </span>
          </div>
          <div className="flex justify-between items-center mt-1.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C23B36]"></span>
              {t('hero.status.submitted')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
              {t('hero.status.inProgress')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
              {t('hero.status.resolved')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
