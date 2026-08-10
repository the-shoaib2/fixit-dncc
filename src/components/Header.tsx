'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Menu, X, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F7EC] border-b-2 border-[#182619]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#0F4C2E] flex items-center justify-center border-2 border-[#182619] flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-[#F8F7EC]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M6 21V9l6-6 6 6v12M9 21v-6h6v6" />
            </svg>
          </span>
          <span className="font-['Archivo'] font-black text-lg text-[#182619] tracking-tight">
            FixIt <span className="text-[#1E7A45]">DNCC</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          <Link href="/" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.home')}
          </Link>
          <Link href="/report" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.report')}
          </Link>
          <Link href="/track" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.track')}
          </Link>
          <Link href="/map" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.map')}
          </Link>
          <Link href="/faq" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.faq')}
          </Link>
          <Link href="/contact" className="text-[13.5px] font-semibold text-[#3f4f40] hover:text-[#0F4C2E] transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Action Controls & i18n switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="text-[11px] font-bold font-['Archivo'] px-2.5 py-1 rounded-full border-2 border-[#182619] bg-[#EFEFE1] hover:bg-[#E39A2E] text-[#182619] transition-all"
            aria-label="Switch Language"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>

          {/* CTA Report Button */}
          <Link
            href="/report"
            className="hidden sm:inline-flex bg-[#E39A2E] border-2 border-[#182619] rounded-[6px] px-3.5 py-1 font-bold text-xs text-[#182619] shadow-[2px_2px_0_#182619] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#182619] transition-all"
          >
            {t('nav.report')}
          </Link>

          {/* Admin Login Shortcut */}
          <Link
            href="/admin/login"
            title="Admin Login"
            className="p-1.5 rounded-md border-2 border-[#182619] bg-[#EFEFE1] hover:bg-[#0F4C2E] hover:text-white transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 border-2 border-[#182619] rounded-md bg-[#F8F7EC]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-[#182619] bg-[#F8F7EC] px-5 py-3 flex flex-col gap-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 border-b border-[#c9c8b3] text-[#182619]"
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/report"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 border-b border-[#c9c8b3] text-[#182619]"
          >
            {t('nav.report')}
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 border-b border-[#c9c8b3] text-[#182619]"
          >
            {t('nav.track')}
          </Link>
          <Link
            href="/map"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 border-b border-[#c9c8b3] text-[#182619]"
          >
            {t('nav.map')}
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 border-b border-[#c9c8b3] text-[#182619]"
          >
            {t('nav.faq')}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-1.5 text-[#182619]"
          >
            {t('nav.contact')}
          </Link>
          <Link
            href="/report"
            onClick={() => setMobileOpen(false)}
            className="mt-1 text-center bg-[#E39A2E] border-2 border-[#182619] rounded-[6px] py-2 font-bold text-xs text-[#182619] shadow-[2px_2px_0_#182619]"
          >
            {t('nav.report')}
          </Link>
        </div>
      )}
    </header>
  );
};
