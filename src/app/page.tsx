'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { WasteMap } from '@/components/WasteMap';
import { Camera, MapPin, Edit3, Send, Trash2, Archive, AlertTriangle, Building2, Trees, Zap, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const router = useRouter();

  // State
  const [stats, setStats] = useState({
    totalReports: 12480,
    resolvedReports: 9635,
    inProgress: 2140,
    cleaningDone: 785,
    citizenParticipation: 6320,
  });
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [trackQuery, setTrackQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Fetch stats
    fetch('/api/statistics')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .catch(() => {});

    // Fetch reports for map
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMapMarkers(data.data);
      })
      .catch(() => {});
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackQuery.trim()) {
      router.push(`/track?q=${encodeURIComponent(trackQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section id="top" className="relative bg-[#0F4C2E] text-[#F8F7EC] overflow-hidden border-b-2 border-[#182619] min-h-[calc(100vh-52px)] flex items-center">
        <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none"></div>
        <div className="relative max-w-[1180px] mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#E39A2E] text-[#182619] font-bold text-xs px-3 py-1.5 rounded-full border-2 border-[#182619] mb-6">
              {t('hero.eyebrow')}
            </span>
            <h1 className="font-['Archivo'] text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
              FixIt <em className="not-italic text-[#E39A2E]">DNCC</em>
              <br />
              Report Waste. Build a
              <br />
              Cleaner Dhaka.
            </h1>
            <p className="font-['Hind_Siliguri'] text-lg sm:text-xl font-semibold text-[#DCE8DD] max-w-xl mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 bg-[#E39A2E] text-[#182619] font-bold text-base px-6 py-3.5 rounded-full border-2 border-[#182619] shadow-[4px_4px_0_rgba(0,0,0,0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.4)] transition-all"
              >
                <Camera className="w-5 h-5" />
                {t('hero.ctaReport')}
              </Link>
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-transparent text-white font-bold text-base px-6 py-3.5 rounded-full border-2 border-white hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
                {t('hero.ctaTrack')}
              </Link>
            </div>
          </div>

          {/* Hero Ticket-Map Graphic */}
          <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-lg p-4 sm:p-5 shadow-[8px_8px_0_rgba(0,0,0,0.35)] text-[#182619]">
            <div className="relative rounded-md overflow-hidden bg-[#DDE6D3] grid-texture">
              {/* Instant design pins from index.html */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-[30%] left-[22%] w-4 h-4 rounded-full bg-[#C23B36] border-2 border-[#182619] shadow-sm animate-pulse" title="মিরপুর ১০ — জমা দেওয়া হয়েছে" />
                <div className="absolute top-[55%] left-[60%] w-4 h-4 rounded-full bg-[#E39A2E] border-2 border-[#182619] shadow-sm" title="উত্তরা — কাজ চলছে" />
                <div className="absolute top-[20%] left-[72%] w-4 h-4 rounded-full bg-[#2F9E5A] border-2 border-[#182619] shadow-sm" title="গুলশান — সমাধান হয়েছে" />
                <div className="absolute top-[72%] left-[38%] w-4 h-4 rounded-full bg-[#E39A2E] border-2 border-[#182619] shadow-sm" title="ধানমন্ডি — পরিদর্শনাধীন" />
              </div>
              <WasteMap markers={mapMarkers.slice(0, 5)} height="290px" />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-xs text-[#0F4C2E]">
                {t('hero.liveMapCaption')} — মিরপুর, উত্তরা, গুলশান
              </span>
            </div>
            <div className="flex justify-between items-center mt-1.5 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C23B36]"></span>
                {t('hero.status.submitted')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
                {t('hero.status.inProgress')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                {t('hero.status.resolved')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS BLOCK */}
      <section className="bg-[#0F4C2E] text-white border-b-2 border-[#182619] py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-11">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#E39A2E] uppercase block mb-2">
              {t('stats.campaignTag')}
            </span>
            <h2 className="text-2xl sm:text-3xl text-white font-bold">
              {t('stats.campaignTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4.5">
            <div className="ticket">
              <span className="stamp">DNCC</span>
              <div className="num">{stats.totalReports.toLocaleString()}</div>
              <div className="lbl">{t('stats.totalReports')}</div>
            </div>
            <div className="ticket">
              <span className="stamp">DNCC</span>
              <div className="num">{stats.resolvedReports.toLocaleString()}</div>
              <div className="lbl">{t('stats.resolvedReports')}</div>
            </div>
            <div className="ticket">
              <span className="stamp">DNCC</span>
              <div className="num">{stats.inProgress.toLocaleString()}</div>
              <div className="lbl">{t('stats.inProgress')}</div>
            </div>
            <div className="ticket">
              <span className="stamp">DNCC</span>
              <div className="num">{stats.cleaningDone.toLocaleString()}</div>
              <div className="lbl">{t('stats.cleanedActivity')}</div>
            </div>
            <div className="ticket col-span-2 md:col-span-1">
              <span className="stamp">DNCC</span>
              <div className="num">{stats.citizenParticipation.toLocaleString()}</div>
              <div className="lbl">{t('stats.citizenParticipation')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-11">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
              {t('howItWorks.tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl">{t('howItWorks.title')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-6">
              <div className="font-['Archivo'] font-black text-4xl text-[#EFEFE1] [-webkit-text-stroke:2px_#0F4C2E] mb-2">
                01
              </div>
              <Camera className="w-8 h-8 text-[#0F4C2E] stroke-[1.6] mb-3" />
              <h3 className="text-lg font-bold mb-2">{t('howItWorks.step1Title')}</h3>
              <p className="text-sm text-[#3f4f40] leading-relaxed">{t('howItWorks.step1Desc')}</p>
            </div>
            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-6">
              <div className="font-['Archivo'] font-black text-4xl text-[#EFEFE1] [-webkit-text-stroke:2px_#0F4C2E] mb-2">
                02
              </div>
              <MapPin className="w-8 h-8 text-[#0F4C2E] stroke-[1.6] mb-3" />
              <h3 className="text-lg font-bold mb-2">{t('howItWorks.step2Title')}</h3>
              <p className="text-sm text-[#3f4f40] leading-relaxed">{t('howItWorks.step2Desc')}</p>
            </div>
            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-6">
              <div className="font-['Archivo'] font-black text-4xl text-[#EFEFE1] [-webkit-text-stroke:2px_#0F4C2E] mb-2">
                03
              </div>
              <Edit3 className="w-8 h-8 text-[#0F4C2E] stroke-[1.6] mb-3" />
              <h3 className="text-lg font-bold mb-2">{t('howItWorks.step3Title')}</h3>
              <p className="text-sm text-[#3f4f40] leading-relaxed">{t('howItWorks.step3Desc')}</p>
            </div>
            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-6">
              <div className="font-['Archivo'] font-black text-4xl text-[#EFEFE1] [-webkit-text-stroke:2px_#0F4C2E] mb-2">
                04
              </div>
              <Send className="w-8 h-8 text-[#0F4C2E] stroke-[1.6] mb-3" />
              <h3 className="text-lg font-bold mb-2">{t('howItWorks.step4Title')}</h3>
              <p className="text-sm text-[#3f4f40] leading-relaxed">{t('howItWorks.step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WASTE CATEGORIES */}
      <section className="py-16 border-t-2 border-[#182619]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-11">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
              {t('categories.tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl">{t('categories.title')}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[18px]">
            <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
              <Trash2 className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
              <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.streetWaste')}</h3>
            </Link>
            <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
              <Archive className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
              <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.overflowingBin')}</h3>
            </Link>
            <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
              <AlertTriangle className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
              <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.illegalDumping')}</h3>
            </Link>
            <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
              <Building2 className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
              <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.constructionWaste')}</h3>
            </Link>
            <Link href="/report" className="bg-[#F8F7EC] border-2 border-[#182619] rounded-[6px] px-4 py-6 text-center h-full min-h-[145px] flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all">
              <Trees className="w-8 h-8 text-[#0F4C2E] mx-auto mb-3 stroke-[1.6]" />
              <h3 className="text-sm font-bold leading-snug text-[#182619]">{t('categories.parkWaste')}</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TRACK REPORT QUICK CARD */}
      <section className="py-16 bg-[#0F4C2E] text-white border-y-2 border-[#182619]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-[#0F4C2E] border-2 border-[#182619] rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#E39A2E] uppercase block mb-2">
                {t('track.tag')}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{t('track.title')}</h3>
              <p className="text-sm text-[#D9E5DA] mb-6">{t('track.subtitle')}</p>
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder={t('track.idPlaceholder')}
                  className="flex-1 bg-white text-[#182619] px-4 py-3 rounded-md text-sm font-semibold border-2 border-[#182619] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E39A2E] text-[#182619] font-bold px-6 py-3 rounded-md border-2 border-[#182619] hover:bg-[#C97C16] transition-colors"
                >
                  {t('track.btn')}
                </button>
              </form>
            </div>

            {/* Visual Timeline Sample */}
            <div className="bg-white text-[#182619] rounded-md p-5 border-2 border-[#182619]">
              <div className="font-extrabold text-xs text-[#3f4f40] mb-3">
                {lang === 'bn' ? 'নমুনা রিপোর্ট #FIX-2026-000101' : 'Sample Report #FIX-2026-000101'}
              </div>
              <div className="space-y-2.5 text-xs font-semibold">
                <div className="flex items-center gap-2.5 text-[#0F4C2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                  <span>{t('track.timeline.submitted')} — ১০ আগস্ট</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#0F4C2E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F9E5A]"></span>
                  <span>{t('track.timeline.verified')} — ১০ আগস্ট</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#E39A2E] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E39A2E]"></span>
                  <span>{t('track.timeline.inProgress')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#c9c8b3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c9c8b3]"></span>
                  <span>{t('track.timeline.resolved')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEFORE / AFTER EVIDENCE */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-11">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
              {t('beforeAfter.tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl">{t('beforeAfter.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
              <div className="grid grid-cols-2 h-36">
                <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <AlertTriangle className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.before')}</span>
                </div>
                <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <CheckCircle2 className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.after')}</span>
                </div>
              </div>
              <div className="p-4 text-sm font-semibold text-[#3f4f40]">
                মিরপুর ১০ — ডাস্টবিন উপচে পড়া সমস্যা সমাধান
              </div>
            </div>

            <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
              <div className="grid grid-cols-2 h-36">
                <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <AlertTriangle className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.before')}</span>
                </div>
                <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <CheckCircle2 className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.after')}</span>
                </div>
              </div>
              <div className="p-4 text-sm font-semibold text-[#3f4f40]">
                উত্তরা সেক্টর ৭ — রাস্তার ময়লা পরিষ্কার
              </div>
            </div>

            <div className="border-2 border-[#182619] rounded-lg overflow-hidden bg-white">
              <div className="grid grid-cols-2 h-36">
                <div className="bg-gradient-to-br from-[#7a6a4a] to-[#5c4f37] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <AlertTriangle className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.before')}</span>
                </div>
                <div className="bg-gradient-to-br from-[#1E7A45] to-[#0F4C2E] text-white p-3 flex flex-col justify-between font-['Archivo'] font-bold text-xs">
                  <CheckCircle2 className="w-6 h-6 opacity-80" />
                  <span>{t('beforeAfter.after')}</span>
                </div>
              </div>
              <div className="p-4 text-sm font-semibold text-[#3f4f40]">
                গুলশান পার্ক — উন্মুক্ত স্থানের বর্জ্য অপসারণ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LIVE DHAKA MAP */}
      <section id="map" className="py-16 bg-[#F8F7EC] border-t-2 border-[#182619]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-9">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
              Live Map
            </span>
            <h2 className="text-2xl sm:text-3xl">ইন্টারঅ্যাকটিভ ঢাকা শহর লাইভ রিপোর্ট ম্যাপ</h2>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-[#DDE6D3]">
            {/* Visual Vector Road Overlay matching index.html */}
            <div className="absolute inset-0 grid-texture pointer-events-none z-[1]">
              <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-[#0F4C2E]/20"></div>
              <div className="absolute top-0 bottom-0 left-[45%] w-[3px] bg-[#0F4C2E]/20"></div>
              <div className="absolute top-[65%] left-0 right-0 h-[3px] bg-[#0F4C2E]/20"></div>
            </div>

            {/* Live Leaflet Map */}
            <div className="relative z-[2]">
              <WasteMap markers={mapMarkers} height="440px" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY FIXIT DNCC */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-11">
            <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#1E7A45] uppercase block mb-2">
              {t('why.tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl">{t('why.title')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="p-3">
              <Zap className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{t('why.f1Title')}</h3>
              <p className="text-xs text-[#3f4f40]">{t('why.f1Desc')}</p>
            </div>
            <div className="p-3">
              <MapPin className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{t('why.f2Title')}</h3>
              <p className="text-xs text-[#3f4f40]">{t('why.f2Desc')}</p>
            </div>
            <div className="p-3">
              <ShieldCheck className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{t('why.f3Title')}</h3>
              <p className="text-xs text-[#3f4f40]">{t('why.f3Desc')}</p>
            </div>
            <div className="p-3">
              <CheckCircle2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{t('why.f4Title')}</h3>
              <p className="text-xs text-[#3f4f40]">{t('why.f4Desc')}</p>
            </div>
            <div className="p-3 col-span-2 sm:col-span-1">
              <Trash2 className="w-10 h-10 text-[#0F4C2E] mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{t('why.f5Title')}</h3>
              <p className="text-xs text-[#3f4f40]">{t('why.f5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
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
                <span className="font-['Archivo'] font-black text-xl">{openFaq === 0 ? '−' : '+'}</span>
              </button>
              {openFaq === 0 && (
                <p className="mt-3 text-sm text-[#3f4f40] leading-relaxed border-t border-[#c9c8b3] pt-3">
                  {t('faq.a1')}
                </p>
              )}
            </div>

            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
              >
                <span>{t('faq.q2')}</span>
                <span className="font-['Archivo'] font-black text-xl">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <p className="mt-3 text-sm text-[#3f4f40] leading-relaxed border-t border-[#c9c8b3] pt-3">
                  {t('faq.a2')}
                </p>
              )}
            </div>

            <div className="bg-[#F8F7EC] border-2 border-[#182619] rounded-md p-5">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full flex justify-between items-center text-left font-bold text-base text-[#0F4C2E]"
              >
                <span>{t('faq.q3')}</span>
                <span className="font-['Archivo'] font-black text-xl">{openFaq === 2 ? '−' : '+'}</span>
              </button>
              {openFaq === 2 && (
                <p className="mt-3 text-sm text-[#3f4f40] leading-relaxed border-t border-[#c9c8b3] pt-3">
                  {t('faq.a3')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="bg-[#E39A2E] border-t-2 border-[#182619] text-center py-16 px-6">
        <h2 className="text-2xl sm:text-3xl text-[#182619] font-bold max-w-2xl mx-auto mb-7">
          {t('cta.title')}
        </h2>
        <Link
          href="/report"
          className="inline-block bg-[#182619] text-[#F8F7EC] font-bold text-base px-8 py-4 rounded-full border-2 border-[#182619] shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_rgba(0,0,0,0.25)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          {t('cta.btn')}
        </Link>
      </section>
    </div>
  );
}
