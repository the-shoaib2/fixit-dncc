'use client';

import React from 'react';
import { AdminLayout } from '../../../components/AdminLayout';

export default function AdminFaqPage() {
  const faqs = [
    {
      qBn: 'রিপোর্ট করতে কি অ্যাকাউন্ট লাগবে?',
      qEn: 'Do I need an account to submit a report?',
      aBn: 'না, সাধারণ রিপোর্ট অ্যাকাউন্ট ছাড়াই করা যাবে।',
      aEn: 'No, citizens can submit waste reports directly without registering.',
    },
    {
      qBn: 'রিপোর্ট করার পর কী হবে?',
      qEn: 'What happens after I submit a report?',
      aBn: 'DNCC টিম যাচাই করে ব্যবস্থা নেবে।',
      aEn: 'DNCC admin verifies the report and assigns field workers.',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">প্রশ্নোত্তর (FAQ) ব্যবস্থাপনা</h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          পাবলিক ওয়েবসাইটে প্রদর্শিত সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 max-w-4xl space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl p-4 bg-[#F6F8F6]">
            <h4 className="font-bold text-sm text-[#0F4C2E] mb-1">{f.qBn}</h4>
            <p className="text-xs text-[#3f4f40] mb-2">{f.aBn}</p>
            <div className="text-[11px] font-mono text-gray-500 border-t border-gray-200 pt-2">
              EN: {f.qEn}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
