'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Map, FolderTree, BarChart3, HelpCircle, History, LogOut, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);

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
    { href: '/admin', label: 'ড্যাশবোর্ড (Dashboard)', icon: LayoutDashboard },
    { href: '/admin/reports', label: 'রিপোর্ট সমূহ (Reports)', icon: FileText },
    { href: '/admin/map', label: 'লাইভ ম্যাপ (Live Map)', icon: Map },
    { href: '/admin/categories', label: 'ক্যাটেগরি (Categories)', icon: FolderTree },
    { href: '/admin/statistics', label: 'পরিসংখ্যান (Statistics)', icon: BarChart3 },
    { href: '/admin/faq', label: 'প্রশ্নোত্তর (FAQ)', icon: HelpCircle },
    { href: '/admin/activity-logs', label: 'অডিট লগ (Activity Logs)', icon: History },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7EC] flex flex-col items-center justify-center p-6">
        <div className="bg-white border-2 border-[#182619] rounded-lg p-8 shadow-[6px_6px_0_#000] text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-[#0F4C2E] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-[#0F4C2E] mx-auto mb-3" />
          <h3 className="font-bold text-base text-[#182619] mb-1">সিকিউরিটি ভেরিফিকেশন...</h3>
          <p className="text-xs text-[#3f4f40]">অ্যাডমিন সেশন যাচাই করা হচ্ছে</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7EC] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#182619] text-white flex-shrink-0 border-r-2 border-[#182619] flex flex-col justify-between">
        <div>
          {/* Header Branding */}
          <div className="p-4 sm:p-5 border-b border-[#37473a]">
            <Link href="/admin" className="flex items-center gap-2">
              <img src="/logo/logo-dark.png" alt="FixIt DNCC Logo" className="h-8 w-auto object-contain bg-[#F8F7EC] p-1 rounded border border-[#37473a]" />
            </Link>
            <div className="text-[10px] text-[#9fb09f] uppercase tracking-wider font-bold mt-2 flex items-center justify-between">
              <span>Admin Control Room</span>
              <span className="w-2 h-2 rounded-full bg-[#2F9E5A]" title="Authenticated"></span>
            </div>
            {adminUser && (
              <div className="mt-2 text-xs font-semibold text-[#E39A2E] truncate">
                👤 {adminUser.name || adminUser.email}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#E39A2E] text-[#182619]'
                      : 'text-[#cfd8cf] hover:bg-[#37473a] hover:text-white'
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
        <div className="p-4 border-t border-[#37473a]">
          <Link
            href="/"
            className="block text-center text-xs font-bold text-[#9fb09f] hover:text-white mb-3 transition-colors"
          >
            ← ফিরে যান পাবলিক সাইটে
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-[#C23B36] text-white border-2 border-black rounded-md py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-[2px_2px_0_#000]"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? 'লগআউট হচ্ছে...' : 'লগআউট (Logout)'}
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">{children}</main>
    </div>
  );
};
