'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import { FolderTree, Plus, Trash2 } from 'lucide-react';

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

      <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)] max-w-4xl">
        {loading ? (
          <div className="text-center py-8 text-xs font-bold text-[#3f4f40]">ক্যাটেগরি লোড হচ্ছে...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b-2 border-[#182619] bg-[#EFEFE1] text-[#182619]">
                  <th className="p-3">আইডি (Slug)</th>
                  <th className="p-3">বাংলা নাম</th>
                  <th className="p-3">English Name</th>
                  <th className="p-3">বিবরণ</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-[#c9c8b3]">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F7EC]">
                    <td className="p-3 font-mono text-[#0F4C2E] font-bold">{c.slug}</td>
                    <td className="p-3 font-bold">{c.nameBn}</td>
                    <td className="p-3">{c.nameEn}</td>
                    <td className="p-3 text-[#3f4f40]">{c.description || '—'}</td>
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
