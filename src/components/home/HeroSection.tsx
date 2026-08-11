'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';
import { WasteMap } from '../WasteMap';
import { Camera, Search } from 'lucide-react';

interface HeroSectionProps {
  mapMarkers: any[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mapMarkers }) => {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative bg-[#0F4C2E] text-white overflow-hidden min-h-[calc(100vh-52px)] flex items-center py-16 lg:py-24">
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none"></div>
      <div className="relative max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#E39A2E]/20 text-[#E39A2E] font-bold text-xs px-3.5 py-1.5 rounded-full mb-6">
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
          <div className="flex flex-wrap gap-4">
            <Link
              href="/report"
              className="inline-flex items-center gap-2.5 bg-[#E39A2E] text-[#182619] font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#d58e24] transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
              {t('hero.ctaReport')}
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md text-white font-bold text-base px-7 py-3.5 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
              {t('hero.ctaTrack')}
            </Link>
          </div>
        </div>

        {/* Hero Clean Map Graphic */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-white">
          <div className="relative rounded-xl overflow-hidden bg-[#EAF0EB]">
            <WasteMap markers={mapMarkers.slice(0, 5)} height="310px" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-xs text-[#E39A2E]">
              {t('hero.liveMapCaption')} — মিরপুর, উত্তরা, গুলশান
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C23B36]"></span>
              {t('hero.status.submitted')}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
              {t('hero.status.inProgress')}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
              {t('hero.status.resolved')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

