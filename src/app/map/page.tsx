'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { WasteMap } from '../../components/WasteMap';
import { Filter } from 'lucide-react';

export default function MapPage() {
  const { lang, t } = useLanguage();
  const [reports, setReports] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = '/api/reports?';
    if (selectedCat !== 'ALL') url += `category=${selectedCat}&`;
    if (selectedStatus !== 'ALL') url += `status=${selectedStatus}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .finally(() => setLoading(false));
  }, [selectedCat, selectedStatus]);

  return (
    <div className="py-12 bg-[#F6F8F6] min-h-[calc(100vh-64px)]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            Live Map
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F4C2E] mb-3">ইন্টারঅ্যাকটিভ ঢাকা শহর লাইভ রিপোর্ট ম্যাপ</h1>
          <p className="text-sm text-[#4b5563]">
            ঢাকা উত্তর সিটি কর্পোরেশনের এলাকার সকল সচল ও সমাধানকৃত বর্জ্য রিপোর্টের লাইভ মানচিত্র।
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xs text-[#0F4C2E] uppercase tracking-wider">
            <Filter className="w-4 h-4" /> ফিল্টার:
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#182619]">ক্যাটেগরি:</label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-4 py-2 rounded-xl bg-[#F6F8F6] text-xs font-semibold text-[#182619] border-none focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
            >
              <option value="ALL">সকল ক্যাটেগরি</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {lang === 'bn' ? c.nameBn : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#182619]">স্ট্যাটাস:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 rounded-xl bg-[#F6F8F6] text-xs font-semibold text-[#182619] border-none focus:outline-none focus:ring-2 focus:ring-[#0F4C2E]"
            >
              <option value="ALL">সকল স্ট্যাটাস</option>
              <option value="SUBMITTED">জমা দেওয়া হয়েছে</option>
              <option value="IN_PROGRESS">কাজ চলছে</option>
              <option value="RESOLVED">সমাধান হয়েছে</option>
            </select>
          </div>
        </div>

        {/* Map Container */}
        <WasteMap markers={reports} height="540px" />
      </div>
    </div>
  );
}

