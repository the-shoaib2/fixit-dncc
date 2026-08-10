'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('beforeAfter.tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl">{t('beforeAfter.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
            <div className="grid grid-cols-2 h-36">
              <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <AlertTriangle className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.before')}</span>
              </div>
              <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <CheckCircle2 className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.after')}</span>
              </div>
            </div>
            <div className="p-4 text-sm font-semibold text-[#3f4f40]">
              মিরপুর ১০ — ডাস্টবিন উপচে পড়া সমস্যা সমাধান
            </div>
          </div>

          <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
            <div className="grid grid-cols-2 h-36">
              <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <AlertTriangle className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.before')}</span>
              </div>
              <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <CheckCircle2 className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.after')}</span>
              </div>
            </div>
            <div className="p-4 text-sm font-semibold text-[#3f4f40]">
              উত্তরা সেক্টর ৭ — রাস্তার ময়লা পরিষ্কার
            </div>
          </div>

          <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
            <div className="grid grid-cols-2 h-36">
              <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <AlertTriangle className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.before')}</span>
              </div>
              <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                <CheckCircle2 className="w-6 h-6 opacity-80" />
                <span>{t('beforeAfter.after')}</span>
              </div>
            </div>
            <div className="p-4 text-sm font-semibold text-[#3f4f40]">
              গুলশান পার্ক — উন্মুক্ত স্থানের বর্জ্য অপসারণ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
