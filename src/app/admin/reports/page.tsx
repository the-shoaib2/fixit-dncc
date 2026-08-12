'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import Link from 'next/link';
import { Search, Eye } from 'lucide-react';
import { formatDate } from '../../../lib/utils';
import { useLanguage } from '../../../lib/i18n';

export default function AdminReportsListPage() {
  const { lang, t } = useLanguage();
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

      {/* Search & Filter Controls - Clean No Border No Shadow */}
      <div className="bg-white rounded-2xl p-5 mb-6 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="আইডি, এলাকা, বিবরণ বা ফোন দিয়ে সার্চ করুন..."
            className="flex-1 px-4 py-2.5 bg-[#F6F8F6] text-[#182619] rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
          />
          <button
            type="submit"
            className="bg-[#0F4C2E] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#1E7A45] transition-colors"
          >
            <Search className="w-3.5 h-3.5" /> সার্চ
          </button>
        </form>

        <div className="flex flex-wrap gap-4 text-xs font-bold text-[#182619]">
          <div className="flex items-center gap-2">
            <label>{t('admin.colStatus')}:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-[#F6F8F6] focus:outline-none border-none text-xs font-semibold"
            >
              <option value="ALL">{lang === 'bn' ? 'সকল স্ট্যাটাস' : 'All Statuses'}</option>
              <option value="SUBMITTED">{t('track.status.SUBMITTED')}</option>
              <option value="UNDER_VERIFICATION">{t('track.status.UNDER_VERIFICATION')}</option>
              <option value="VERIFIED">{t('track.status.VERIFIED')}</option>
              <option value="ASSIGNED">{t('track.status.ASSIGNED')}</option>
              <option value="IN_PROGRESS">{t('track.status.IN_PROGRESS')}</option>
              <option value="RESOLVED">{t('track.status.RESOLVED')}</option>
              <option value="REJECTED">{t('track.status.REJECTED')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label>ক্যাটেগরি:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-[#F6F8F6] focus:outline-none border-none text-xs"
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
              className="px-3.5 py-1.5 rounded-full bg-[#F6F8F6] focus:outline-none border-none text-xs"
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

      {/* Reports Table - Clean No Border No Shadow */}
      <div className="bg-white rounded-2xl p-6">
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-[#3f4f40]">রিপোর্ট লোড হচ্ছে...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 text-xs font-bold text-[#C23B36]">কোনো রিপোর্ট পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="bg-[#F6F8F6] text-[#182619]">
                  <th className="p-3.5 rounded-l-xl">আইডি</th>
                  <th className="p-3.5">ছবি</th>
                  <th className="p-3.5">ক্যাটেগরি</th>
                  <th className="p-3.5">অবস্থান</th>
                  <th className="p-3.5">মোবাইল</th>
                  <th className="p-3.5">তারিখ</th>
                  <th className="p-3.5">অগ্রাধিকার</th>
                  <th className="p-3.5">স্ট্যাটাস</th>
                  <th className="p-3.5 text-right rounded-r-xl">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F6F8F6]/50 transition-colors">
                    <td className="p-3.5 font-['Archivo'] font-bold text-[#0F4C2E]">#{r.publicId}</td>
                    <td className="p-3.5">
                      {r.images && r.images.length > 0 ? (
                        <img
                          src={r.images[0].imageUrl}
                          alt="waste"
                          className="w-10 h-10 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/samples/waste-before.jpg';
                          }}
                        />
                      ) : (
                        <img
                          src="/samples/waste-before.jpg"
                          alt="waste"
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="p-3.5">{r.category?.nameBn}</td>
                    <td className="p-3.5 max-w-[180px] truncate">{r.locationAddress}</td>
                    <td className="p-3.5 font-mono text-gray-600">{r.mobileNumber || '—'}</td>
                    <td className="p-3.5">{formatDate(r.createdAt, 'bn')}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">
                        {r.priority}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.status === 'RESOLVED'
                            ? 'bg-[#2F9E5A] text-white'
                            : r.status === 'REJECTED'
                            ? 'bg-[#C23B36] text-white'
                            : 'bg-[#E39A2E] text-[#182619]'
                        }`}
                      >
                        {t(`track.status.${r.status}`) || r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/admin/reports/${r.id}`}
                        className="inline-flex items-center gap-1 bg-[#EAF0EB] text-[#0F4C2E] px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#0F4C2E] hover:text-white transition-colors"
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
