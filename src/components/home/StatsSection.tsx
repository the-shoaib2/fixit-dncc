'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { NumberTicker } from '../ui/number-ticker';

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
    <section className="bg-[#0A3822] text-white py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-['Archivo'] font-extrabold text-xs tracking-widest text-[#E39A2E] uppercase block mb-2">
            {t('stats.campaignTag')}
          </span>
          <h2 className="text-2xl sm:text-4xl text-white font-bold">
            {t('stats.campaignTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          <div className="ticket">
            <span className="stamp">DNCC</span>
            <div className="num">
              <NumberTicker value={stats.totalReports} startValue={0} />
            </div>
            <div className="lbl">{t('stats.totalReports')}</div>
          </div>

          <div className="ticket">
            <span className="stamp">DNCC</span>
            <div className="num">
              <NumberTicker value={stats.resolvedReports} startValue={0} />
            </div>
            <div className="lbl">{t('stats.resolvedReports')}</div>
          </div>

          <div className="ticket">
            <span className="stamp">DNCC</span>
            <div className="num">
              <NumberTicker value={stats.inProgress} startValue={0} />
            </div>
            <div className="lbl">{t('stats.inProgress')}</div>
          </div>

          <div className="ticket">
            <span className="stamp">DNCC</span>
            <div className="num">
              <NumberTicker value={stats.cleaningDone} startValue={0} />
            </div>
            <div className="lbl">{t('stats.cleanedActivity')}</div>
          </div>

          <div className="ticket col-span-2 md:col-span-1">
            <span className="stamp">DNCC</span>
            <div className="num">
              <NumberTicker value={stats.citizenParticipation} startValue={0} />
            </div>
            <div className="lbl">{t('stats.citizenParticipation')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
