'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[800px] mx-auto px-6 bg-white border-2 border-[#182619] rounded-lg p-8 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold text-[#0F4C2E] mb-6">গোপনীয়তা নীতি (Privacy Policy)</h1>
        <div className="space-y-4 text-sm text-[#3f4f40] leading-relaxed">
          <p>
            FixIt DNCC হল ঢাকা উত্তর সিটি কর্পোরেশনের একটি উন্মুক্ত নাগরিক বর্জ্য অভিযোগ ব্যবস্থাপনা প্ল্যাটফর্ম। আমরা নাগরিকদের তথ্যের সর্বোচ্চ গোপনীয়তা ও সুরক্ষা নিশ্চিত করতে অঙ্গীকারবদ্ধ।
          </p>
          <h3 className="font-bold text-base text-[#182619]">১. তথ্য সংগ্রহ ও ব্যবহার</h3>
          <p>
            রিপোর্ট পেশ করার সময় নাগরিকরা যে ছবি, অবস্থান (GPS/ম্যানুয়াল) এবং ঐচ্ছিক মোবাইল নম্বর জমা প্রদান করেন, তা কেবল বর্জ্য অপসারণ ও সেবা পর্যবেক্ষণের উদ্দেশ্যে ব্যবহার করা হয়।
          </p>
          <h3 className="font-bold text-base text-[#182619]">২. নাগরিক পরিচয় ও সর্বসাধারণের প্রবেশাধিকার</h3>
          <p>
            পাবলিক ম্যাপ বা প্রকাশ্যে কখনোই কোনো নাগরিকের ফোন নম্বর, নাম বা ব্যক্তিগত পরিচয় প্রদর্শন করা হবে না।
          </p>
          <h3 className="font-bold text-base text-[#182619]">৩. ডেটা নিরাপত্তা</h3>
          <p>
            সংগৃহীত তথ্য সুরক্ষিত সার্ভারে সংরক্ষণ করা হয় এবং তা কোনো তৃতীয় পক্ষের নিকট বিপণনের উদ্দেশ্যে প্রদান করা হয় না।
          </p>
        </div>
      </div>
    </div>
  );
}
