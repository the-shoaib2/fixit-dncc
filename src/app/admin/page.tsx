'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import Link from 'next/link';
import { FileText, CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'SUBMITTED' || r.status === 'UNDER_VERIFICATION').length;
  const verified = reports.filter((r) => r.status === 'VERIFIED').length;
  const inProgress = reports.filter((r) => r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS').length;
  const resolved = reports.filter((r) => r.status === 'RESOLVED').length;
  const rejected = reports.filter((r) => r.status === 'REJECTED').length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">কন্ট্রোল রুম ড্যাশবোর্ড</h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          ঢাকা উত্তর সিটি কর্পোরেশনের সামগ্রিক বর্জ্য অভিযোগ ও সমাধান পর্যবেক্ষণ
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">মোট রিপোর্ট</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#0F4C2E] mt-1">{total}</div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">যাচাইয়ের অপেক্ষায়</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#E39A2E] mt-1">{pending}</div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">যাচাই সম্পন্ন</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#1E7A45] mt-1">{verified}</div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">কাজ চলছে</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#C97C16] mt-1">{inProgress}</div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">সমাধান হয়েছে</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#2F9E5A] mt-1">{resolved}</div>
        </div>

        <div className="bg-white border-2 border-[#182619] rounded-md p-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
          <div className="text-xs font-bold text-[#3f4f40]">বাতিল (Rejected)</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#C23B36] mt-1">{rejected}</div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#0F4C2E]">সর্বশেষ প্রাপ্ত অভিযোগসমূহ</h3>
          <Link
            href="/admin/reports"
            className="text-xs font-bold text-[#0F4C2E] flex items-center gap-1 hover:underline"
          >
            সব দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs font-bold text-[#3f4f40]">ডেটা লোড হচ্ছে...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b-2 border-[#182619] bg-[#EFEFE1] text-[#182619]">
                  <th className="p-3">রিপোর্ট আইডি</th>
                  <th className="p-3">ক্যাটেগরি</th>
                  <th className="p-3">অবস্থান</th>
                  <th className="p-3">তারিখ</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-[#c9c8b3]">
                {reports.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8F7EC]">
                    <td className="p-3 font-['Archivo'] font-bold text-[#0F4C2E]">#{r.publicId}</td>
                    <td className="p-3">{r.category?.nameBn}</td>
                    <td className="p-3 max-w-[200px] truncate">{r.locationAddress}</td>
                    <td className="p-3">{formatDate(r.createdAt, 'bn')}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full border border-[#182619] text-[10px] font-bold ${
                          r.status === 'RESOLVED'
                            ? 'bg-[#2F9E5A] text-white'
                            : r.status === 'REJECTED'
                            ? 'bg-[#C23B36] text-white'
                            : 'bg-[#E39A2E] text-[#182619]'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/reports/${r.id}`}
                        className="inline-flex items-center gap-1 bg-[#EFEFE1] border border-[#182619] px-2.5 py-1 rounded text-[11px] font-bold hover:bg-[#E39A2E]"
                      >
                        <Eye className="w-3 h-3" /> বিস্তারিত
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
