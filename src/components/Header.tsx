'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/i18n';
import { Menu, X, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b border-gray-100">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 py-1">
          <img src="/logo/logo-dark.png" alt="FixIt DNCC Logo" className="h-7 sm:h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.home')}
          </Link>
          <Link href="/report" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.report')}
          </Link>
          <Link href="/track" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.track')}
          </Link>
          <Link href="/#map" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.map')}
          </Link>
          <Link href="/faq" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.faq')}
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-[#374151] hover:text-[#0F4C2E] transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Action Controls & i18n switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="text-xs font-bold font-['Archivo'] px-2.5 py-1.5 sm:px-3 rounded-full bg-[#EAF0EB] text-[#0F4C2E] hover:bg-[#0F4C2E] hover:text-white transition-all duration-200"
            aria-label="Switch Language"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>

          {/* CTA Report Button */}
          <Link
            href="/report"
            className="inline-flex items-center justify-center bg-[#E39A2E] hover:bg-[#d58e24] text-[#182619] rounded-full px-2.5 py-1.5 sm:px-4.5 font-bold text-xs transition-all duration-200 shadow-sm"
          >
            {t('nav.report')}
          </Link>

          {/* Admin Login Shortcut */}
          <Link
            href="/admin/login"
            title="Admin Login"
            className="hidden sm:flex p-2 rounded-full bg-[#EAF0EB] text-[#0F4C2E] hover:bg-[#0F4C2E] hover:text-white transition-all duration-200"
          >
            <ShieldAlert className="w-4 h-4" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAF0EB] text-[#182619]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`md:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out bg-white ${mobileOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
        <div className="overflow-hidden px-6 py-4 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/report"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.report')}
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.track')}
          </Link>
          <Link
            href="/#map"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.map')}
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.faq')}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold py-2 text-[#182619]"
          >
            {t('nav.contact')}
          </Link>
          <Link
            href="/report"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center bg-[#E39A2E] text-[#182619] rounded-full py-2.5 font-bold text-xs"
          >
            {t('nav.report')}
          </Link>
        </div>
      </div>
    </header>
  );
};

