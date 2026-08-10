'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Map, FolderTree, BarChart3, HelpCircle, History, LogOut, ShieldAlert, ChevronRight } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#F8F7EC] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#182619] text-white flex-shrink-0 border-r-2 border-[#182619] flex flex-col justify-between">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-[#37473a] flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-[#E39A2E]" />
            <div>
              <div className="font-['Archivo'] font-black text-lg text-white">DNCC Control</div>
              <div className="text-[10px] text-[#9fb09f] uppercase tracking-wider font-bold">Admin Portal</div>
            </div>
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
            className="block text-center text-xs font-bold text-[#9fb09f] hover:text-white mb-3"
          >
            ← ফিরে যান পাবলিক সাইটে
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-[#C23B36] text-white border-2 border-black rounded-md py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
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
