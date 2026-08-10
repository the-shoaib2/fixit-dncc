'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface StatsSectionProps {
  stats: {
    totalReports: number;
    resolvedReports: number;
    inProgress: number;
    cleaningDone: number;
    citizenParticipation: number;
  };
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const { t } = useLanguage();

  return (
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
  );
};
