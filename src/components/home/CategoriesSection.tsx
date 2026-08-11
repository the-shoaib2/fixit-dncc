'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';
import { Trash2, Archive, AlertTriangle, Building2, Trees } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#F6F8F6]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('categories.tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#0F4C2E] font-bold">{t('categories.title')}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          <Link href="/report" className="bg-white rounded-2xl p-6 text-center h-full min-h-[160px] flex flex-col items-center justify-center hover:-translate-y-1.5 hover:bg-[#0F4C2E] group transition-all duration-300">
            <Trash2 className="w-9 h-9 text-[#0F4C2E] group-hover:text-[#E39A2E] mx-auto mb-3 transition-colors" />
            <h3 className="text-sm font-bold leading-snug text-[#182619] group-hover:text-white transition-colors">{t('categories.streetWaste')}</h3>
          </Link>
          <Link href="/report" className="bg-white rounded-2xl p-6 text-center h-full min-h-[160px] flex flex-col items-center justify-center hover:-translate-y-1.5 hover:bg-[#0F4C2E] group transition-all duration-300">
            <Archive className="w-9 h-9 text-[#0F4C2E] group-hover:text-[#E39A2E] mx-auto mb-3 transition-colors" />
            <h3 className="text-sm font-bold leading-snug text-[#182619] group-hover:text-white transition-colors">{t('categories.overflowingBin')}</h3>
          </Link>
          <Link href="/report" className="bg-white rounded-2xl p-6 text-center h-full min-h-[160px] flex flex-col items-center justify-center hover:-translate-y-1.5 hover:bg-[#0F4C2E] group transition-all duration-300">
            <AlertTriangle className="w-9 h-9 text-[#0F4C2E] group-hover:text-[#E39A2E] mx-auto mb-3 transition-colors" />
            <h3 className="text-sm font-bold leading-snug text-[#182619] group-hover:text-white transition-colors">{t('categories.illegalDumping')}</h3>
          </Link>
          <Link href="/report" className="bg-white rounded-2xl p-6 text-center h-full min-h-[160px] flex flex-col items-center justify-center hover:-translate-y-1.5 hover:bg-[#0F4C2E] group transition-all duration-300">
            <Building2 className="w-9 h-9 text-[#0F4C2E] group-hover:text-[#E39A2E] mx-auto mb-3 transition-colors" />
            <h3 className="text-sm font-bold leading-snug text-[#182619] group-hover:text-white transition-colors">{t('categories.constructionWaste')}</h3>
          </Link>
          <Link href="/report" className="bg-white rounded-2xl p-6 text-center h-full min-h-[160px] flex flex-col items-center justify-center hover:-translate-y-1.5 hover:bg-[#0F4C2E] group transition-all duration-300">
            <Trees className="w-9 h-9 text-[#0F4C2E] group-hover:text-[#E39A2E] mx-auto mb-3 transition-colors" />
            <h3 className="text-sm font-bold leading-snug text-[#182619] group-hover:text-white transition-colors">{t('categories.parkWaste')}</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};

