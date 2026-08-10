'use client';

import React from 'react';
import { WasteMap } from '../WasteMap';

interface LiveMapSectionProps {
  mapMarkers: any[];
}

export const LiveMapSection: React.FC<LiveMapSectionProps> = ({ mapMarkers }) => {
  return (
    <section id="map" className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-9">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            Live Map
          </span>
          <h2 className="text-2xl sm:text-3xl">ইন্টারঅ্যাকটিভ ঢাকা শহর লাইভ রিপোর্ট ম্যাপ</h2>
        </div>

        <div className="relative rounded-lg overflow-hidden bg-[#DDE6D3]">
          {/* Visual Vector Road Overlay matching index.html */}
          <div className="absolute inset-0 grid-texture pointer-events-none z-[1]">
            <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-[#0F4C2E]/20"></div>
            <div className="absolute top-0 bottom-0 left-[45%] w-[3px] bg-[#0F4C2E]/20"></div>
            <div className="absolute top-[65%] left-0 right-0 h-[3px] bg-[#0F4C2E]/20"></div>
          </div>

          {/* Live Leaflet Map */}
          <div className="relative z-[2]">
            <WasteMap markers={mapMarkers} height="440px" />
          </div>
        </div>
      </div>
    </section>
  );
};
