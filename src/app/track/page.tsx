'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../lib/i18n';
import { Search, CheckCircle2, Clock, AlertTriangle, FileText, MapPin } from 'lucide-react';
import { formatDate, SAMPLE_BEFORE_IMAGE, SAMPLE_AFTER_IMAGE } from '../../lib/utils';

function TrackPageContent() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchTrackData = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/reports/track?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success) {
        setReports(data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchTrackData(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackData(query);
  };

  return (
    <div className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-11">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
            {t('track.tag')}
          </span>
          <h1 className="text-3xl font-bold mb-3">{t('track.title')}</h1>
          <p className="text-base text-[#3f4f40]">{t('track.subtitle')}</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)] mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="যেমন: FIX-2026-000101 অথবা মোবাইল নম্বর"
              className="flex-1 px-4 py-3 border-2 border-[#c9c8b3] rounded-md font-semibold text-sm focus:outline-none focus:border-[#0F4C2E]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#E39A2E] text-[#182619] border-2 border-[#182619] rounded-md px-6 py-3 font-bold text-sm hover:bg-[#C97C16] transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {t('track.btn')}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-12 text-[#0F4C2E] font-bold">
            স্ট্যাটাস খোঁজা হচ্ছে...
          </div>
        ) : searched && reports.length === 0 ? (
          <div className="max-w-md mx-auto bg-[#C23B36]/10 border-2 border-[#C23B36] rounded-lg p-6 text-center text-[#C23B36] font-bold">
            {t('track.notFound')}
          </div>
        ) : (
          <div className="space-y-8">
            {reports.map((report) => (
              <div
                key={report.publicId}
                className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)] max-w-3xl mx-auto"
              >
                <div className="flex flex-wrap items-center justify-between border-b-2 border-[#EFEFE1] pb-4 mb-5 gap-3">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#3f4f40] block">
                      রিপোর্ট আইডি
                    </span>
                    <span className="font-['Archivo'] font-black text-2xl text-[#0F4C2E]">
                      #{report.publicId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-[#182619] ${
                        report.status === 'RESOLVED'
                          ? 'bg-[#2F9E5A] text-white'
                          : report.status === 'REJECTED'
                          ? 'bg-[#C23B36] text-white'
                          : 'bg-[#E39A2E] text-[#182619]'
                      }`}
                    >
                      {t(`track.timeline.${report.status.toLowerCase()}`) || report.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="font-bold text-[#3f4f40] block">ক্যাটেগরি:</span>
                    <span className="font-semibold text-[#182619]">
                      {lang === 'bn' ? report.category?.nameBn : report.category?.nameEn}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#3f4f40] block">জমা দেওয়ার তারিখ:</span>
                    <span className="font-semibold text-[#182619]">
                      {formatDate(report.createdAt, lang)}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-bold text-[#3f4f40] flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#0F4C2E]" /> অবস্থান:
                    </span>
                    <span className="font-semibold text-[#182619]">{report.locationAddress}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-bold text-[#3f4f40] flex items-center gap-1">
                      <FileText className="w-4 h-4 text-[#0F4C2E]" /> বিবরণ:
                    </span>
                    <span className="text-[#182619]">{report.description}</span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5 mb-6">
                  <h4 className="font-bold text-xs uppercase text-[#0F4C2E] tracking-wider mb-3">
                    অগ্রগতির ইতিহাস (Timeline)
                  </h4>
                  <div className="space-y-3 border-l-2 border-[#182619] ml-2 pl-4">
                    {report.statusHistory?.map((h: any, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#E39A2E] border-2 border-[#182619]" />
                        <div className="text-xs font-bold text-[#182619]">
                          {t(`track.timeline.${h.status.toLowerCase()}`) || h.status}
                        </div>
                        <div className="text-[11px] text-[#3f4f40]">
                          {formatDate(h.createdAt, lang)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before & After Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t-2 border-[#EFEFE1]">
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-[#3f4f40] mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C23B36]"></span>
                      {t('beforeAfter.before')} (সমস্যা)
                    </span>
                    <img
                      src={
                        report.images?.find((img: any) => img.type === 'BEFORE')?.imageUrl ||
                        report.images?.[0]?.imageUrl ||
                        SAMPLE_BEFORE_IMAGE
                      }
                      alt="Before Waste"
                      className="w-full h-44 object-cover border-2 border-[#182619] rounded-md shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:opacity-95 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = SAMPLE_BEFORE_IMAGE;
                      }}
                    />
                  </div>

                  {report.cleaningActivity?.afterImageUrl ? (
                    <div>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2F9E5A] mb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2F9E5A]"></span>
                        {t('beforeAfter.after')} (সমাধান)
                      </span>
                      <img
                        src={report.cleaningActivity.afterImageUrl}
                        alt="After Cleanup"
                        className="w-full h-44 object-cover border-2 border-[#182619] rounded-md shadow-[3px_3px_0_rgba(0,0,0,0.1)] hover:opacity-95 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = SAMPLE_AFTER_IMAGE;
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#7f9280] mb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E39A2E]"></span>
                        {t('beforeAfter.after')} (অপেক্ষমাণ)
                      </span>
                      <div className="flex flex-col justify-center items-center bg-[#F8F7EC] border-2 border-dashed border-[#c9c8b3] rounded-md h-44 p-4 text-center">
                        <span className="text-xs font-bold text-[#0F4C2E] mb-1">পরিচ্ছন্নতা কার্যক্রম চলমান</span>
                        <span className="text-[11px] text-[#3f4f40]">DNCC পরিচ্ছন্নতা দল এলাকাটি পরিস্কার করার পর আফটার ছবি প্রকাশ করবে</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 font-bold text-[#0F4C2E]">লোড হচ্ছে...</div>}>
      <TrackPageContent />
    </Suspense>
  );
}
