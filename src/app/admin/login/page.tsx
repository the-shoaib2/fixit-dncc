'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@dncc.gov.bd');
  const [password, setPassword] = useState('adminpassword123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setErrorMsg('Login failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFE1] grid-texture flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#F8F7EC] border-2 border-[#182619] rounded-lg p-8 shadow-[8px_8px_0_rgba(0,0,0,0.2)]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#0F4C2E] border-2 border-[#182619] rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldAlert className="w-8 h-8 text-[#E39A2E]" />
          </div>
          <h1 className="text-2xl font-black font-['Archivo'] text-[#182619]">DNCC Admin Portal</h1>
          <p className="text-xs text-[#3f4f40] font-semibold mt-1">
            ঢাকা উত্তর সিটি কর্পোরেশন এডমিন প্রবেশাধিকার
          </p>
        </div>

        {errorMsg && (
          <div className="bg-[#C23B36]/10 border-2 border-[#C23B36] text-[#C23B36] p-3 rounded-md text-xs font-bold flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#182619] mb-1">ইমেইল (Email)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#3f4f40] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-[#c9c8b3] rounded-md text-sm font-semibold focus:outline-none focus:border-[#0F4C2E] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#182619] mb-1">পাসওয়ার্ড (Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#3f4f40] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-[#c9c8b3] rounded-md text-sm font-semibold focus:outline-none focus:border-[#0F4C2E] bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F4C2E] text-white border-2 border-[#182619] rounded-md py-3 text-sm font-bold shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#1E7A45] transition-all"
          >
            {loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন (Login)'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#c9c8b3] text-center">
          <span className="text-[11px] text-[#3f4f40] font-semibold">
            ডিফল্ট ইমেইল: <code className="bg-[#EFEFE1] px-1.5 py-0.5 rounded border border-[#c9c8b3]">admin@dncc.gov.bd</code>
          </span>
        </div>
      </div>
    </div>
  );
}
