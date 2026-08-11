'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Zap, MapPin, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#F8F7EC]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('why.tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#0F4C2E] font-bold">{t('why.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="p-6 bg-[#F6F8F6] rounded-2xl hover:-translate-y-1 transition-transform">
            <Zap className="w-10 h-10 text-[#0F4C2E] mx-auto mb-4" />
            <h3 className="text-base font-bold mb-2 text-[#182619]">{t('why.f1Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f1Desc')}</p>
          </div>
          <div className="p-6 bg-[#F6F8F6] rounded-2xl hover:-translate-y-1 transition-transform">
            <MapPin className="w-10 h-10 text-[#0F4C2E] mx-auto mb-4" />
            <h3 className="text-base font-bold mb-2 text-[#182619]">{t('why.f2Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f2Desc')}</p>
          </div>
          <div className="p-6 bg-[#F6F8F6] rounded-2xl hover:-translate-y-1 transition-transform">
            <ShieldCheck className="w-10 h-10 text-[#0F4C2E] mx-auto mb-4" />
            <h3 className="text-base font-bold mb-2 text-[#182619]">{t('why.f3Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f3Desc')}</p>
          </div>
          <div className="p-6 bg-[#F6F8F6] rounded-2xl hover:-translate-y-1 transition-transform">
            <CheckCircle2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-4" />
            <h3 className="text-base font-bold mb-2 text-[#182619]">{t('why.f4Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f4Desc')}</p>
          </div>
          <div className="p-6 bg-[#F6F8F6] rounded-2xl hover:-translate-y-1 transition-transform col-span-2 sm:col-span-1">
            <Trash2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-4" />
            <h3 className="text-base font-bold mb-2 text-[#182619]">{t('why.f5Title')}</h3>
            <p className="text-xs text-[#4b5563] leading-relaxed">{t('why.f5Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

