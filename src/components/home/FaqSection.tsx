'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619]">
      <div className="max-w-[760px] mx-auto px-6">
        <div className="text-center mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('faq.tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl">{t('faq.title')}</h2>
        </div>

        <div className="space-y-3.5">
          <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5">
            <button
              onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
            >
              <span>{t('faq.q1')}</span>
              <span className={`font-['Archivo'] font-black text-xl inline-block transition-transform duration-300 ${openFaq === 0 ? 'rotate-45 text-[#C23B36]' : 'rotate-0'}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${openFaq === 0 ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[#c9c8b3]' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="text-sm text-[#3f4f40] leading-relaxed">
                  {t('faq.a1')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5">
            <button
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
            >
              <span>{t('faq.q2')}</span>
              <span className={`font-['Archivo'] font-black text-xl inline-block transition-transform duration-300 ${openFaq === 1 ? 'rotate-45 text-[#C23B36]' : 'rotate-0'}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${openFaq === 1 ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[#c9c8b3]' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="text-sm text-[#3f4f40] leading-relaxed">
                  {t('faq.a2')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5">
            <button
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
            >
              <span>{t('faq.q3')}</span>
              <span className={`font-['Archivo'] font-black text-xl inline-block transition-transform duration-300 ${openFaq === 2 ? 'rotate-45 text-[#C23B36]' : 'rotate-0'}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${openFaq === 2 ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[#c9c8b3]' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="text-sm text-[#3f4f40] leading-relaxed">
                  {t('faq.a3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
