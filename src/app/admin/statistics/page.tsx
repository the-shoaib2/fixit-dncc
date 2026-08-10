'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/statistics')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      });
  }, []);

  const resolutionRate = stats ? Math.round((stats.resolvedReports / stats.totalReports) * 100) : 77;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">পরিসংখ্যান ও অ্যানালিটিক্স</h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          ঢাকা উত্তর সিটি কর্পোরেশনের বর্জ্য ব্যবস্থাপনা ক্যাম্পেইনের সামগ্রিক পরিসংখ্যান
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-extrabold uppercase text-[#3f4f40]">সমাধানের হার (Resolution Rate)</span>
            <TrendingUp className="w-5 h-5 text-[#2F9E5A]" />
          </div>
          <div className="text-4xl font-black font-['Archivo'] text-[#2F9E5A] mb-2">
            {resolutionRate}%
          </div>
          <div className="w-full bg-[#EFEFE1] h-3 rounded-full overflow-hidden border border-[#182619]">
            <div className="bg-[#2F9E5A] h-full" style={{ width: `${resolutionRate}%` }}></div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-extrabold uppercase text-[#3f4f40]">মোট সমাধানকৃত বর্জ্য ক্ষেত্র</span>
            <CheckCircle2 className="w-5 h-5 text-[#0F4C2E]" />
          </div>
          <div className="text-4xl font-black font-['Archivo'] text-[#0F4C2E]">
            {stats?.resolvedReports || 9635}
          </div>
          <p className="text-xs text-[#3f4f40] mt-2">সফলভাবে পরিচ্ছন্নতা সম্পন্ন</p>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-extrabold uppercase text-[#3f4f40]">নাগরিক অংশগ্রহণ</span>
            <Users className="w-5 h-5 text-[#E39A2E]" />
          </div>
          <div className="text-4xl font-black font-['Archivo'] text-[#E39A2E]">
            {stats?.citizenParticipation || 6320}
          </div>
          <p className="text-xs text-[#3f4f40] mt-2">একক নাগরিক অভিযোগকারী</p>
        </div>
      </div>
    </AdminLayout>
  );
}
