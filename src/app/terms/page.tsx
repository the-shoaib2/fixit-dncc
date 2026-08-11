'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 bg-[#F6F8F6] min-h-[calc(100vh-64px)]">
      <div className="max-w-[800px] mx-auto px-6 bg-white rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-[#0F4C2E] mb-6">ব্যবহারের শর্তাবলী (Terms of Use)</h1>
        <div className="space-y-4 text-sm text-[#4b5563] leading-relaxed">
          <p>
            FixIt DNCC সেবা ব্যবহারের মাধ্যমে আপনি নিচের শর্তাবলীতে সম্মত হচ্ছেন:
          </p>
          <h3 className="font-bold text-base text-[#182619]">১. সঠিক তথ্য প্রদান</h3>
          <p>
            প্ল্যাটফর্মে কেবল প্রকৃত ও সঠিক বর্জ্য সংক্রান্ত অভিযোগ ও ছবি জমা দিতে হবে। কোনো ধরনের ভুয়া, বিভ্রান্তিকর বা অসত্য রিপোর্ট জমা প্রদান নিষিদ্ধ।
          </p>
          <h3 className="font-bold text-base text-[#182619]">২. প্ল্যাটফর্ম অপব্যবহার রোধ</h3>
          <p>
            প্ল্যাটফর্মের কার্যকারিতা ব্যাহত করতে বা সিস্টেমের ক্ষতি করার উদ্দেশ্যে কোনো স্ক্রিপ্ট বা স্প্যামিং গ্রহণযোগ্য হবে না।
          </p>
          <h3 className="font-bold text-base text-[#182619]">৩. পরিবর্তন ও অধিকার</h3>
          <p>
            ঢাকা উত্তর সিটি কর্পোরেশন প্ল্যাটফর্মের সুবিধাদি বা শর্তাবলী যে কোনো সময় সংশোধন বা পরিমার্জন করার অধিকার সংরক্ষণ করে।
          </p>
        </div>
      </div>
    </div>
  );
}

