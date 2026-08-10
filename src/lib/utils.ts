import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateReportId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `FIX-${year}-${randomNum}`;
}

export function formatDate(date: string | Date, locale: 'bn' | 'en' = 'bn'): string {
  const d = new Date(date);
  if (locale === 'en') {
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  
  // Bangla date formatting
  const bnNums: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const day = d.getDate().toString().replace(/\d/g, m => bnNums[m]);
  const month = months[d.getMonth()];
  const year = d.getFullYear().toString().replace(/\d/g, m => bnNums[m]);

  return `${day} ${month}, ${year}`;
}
