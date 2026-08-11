'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Zap, MapPin, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F7EC]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('why.tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0F4C2E] font-bold leading-tight">{t('why.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 text-center">
          <div className="p-5 sm:p-6 bg-[#F6F8F6] rounded-2xl flex flex-col items-center justify-start h-full">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C2E] mb-3 sm:mb-4 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold mb-2 text-[#182619]">{t('why.f1Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f1Desc')}</p>
          </div>
          <div className="p-5 sm:p-6 bg-[#F6F8F6] rounded-2xl flex flex-col items-center justify-start h-full">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C2E] mb-3 sm:mb-4 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold mb-2 text-[#182619]">{t('why.f2Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f2Desc')}</p>
          </div>
          <div className="p-5 sm:p-6 bg-[#F6F8F6] rounded-2xl flex flex-col items-center justify-start h-full">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C2E] mb-3 sm:mb-4 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold mb-2 text-[#182619]">{t('why.f3Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f3Desc')}</p>
          </div>
          <div className="p-5 sm:p-6 bg-[#F6F8F6] rounded-2xl flex flex-col items-center justify-start h-full">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C2E] mb-3 sm:mb-4 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold mb-2 text-[#182619]">{t('why.f4Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f4Desc')}</p>
          </div>
          <div className="p-5 sm:p-6 bg-[#F6F8F6] rounded-2xl flex flex-col items-center justify-start h-full sm:col-span-2 lg:col-span-1">
            <Trash2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C2E] mb-3 sm:mb-4 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold mb-2 text-[#182619]">{t('why.f5Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f5Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

