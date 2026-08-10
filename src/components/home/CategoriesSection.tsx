'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';
import { Trash2, Archive, AlertTriangle, Building2, Trees } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t-2 border-[#182619]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('categories.tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl">{t('categories.title')}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[18px]">
          <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
            <Trash2 className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
            <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.streetWaste')}</h3>
          </Link>
          <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
            <Archive className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
            <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.overflowingBin')}</h3>
          </Link>
          <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
            <AlertTriangle className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
            <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.illegalDumping')}</h3>
          </Link>
          <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
            <Building2 className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
            <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.constructionWaste')}</h3>
          </Link>
          <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
            <Trees className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
            <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.parkWaste')}</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};
