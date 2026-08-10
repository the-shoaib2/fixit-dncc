'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import Link from 'next/link';
import { Search, Filter, Eye, AlertCircle } from 'lucide-react';
import { formatDate, SAMPLE_BEFORE_IMAGE } from '../../../lib/utils';

export default function AdminReportsListPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      });
  }, []);

  const loadReports = () => {
    setLoading(true);
    let url = '/api/admin/reports?';
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (status !== 'ALL') url += `status=${status}&`;
    if (category !== 'ALL') url += `categoryId=${category}&`;
    if (priority !== 'ALL') url += `priority=${priority}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReports();
  }, [status, category, priority]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadReports();
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">অভিযোগ তালিকা (All Reports)</h1>
          <p className="text-xs text-[#3f4f40] font-semibold mt-1">
            নাগরিকদের পাঠানো সকল বর্জ্য রিপোর্টের সার্চ ও ফিল্টার তালিকা
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border-2 border-[#182619] rounded-lg p-5 mb-6 shadow-[4px_4px_0_rgba(0,0,0,0.06)] space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="আইডি, এলাকা, বিবরণ বা ফোন দিয়ে সার্চ করুন..."
            className="flex-1 px-3.5 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none focus:border-[#0F4C2E]"
          />
          <button
            type="submit"
            className="bg-[#0F4C2E] text-white border-2 border-[#182619] px-5 py-2 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-[#1E7A45]"
          >
            <Search className="w-3.5 h-3.5" /> সার্চ
          </button>
        </form>

        <div className="flex flex-wrap gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <label>স্ট্যাটাস:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md focus:outline-none bg-white"
            >
              <option value="ALL">সকল (All Statuses)</option>
              <option value="SUBMITTED">SUBMITTED (জমা)</option>
              <option value="UNDER_VERIFICATION">UNDER_VERIFICATION (যাচাই চলছে)</option>
              <option value="VERIFIED">VERIFIED (যাচাই সম্পন্ন)</option>
              <option value="ASSIGNED">ASSIGNED (দায়িত্ব অর্পণ)</option>
              <option value="IN_PROGRESS">IN_PROGRESS (কাজ চলছে)</option>
              <option value="RESOLVED">RESOLVED (সমাধান)</option>
              <option value="REJECTED">REJECTED (বাতিল)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label>ক্যাটেগরি:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md focus:outline-none bg-white"
            >
              <option value="ALL">সকল ক্যাটেগরি</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameBn} ({c.nameEn})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label>অগ্রাধিকার (Priority):</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md focus:outline-none bg-white"
            >
              <option value="ALL">সকল অগ্রাধিকার</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="URGENT">URGENT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-[#3f4f40]">রিপোর্ট লোড হচ্ছে...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 text-xs font-bold text-[#C23B36]">কোনো রিপোর্ট পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b-2 border-[#182619] bg-[#EFEFE1] text-[#182619]">
                  <th className="p-3">আইডি</th>
                  <th className="p-3">ছবি</th>
                  <th className="p-3">ক্যাটেগরি</th>
                  <th className="p-3">অবস্থান</th>
                  <th className="p-3">মোবাইল</th>
                  <th className="p-3">তারিখ</th>
                  <th className="p-3">অগ্রাধিকার</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-[#c9c8b3]">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8F7EC]">
                    <td className="p-3 font-['Archivo'] font-bold text-[#0F4C2E]">#{r.publicId}</td>
                    <td className="p-3">
                      {r.images && r.images.length > 0 ? (
                        <img
                          src={r.images[0].imageUrl}
                          alt="Report photo"
                          className="w-10 h-10 object-cover rounded border border-[#182619]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = SAMPLE_BEFORE_IMAGE;
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-[#EFEFE1] rounded border border-[#c9c8b3] flex items-center justify-center text-[10px] text-[#7f9280]">
                          No Photo
                        </div>
                      )}
                    </td>
                    <td className="p-3">{r.category?.nameBn}</td>
                    <td className="p-3 max-w-[180px] truncate">{r.locationAddress}</td>
                    <td className="p-3">{r.mobileNumber || '—'}</td>
                    <td className="p-3">{formatDate(r.createdAt, 'bn')}</td>
                    <td className="p-3 font-bold">{r.priority}</td>
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
                        <Eye className="w-3 h-3" /> ম্যানেজ করুন
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
