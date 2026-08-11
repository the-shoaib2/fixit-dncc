'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Map, FolderTree, BarChart3, HelpCircle, History, LogOut, ChevronRight, ShieldCheck, Loader2, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Verify admin authentication status
    fetch('/api/admin/check-auth')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          setAdminUser(data.admin);
          setLoading(false);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      setLoggingOut(false);
    }
  };

  const navItems = [
    { href: '/admin', label: t('admin.nav.dashboard'), icon: LayoutDashboard },
    { href: '/admin/reports', label: t('admin.nav.reports'), icon: FileText },
    { href: '/admin/map', label: t('admin.nav.liveMap'), icon: Map },
    { href: '/admin/categories', label: t('admin.nav.categories'), icon: FolderTree },
    { href: '/admin/statistics', label: t('admin.nav.statistics'), icon: BarChart3 },
    { href: '/admin/faq', label: t('admin.nav.faq'), icon: HelpCircle },
    { href: '/admin/activity-logs', label: t('admin.nav.activityLogs'), icon: History },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F8F6] flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-[#0F4C2E] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-[#0F4C2E] mx-auto mb-3" />
          <h3 className="font-bold text-base text-[#182619] mb-1">{t('admin.securityVerification')}</h3>
          <p className="text-xs text-[#4b5563]">{t('admin.checkingSession')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F6] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0C1C11] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo/logo-dark.png" alt="FixIt DNCC Logo" className="h-7 w-auto object-contain bg-white p-1 rounded-lg" />
          <span className="font-bold text-xs text-[#E39A2E]">Control Room</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white/10 text-white rounded-full hover:bg-[#E39A2E] hover:text-[#182619]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 bg-white/10 text-white rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`w-full md:w-64 bg-[#0C1C11] text-white flex-shrink-0 flex flex-col justify-between transition-all ${
          mobileMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2">
                <img src="/logo/logo-dark.png" alt="FixIt DNCC Logo" className="h-8 w-auto object-contain bg-white p-1.5 rounded-xl" />
              </Link>
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white/10 text-white rounded-full hover:bg-[#E39A2E] hover:text-[#182619] transition-colors"
                title={lang === 'bn' ? 'Switch to English' : 'বাংলায় সুইচ করুন'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
              </button>
            </div>

            <div className="text-[10px] text-[#9fb09f] uppercase tracking-wider font-bold mt-3 flex items-center justify-between">
              <span>{t('admin.controlRoom')}</span>
              <span className="w-2 h-2 rounded-full bg-[#2F9E5A]" title={t('admin.authenticated')}></span>
            </div>
            {adminUser && (
              <div className="mt-2 text-xs font-semibold text-[#E39A2E] truncate">
                👤 {adminUser.name || adminUser.email}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#E39A2E] text-[#182619]'
                      : 'text-[#cfd8cf] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer & Logout */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="block text-center text-xs font-bold text-[#9fb09f] hover:text-white mb-3 transition-colors"
          >
            {t('admin.backToPublic')}
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-[#C23B36] text-white rounded-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? t('admin.loggingOut') : t('admin.logout')}
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">{children}</main>
    </div>
  );
};

