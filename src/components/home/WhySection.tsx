'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Zap, MapPin, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('why.tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl">{t('why.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="p-3">
            <Zap className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">{t('why.f1Title')}</h3>
            <p className="text-xs text-[#3f4f40]">{t('why.f1Desc')}</p>
          </div>
          <div className="p-3">
            <MapPin className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">{t('why.f2Title')}</h3>
            <p className="text-xs text-[#3f4f40]">{t('why.f2Desc')}</p>
          </div>
          <div className="p-3">
            <ShieldCheck className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">{t('why.f3Title')}</h3>
            <p className="text-xs text-[#3f4f40]">{t('why.f3Desc')}</p>
          </div>
          <div className="p-3">
            <CheckCircle2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">{t('why.f4Title')}</h3>
            <p className="text-xs text-[#3f4f40]">{t('why.f4Desc')}</p>
          </div>
          <div className="p-3 col-span-2 sm:col-span-1">
            <Trash2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">{t('why.f5Title')}</h3>
            <p className="text-xs text-[#3f4f40]">{t('why.f5Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
