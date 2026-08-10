'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import { WasteMap } from '../../../components/WasteMap';
import { Filter } from 'lucide-react';

export default function AdminMapPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/admin/reports?';
    if (statusFilter !== 'ALL') url += `status=${statusFilter}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">এডমিন লাইভ ম্যাপ (Admin Waste Map)</h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          ঢাকা উত্তর সিটি কর্পোরেশনের ফিল্ড রিপোর্টের রিয়েল-টাইম জিপিএস ম্যাপ
        </p>
      </div>

      {/* Map Control Bar */}
      <div className="bg-white border-2 border-[#182619] rounded-lg p-4 mb-6 flex items-center gap-4 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 text-xs font-bold">
          <Filter className="w-4 h-4 text-[#0F4C2E]" /> ফিল্টার:
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md text-xs font-bold bg-white focus:outline-none"
        >
          <option value="ALL">সকল স্ট্যাটাস (All Statuses)</option>
          <option value="SUBMITTED">SUBMITTED</option>
          <option value="UNDER_VERIFICATION">UNDER_VERIFICATION</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>

      {loading ? (
        <div className="h-[500px] bg-[#DDE6D3] border-2 border-[#182619] rounded-lg flex items-center justify-center font-bold text-[#0F4C2E]">
          ম্যাপ লোড হচ্ছে...
        </div>
      ) : (
        <WasteMap markers={reports} height="560px" />
      )}
    </AdminLayout>
  );
}
