'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { WasteMap } from '@/components/WasteMap';
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
    <div className="py-12 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            Live Map
          </span>
          <h1 className="text-3xl font-bold mb-3">ইন্টারঅ্যাকটিভ ঢাকা শহর লাইভ রিপোর্ট ম্যাপ</h1>
          <p className="text-sm text-[#3f4f40]">
            ঢাকা উত্তর সিটি কর্পোরেশনের এলাকার সকল সচল ও সমাধানকৃত বর্জ্য রিপোর্টের লাইভ মানচিত্র।
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-[#182619] rounded-lg p-4 mb-6 flex flex-wrap items-center gap-4 shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2 font-bold text-xs text-[#0F4C2E] uppercase tracking-wider">
            <Filter className="w-4 h-4" /> ফিল্টার:
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold">ক্যাটেগরি:</label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none"
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
            <label className="text-xs font-bold">স্ট্যাটাস:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">সকল স্ট্যাটাস</option>
              <option value="SUBMITTED">জমা দেওয়া হয়েছে</option>
              <option value="IN_PROGRESS">কাজ চলছে</option>
              <option value="RESOLVED">সমাধান হয়েছে</option>
            </select>
          </div>
        </div>

        {/* Map Container */}
        <WasteMap markers={reports} height="520px" />
      </div>
    </div>
  );
}
