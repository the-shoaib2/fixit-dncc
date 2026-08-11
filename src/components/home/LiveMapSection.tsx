'use client';

import React from 'react';
import { WasteMap } from '../WasteMap';

interface LiveMapSectionProps {
  mapMarkers: any[];
}

export const LiveMapSection: React.FC<LiveMapSectionProps> = ({ mapMarkers }) => {
  return (
    <section id="map" className="py-20 bg-[#F6F8F6]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            Live Map
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#0F4C2E] font-bold">ইন্টারঅ্যাকটিভ ঢাকা শহর লাইভ রিপোর্ট ম্যাপ</h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-[#EAF0EB]">
          <WasteMap markers={mapMarkers} height="460px" />
        </div>
      </div>
    </section>
  );
};

