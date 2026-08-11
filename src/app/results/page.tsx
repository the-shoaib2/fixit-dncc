'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n';
import { ArrowLeft, AlertTriangle, CheckCircle2, ShieldCheck, MapPin, X } from 'lucide-react';

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

export default function AllResultsPage() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<ResolvedReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchAllResolved() {
      try {
        const res = await fetch('/api/reports/resolved');
        const json = await res.json();
        if (json.success && json.data) {
          setItems(json.data);
        }
      } catch (err) {
        console.error('Failed to load resolved reports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllResolved();
  }, []);

  return (
    <div className="py-12 bg-[#F6F8F6] min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C2E] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
            </Link>
            <h1 className="text-3xl font-extrabold text-[#0F4C2E]">
              {lang === 'bn' ? 'সকল বিফোর অ্যান্ড আফটার ফলাফল' : 'All Before & After Results'}
            </h1>
            <p className="text-xs text-gray-600 mt-1 font-semibold">
              {lang === 'bn'
                ? 'ঢাকা উত্তর সিটি কর্পোরেশনের সম্পন্নকৃত ময়লা পরিষ্কার কার্যক্রমের তালিকা'
                : 'Complete archive of verified waste resolution actions by DNCC field teams'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse h-64">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-xs font-bold text-gray-500">
            {t('beforeAfter.noData')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                {/* Before & After Images */}
                <div className="grid grid-cols-2 h-44 relative overflow-hidden">
                  {/* Before Side */}
                  <div
                    onClick={() =>
                      setModalImage({
                        url: item.beforeImage,
                        title: `${item.publicId} — ${t('beforeAfter.before')}`,
                      })
                    }
                    className="relative h-full overflow-hidden bg-gray-900 cursor-pointer group"
                  >
                    <img
                      src={item.beforeImage}
                      alt="Reported waste"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 p-3 flex flex-col justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-red-600/80 px-2 py-0.5 rounded-full backdrop-blur-sm self-start">
                        <AlertTriangle className="w-3 h-3" />
                        {t('beforeAfter.before')}
                      </span>
                    </div>
                  </div>

                  {/* After Side */}
                  <div
                    onClick={() =>
                      setModalImage({
                        url: item.afterImage,
                        title: `${item.publicId} — ${t('beforeAfter.after')}`,
                      })
                    }
                    className="relative h-full overflow-hidden bg-gray-900 border-l border-white/20 cursor-pointer group"
                  >
                    <img
                      src={item.afterImage}
                      alt="Verified cleaned area"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 p-3 flex flex-col justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1E7A45]/90 px-2 py-0.5 rounded-full backdrop-blur-sm self-start">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('beforeAfter.after')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
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

      {/* Image Preview Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
          >
            <div className="p-4 bg-[#0F4C2E] text-white flex items-center justify-between">
              <span className="font-bold text-xs font-mono">{modalImage.title}</span>
              <button
                onClick={() => setModalImage(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center max-h-[80vh]">
              <img
                src={modalImage.url}
                alt="Enlarged view"
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
