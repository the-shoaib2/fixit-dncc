'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/i18n';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#182619] text-[#cfd8cf] pt-14 pb-8">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-[#37473a]">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-3.5 bg-[#F8F7EC] px-3 py-1.5 rounded-md border-2 border-[#37473a] shadow-[2px_2px_0_#000]">
              <img src="/logo/logo-dark.png" alt="FixIt DNCC Logo" className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-[13.5px] text-[#9fb09f] leading-relaxed">
              {t('footer.brandDesc')}
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#7f9280] font-bold mb-3.5">
                {t('footer.col1')}
              </h4>
              <ul className="space-y-2 text-sm text-[#dfe6df]">
                <li><Link href="/" className="hover:text-[#E39A2E] transition-colors">{t('nav.home')}</Link></li>
                <li><Link href="/report" className="hover:text-[#E39A2E] transition-colors">{t('nav.report')}</Link></li>
                <li><Link href="/track" className="hover:text-[#E39A2E] transition-colors">{t('nav.track')}</Link></li>
                <li><Link href="/map" className="hover:text-[#E39A2E] transition-colors">{t('nav.map')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#7f9280] font-bold mb-3.5">
                {t('footer.col2')}
              </h4>
              <ul className="space-y-2 text-sm text-[#dfe6df]">
                <li><Link href="/faq" className="hover:text-[#E39A2E] transition-colors">{t('nav.faq')}</Link></li>
                <li><Link href="/contact" className="hover:text-[#E39A2E] transition-colors">{t('nav.contact')}</Link></li>
                <li><Link href="/privacy" className="hover:text-[#E39A2E] transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link href="/terms" className="hover:text-[#E39A2E] transition-colors">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 text-xs text-[#7f9280] flex flex-col sm:flex-row justify-between gap-2">
          <span>{t('footer.copyright')}</span>
          <span>ঢাকা উত্তর সিটি কর্পোরেশন (DNCC)</span>
        </div>
      </div>
    </footer>
  );
};
