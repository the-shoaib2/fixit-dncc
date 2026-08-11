'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, Lock, Mail, AlertCircle, LogOut, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';

export default function AdminLoginPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/check-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticatedAdmin(data.admin);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin');
      } else {
        setErrorMsg(data.error || (lang === 'bn' ? 'অকার্যকর ইমেইল বা পাসওয়ার্ড' : 'Invalid email or password'));
      }
    } catch (err) {
      setErrorMsg(lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে। নেটওয়ার্ক চেক করুন।' : 'Login failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setAuthenticatedAdmin(null);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#0F4C2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-[#E39A2E]" />
          </div>
          <h1 className="text-2xl font-extrabold font-['Archivo'] text-[#0F4C2E]">DNCC Admin Portal</h1>
          <p className="text-xs text-[#4b5563] font-semibold mt-1">
            {lang === 'bn' ? 'ঢাকা উত্তর সিটি কর্পোরেশন এডমিন প্রবেশাধিকার' : 'Dhaka North City Corporation Admin Access'}
          </p>
        </div>

        {authenticatedAdmin ? (
          <div className="space-y-6">
            <div className="bg-[#EAF0EB] p-4 rounded-xl text-center space-y-1">
              <span className="text-xs font-bold text-[#0F4C2E] uppercase tracking-wider block">
                {lang === 'bn' ? 'বর্তমানে লগইন অবস্থায় আছেন' : 'Currently Logged In'}
              </span>
              <div className="text-sm font-extrabold text-[#182619]">{authenticatedAdmin.name}</div>
              <div className="text-xs font-mono text-[#3f4f40]">{authenticatedAdmin.email}</div>
            </div>

            <div className="space-y-3">
              <Link
                href="/admin"
                className="w-full bg-[#0F4C2E] text-white rounded-full py-3 px-4 text-xs font-bold hover:bg-[#1E7A45] transition-all flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'Go to Control Room Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full bg-[#C23B36]/10 text-[#C23B36] hover:bg-[#C23B36] hover:text-white rounded-full py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{loggingOut ? t('admin.loggingOut') : t('admin.logout')}</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="bg-[#C23B36]/10 text-[#C23B36] p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-6">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#182619] mb-1.5">
                  {lang === 'bn' ? 'ইমেইল' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#4b5563] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F8F6] rounded-xl text-sm font-semibold text-[#182619] focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#182619] mb-1.5">
                  {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#4b5563] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F8F6] rounded-xl text-sm font-semibold text-[#182619] focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C2E] text-white rounded-full py-3.5 text-sm font-bold hover:bg-[#1E7A45] transition-all cursor-pointer"
              >
                {loading ? (lang === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (lang === 'bn' ? 'লগইন করুন' : 'Login')}
              </button>
            </form>
          </>
        )}

        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <Link href="/" className="text-xs text-[#0F4C2E] font-bold hover:underline">
            {t('admin.backToPublic')}
          </Link>
        </div>
      </div>
    </div>
  );
}
