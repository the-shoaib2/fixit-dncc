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
    <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#0F4C2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-[#E39A2E]" />
          </div>
          <h1 className="text-2xl font-extrabold font-['Archivo'] text-[#0F4C2E]">DNCC Admin Portal</h1>
          <p className="text-xs text-[#4b5563] font-semibold mt-1">
            ঢাকা উত্তর সিটি কর্পোরেশন এডমিন প্রবেশাধিকার
          </p>
        </div>

        {errorMsg && (
          <div className="bg-[#C23B36]/10 text-[#C23B36] p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#182619] mb-1.5">ইমেইল (Email)</label>
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
            <label className="block text-xs font-bold text-[#182619] mb-1.5">পাসওয়ার্ড (Password)</label>
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
            className="w-full bg-[#0F4C2E] text-white rounded-full py-3.5 text-sm font-bold hover:bg-[#1E7A45] transition-all"
          >
            {loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন (Login)'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <span className="text-xs text-[#4b5563] font-semibold">
            ডিফল্ট ইমেইল: <code className="bg-[#F6F8F6] px-2 py-1 rounded-md">admin@dncc.gov.bd</code>
          </span>
        </div>
      </div>
    </div>
  );
}

