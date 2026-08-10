'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useRouter } from 'next/navigation';

export const QuickTrackSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [trackQuery, setTrackQuery] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackQuery.trim()) {
      router.push(`/track?q=${encodeURIComponent(trackQuery.trim())}`);
    }
  };

  return (
    <section className="py-16 bg-[#0F4C2E] text-white border-y-2 border-[#182619]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="bg-[#0F4C2E] border-2 border-[#182619] rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#E39A2E] uppercase block mb-2">
              {t('track.tag')}
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">{t('track.title')}</h3>
            <p className="text-sm text-[#D9E5DA] mb-6">{t('track.subtitle')}</p>
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder={t('track.idPlaceholder')}
                className="flex-1 bg-white text-[#182619] px-4 py-3 rounded-md text-sm font-semibold border-2 border-[#182619] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#E39A2E] text-[#182619] font-bold px-6 py-3 rounded-md border-2 border-[#182619] hover:bg-[#C97C16] transition-colors"
              >
                {t('track.btn')}
              </button>
            </form>
          </div>

          {/* Visual Timeline Sample */}
          <div className="bg-white text-[#182619] rounded-md p-5 border-2 border-[#182619]">
            <div className="font-extrabold text-xs text-[#3f4f40] mb-3">
              {lang === 'bn' ? 'নমুনা রিপোর্ট #FIX-2026-000101' : 'Sample Report #FIX-2026-000101'}
            </div>
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex items-center gap-2.5 text-[#0F4C2E]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                <span>{t('track.timeline.submitted')} — ১০ আগস্ট</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#0F4C2E]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                <span>{t('track.timeline.verified')} — ১০ আগস্ট</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#E39A2E] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
                <span>{t('track.timeline.inProgress')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#c9c8b3]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c9c8b3]"></span>
                <span>{t('track.timeline.resolved')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
