'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">বর্জ্য ক্যাটেগরি ব্যবস্থাপনা</h1>
          <p className="text-xs text-[#3f4f40] font-semibold mt-1">
            নাগরিকদের রিপোর্ট জমা দেওয়ার সমস্যা ক্যাটেগরি নির্ধারণ
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 max-w-4xl">
        {loading ? (
          <div className="text-center py-8 text-xs font-bold text-[#3f4f40]">ক্যাটেগরি লোড হচ্ছে...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="bg-[#F6F8F6] text-[#182619]">
                  <th className="p-3.5 rounded-l-xl">আইডি (Slug)</th>
                  <th className="p-3.5">বাংলা নাম</th>
                  <th className="p-3.5">English Name</th>
                  <th className="p-3.5 rounded-r-xl">বিবরণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F6F8F6]/50 transition-colors">
                    <td className="p-3.5 font-mono text-[#0F4C2E] font-bold">{c.slug}</td>
                    <td className="p-3.5 font-bold">{c.nameBn}</td>
                    <td className="p-3.5">{c.nameEn}</td>
                    <td className="p-3.5 text-[#3f4f40]">{c.description || '—'}</td>
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
