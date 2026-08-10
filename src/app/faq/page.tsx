'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';

export default function FaqPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    {
      q: 'কোন এলাকাগুলো FixIt DNCC প্ল্যাটফর্মের আওতায়?',
      a: 'ঢাকা উত্তর সিটি কর্পোরেশনের (DNCC) অধীনস্থ সকল ওয়ার্ড ও এলাকা যেমন মিরপুর, উত্তরা, গুলশান, বনানী, ধানমন্ডি (আংশিক), মোহাম্মদপুর, বাড্ডা ইত্যাদি প্ল্যাটফর্মের আওতায় অন্তর্ভুক্ত।',
    },
    {
      q: 'জরুরি মুহূর্তে হটলাইনে যোগাযোগ কীভাবে করবো?',
      a: 'যে কোনো জরুরি পরিচ্ছন্নতা অভিযোগের জন্য ঢাকা উত্তর সিটি কর্পোরেশনের কল সেন্টারে সরাসরি ১৬১০৬ নম্বরে কল করতে পারেন।',
    },
  ];

  return (
    <div className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[760px] mx-auto px-6">
        <div className="text-center mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('faq.tag')}
          </span>
          <h1 className="text-3xl font-bold mb-3">{t('faq.title')}</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white border-2 border-[#182619] rounded-lg p-5 shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
                >
                  <span>{faq.q}</span>
                  <span className={`font-['Archivo'] font-black text-xl inline-block transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#C23B36]' : 'rotate-0'}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[#c9c8b3]' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#3f4f40] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
