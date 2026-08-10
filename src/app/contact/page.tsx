'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            Contact Us
          </span>
          <h1 className="text-3xl font-bold mb-3">যোগাযোগ করুন</h1>
          <p className="text-sm text-[#3f4f40]">
            ঢাকা উত্তর সিটি কর্পোরেশনের বর্জ্য ব্যবস্থাপনা বিভাগ ও কন্ট্রোল রুমের সাথে যোগাযোগ করার মাধ্যম।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#182619] rounded-lg p-6 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#0F4C2E] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-base text-[#182619]">প্রধান কার্যালয়</h4>
                <p className="text-xs text-[#3f4f40] mt-1">
                  নগর ভবন, প্লট ২৩-২৬, রোড ৪৬, গুলশান-২, ঢাকা-১২১২
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#182619] rounded-lg p-6 flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#0F4C2E] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-base text-[#182619]">জরুরি হটলাইন</h4>
                <p className="text-xs text-[#3f4f40] mt-1">১৬১০৬ (টোল ফ্রি)</p>
                <p className="text-xs text-[#3f4f40]">+88 02 9894350</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#182619] rounded-lg p-6 flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#0F4C2E] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-base text-[#182619]">ইমেইল</h4>
                <p className="text-xs text-[#3f4f40] mt-1">info@dncc.gov.bd</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white border-2 border-[#182619] rounded-lg p-7 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#2F9E5A] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#0F4C2E] mb-2">বার্তা পাঠানো হয়েছে!</h3>
                <p className="text-sm text-[#3f4f40]">
                  আপনার মতামত বা প্রশ্নের জন্য ধন্যবাদ। DNCC টিম দ্রুত যোগাযোগ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F4C2E] mb-2">সরাসরি বার্তা পাঠান</h3>
                <div>
                  <label className="block text-xs font-bold mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-sm font-semibold focus:outline-none focus:border-[#0F4C2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-sm font-semibold focus:outline-none focus:border-[#0F4C2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">বার্তা</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-sm font-semibold focus:outline-none focus:border-[#0F4C2E]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0F4C2E] text-white border-2 border-[#182619] rounded-md py-3 font-bold text-sm shadow-[3px_3px_0_#182619] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> বার্তা পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
