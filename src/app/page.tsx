'use client';

import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { QuickTrackSection } from '../components/home/QuickTrackSection';
import { ResultsSection } from '../components/home/ResultsSection';
import { LiveMapSection } from '../components/home/LiveMapSection';
import { WhySection } from '../components/home/WhySection';
import { FaqSection } from '../components/home/FaqSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    inProgress: 0,
    cleaningDone: 0,
    citizenParticipation: 0,
  });
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);

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

  return (
    <main>
      {/* 1. HERO SECTION */}
      <HeroSection mapMarkers={mapMarkers} />

      {/* 2. STATISTICS BLOCK */}
      <StatsSection stats={stats} />

      {/* 3. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 4. WASTE CATEGORIES */}
      <CategoriesSection />

      {/* 5. TRACK REPORT QUICK CARD */}
      <QuickTrackSection />

      {/* 6. BEFORE / AFTER EVIDENCE */}
      <ResultsSection />

      {/* 7. LIVE DHAKA MAP */}
      <LiveMapSection mapMarkers={mapMarkers} />

      {/* 8. WHY FIXIT DNCC */}
      <WhySection />

      {/* 9. FAQ ACCORDION */}
      <FaqSection />

      {/* 10. FINAL CTA */}
      <FinalCtaSection />
    </main>
  );
}
