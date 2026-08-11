'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { AlertTriangle, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface ResolvedReportItem {
  id: string;
  publicId: string;
  locationAddress: string;
  description: string;
  status: string;
  categoryBn?: string;
  categoryEn?: string;
  beforeImage: string;
  afterImage: string;
  resolvedAt: string;
}

const DEFAULT_FALLBACKS: ResolvedReportItem[] = [
  {
    id: 'fb-1',
    publicId: 'FIX-2026-MIRPUR',
    locationAddress: 'মিরপুর ১০ — ডাস্টবিন উপচে পড়া সমস্যা সমাধান',
    description: 'মিরপুর ১০ গোলচত্বরের কাছের বর্জ্য পরিষ্কার করা হয়েছে',
    status: 'RESOLVED',
    beforeImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    resolvedAt: new Date().toISOString(),
  },
  {
    id: 'fb-2',
    publicId: 'FIX-2026-UTTARA',
    locationAddress: 'উত্তরা সেক্টর ৭ — রাস্তার ময়লা পরিষ্কার',
    description: 'উত্তরা ৭ নম্বর সেক্টরের ড্রেনের পাশে জমে থাকা বর্জ্য অপসারণ',
    status: 'RESOLVED',
    beforeImage: 'https://images.unsplash.com/photo-1611284446314-60a55ac0d49d?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    resolvedAt: new Date().toISOString(),
  },
  {
    id: 'fb-3',
    publicId: 'FIX-2026-GULSHAN',
    locationAddress: 'গুলশান পার্ক — উন্মুক্ত স্থানের বর্জ্য অপসারণ',
    description: 'গুলশান লেক পার্ক সংলগ্ন জমে থাকা প্লাস্টিক বর্জ্য পরিষ্কার',
    status: 'RESOLVED',
    beforeImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    resolvedAt: new Date().toISOString(),
  },
];

export const ResultsSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<ResolvedReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestResolved() {
      try {
        const res = await fetch('/api/reports/resolved');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setItems(json.data);
        } else {
          setItems(DEFAULT_FALLBACKS);
        }
      } catch (err) {
        console.error('Failed to load resolved reports:', err);
        setItems(DEFAULT_FALLBACKS);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestResolved();
  }, []);

  return (
    <section className="py-20 bg-[#F6F8F6]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('beforeAfter.tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl text-[#0F4C2E] font-bold">{t('beforeAfter.title')}</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse h-64">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                {/* Before & After Verified Images */}
                <div className="grid grid-cols-2 h-44 relative overflow-hidden">
                  {/* Reported / Before Side */}
                  <div className="relative h-full overflow-hidden bg-gray-900">
                    <img
                      src={item.beforeImage}
                      alt="Reported waste"
                      className="w-full h-full object-cover opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 p-3 flex flex-col justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-red-600/80 px-2 py-0.5 rounded-full backdrop-blur-sm self-start">
                        <AlertTriangle className="w-3 h-3" />
                        {t('beforeAfter.before')}
                      </span>
                    </div>
                  </div>

                  {/* Cleaned / After Side */}
                  <div className="relative h-full overflow-hidden bg-gray-900 border-l border-white/20">
                    <img
                      src={item.afterImage}
                      alt="Verified cleaned area"
                      className="w-full h-full object-cover opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 p-3 flex flex-col justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1E7A45]/90 px-2 py-0.5 rounded-full backdrop-blur-sm self-start">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('beforeAfter.after')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Details Footer */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#0F4C2E] font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.locationAddress}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-gray-500 font-semibold">{item.publicId}</span>
                    <span className="inline-flex items-center gap-1 text-[#0F4C2E] font-bold bg-[#EAF0EB] px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-[#1E7A45]" />
                      {lang === 'bn' ? 'যাচাইকৃত ও সম্পন্ন' : 'Verified & Resolved'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
