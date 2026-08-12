'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import { ShieldCheck, Lock, KeyRound, AlertCircle, CheckCircle2, User, Mail } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';

export default function AdminSettingsPage() {
  const { lang, t } = useLanguage();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/check-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAdminUser(data.admin);
        }
      })
      .catch(() => {});
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: lang === 'bn' ? 'নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না' : 'New passwords do not match',
      });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: lang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({
          type: 'success',
          text: lang === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Password updated successfully!',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({
          type: 'error',
          text: data.error || (lang === 'bn' ? 'পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে' : 'Password update failed'),
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: lang === 'bn' ? 'নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।' : 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">
          {lang === 'bn' ? 'সেটিংস ও সিকিউরিটি' : 'Settings & Security'}
        </h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          {lang === 'bn'
            ? 'এডমিন পাসওয়ার্ড পরিবর্তন, সেশন সিকিউরিটি ও সিস্টেমের নিরাপত্তামূলক কন্ট্রোল'
            : 'Admin password management, session security parameters, and access controls'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security & Profile Overview Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Admin Account Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C2E] text-white flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-[#182619] truncate">
                  {adminUser?.name || 'Admin Account'}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EAF0EB] text-[#0F4C2E] inline-block">
                  {adminUser?.role || 'ADMIN'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-xs space-y-2">
              <div className="flex items-center gap-2 text-gray-600 font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#0F4C2E] shrink-0" />
                <span className="truncate font-mono text-[#182619] font-bold">
                  {adminUser?.email || 'admin@dncc.gov.bd'}
                </span>
              </div>
            </div>
          </div>

          {/* Security Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF0EB] text-[#0F4C2E] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#1E7A45]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#182619]">
                  {lang === 'bn' ? 'সিকিউরিটি স্ট্যাটাস' : 'Security Status'}
                </h3>
                <span className="text-[11px] text-[#1E7A45] font-bold">
                  {lang === 'bn' ? '● সুরক্ষিত (Active JWT Auth)' : '● Secured (Active JWT Auth)'}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">{lang === 'bn' ? 'সেশন মেয়াদ:' : 'Session Expiry:'}</span>
                <span className="font-bold text-[#182619] font-mono">15 Days</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">{lang === 'bn' ? 'কুকি সিকিউরিটি:' : 'Cookie Security:'}</span>
                <span className="font-bold text-[#0F4C2E]">HTTP-Only / Lax</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-semibold">{lang === 'bn' ? 'অ্যালগরিদম:' : 'Algorithm:'}</span>
                <span className="font-bold text-[#182619] font-mono">Bcrypt + JWT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#E39A2E]/20 text-[#C97C16] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F4C2E]">
                  {lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}
                </h2>
                <p className="text-xs text-gray-500 font-semibold">
                  {lang === 'bn'
                    ? 'আপনার এডমিন অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড সেট করুন'
                    : 'Update your admin account password to maintain system security'}
                </p>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 mb-6 ${
                  message.type === 'success'
                    ? 'bg-[#1E7A45]/10 text-[#1E7A45]'
                    : 'bg-[#C23B36]/10 text-[#C23B36]'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-[#182619] mb-1.5">
                  {lang === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F8F6] rounded-xl text-sm font-semibold text-[#182619] focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#182619] mb-1.5">
                  {lang === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F8F6] rounded-xl text-sm font-semibold text-[#182619] focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#182619] mb-1.5">
                  {lang === 'bn' ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F8F6] rounded-xl text-sm font-semibold text-[#182619] focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0F4C2E] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-[#1E7A45] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading
                  ? (lang === 'bn' ? 'আপডেট করা হচ্ছে...' : 'Updating...')
                  : (lang === 'bn' ? 'পাসওয়ার্ড আপডেট করুন' : 'Update Password')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
