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
    <section className="py-20 bg-[#0F4C2E] text-white">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#E39A2E] uppercase block mb-2">
              {t('track.tag')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('track.title')}</h3>
            <p className="text-sm text-[#D9E5DA] mb-6">{t('track.subtitle')}</p>
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder={t('track.idPlaceholder')}
                className="flex-1 bg-white text-[#182619] px-5 py-3.5 rounded-full text-sm font-semibold border-none focus:outline-none focus:ring-2 focus:ring-[#E39A2E]"
              />
              <button
                type="submit"
                className="bg-[#E39A2E] text-[#182619] font-bold px-7 py-3.5 rounded-full hover:bg-[#d58e24] transition-all"
              >
                {t('track.btn')}
              </button>
            </form>
          </div>

          {/* Visual Timeline Sample */}
          <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-6">
            <div className="font-extrabold text-xs text-[#E39A2E] uppercase tracking-wider mb-4">
              {lang === 'bn' ? 'নমুনা রিপোর্ট #FIX-2026-000101' : 'Sample Report #FIX-2026-000101'}
            </div>
            <div className="space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-3 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                <span>{t('track.timeline.submitted')} — ১০ আগস্ট</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                <span>{t('track.timeline.verified')} — ১০ আগস্ট</span>
              </div>
              <div className="flex items-center gap-3 text-[#E39A2E] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
                <span>{t('track.timeline.inProgress')}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
                <span>{t('track.timeline.resolved')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

