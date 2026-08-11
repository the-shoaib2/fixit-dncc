'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';

export const FinalCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0F4C2E] text-center py-20 px-6">
      <h2 className="text-2xl sm:text-4xl text-white font-bold max-w-2xl mx-auto mb-8">
        {t('cta.title')}
      </h2>
      <Link
        href="/report"
        className="inline-block bg-[#E39A2E] text-[#182619] font-bold text-base px-9 py-4 rounded-full hover:bg-[#d58e24] transition-all"
      >
        {t('cta.btn')}
      </Link>
    </section>
  );
};

