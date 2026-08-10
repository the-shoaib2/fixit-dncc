'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';

export const FinalCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#E39A2E] border-t-2 border-[#182619] text-center py-16 px-6">
      <h2 className="text-2xl sm:text-3xl text-[#182619] font-bold max-w-2xl mx-auto mb-7">
        {t('cta.title')}
      </h2>
      <Link
        href="/report"
        className="inline-block bg-[#182619] text-[#F8F7EC] font-bold text-base px-8 py-4 rounded-full border-2 border-[#182619] shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_rgba(0,0,0,0.25)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
      >
        {t('cta.btn')}
      </Link>
    </section>
  );
};
