'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Camera, MapPin, Edit3, Send } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#F8F7EC]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('howItWorks.tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#0F4C2E] font-bold">{t('howItWorks.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#F6F8F6] rounded-2xl p-7">
            <div className="font-['Archivo'] font-black text-3xl text-[#0F4C2E] mb-3">
              01
            </div>
            <Camera className="w-8 h-8 text-[#0F4C2E] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#182619]">{t('howItWorks.step1Title')}</h3>
            <p className="text-sm text-[#4b5563] leading-relaxed">{t('howItWorks.step1Desc')}</p>
          </div>
          <div className="bg-[#F6F8F6] rounded-2xl p-7">
            <div className="font-['Archivo'] font-black text-3xl text-[#0F4C2E] mb-3">
              02
            </div>
            <MapPin className="w-8 h-8 text-[#0F4C2E] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#182619]">{t('howItWorks.step2Title')}</h3>
            <p className="text-sm text-[#4b5563] leading-relaxed">{t('howItWorks.step2Desc')}</p>
          </div>
          <div className="bg-[#F6F8F6] rounded-2xl p-7">
            <div className="font-['Archivo'] font-black text-3xl text-[#0F4C2E] mb-3">
              03
            </div>
            <Edit3 className="w-8 h-8 text-[#0F4C2E] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#182619]">{t('howItWorks.step3Title')}</h3>
            <p className="text-sm text-[#4b5563] leading-relaxed">{t('howItWorks.step3Desc')}</p>
          </div>
          <div className="bg-[#F6F8F6] rounded-2xl p-7">
            <div className="font-['Archivo'] font-black text-3xl text-[#0F4C2E] mb-3">
              04
            </div>
            <Send className="w-8 h-8 text-[#0F4C2E] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#182619]">{t('howItWorks.step4Title')}</h3>
            <p className="text-sm text-[#4b5563] leading-relaxed">{t('howItWorks.step4Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

