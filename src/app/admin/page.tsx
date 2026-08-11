'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import Link from 'next/link';
import { FileText, CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n';

export default function AdminDashboardPage() {
  const { lang, t } = useLanguage();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReports = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch('/api/admin/reports');
      const data = await res.json();
      if (data.success) setReports(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleRefresh = () => {
    fetchReports(true);
  };

  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'SUBMITTED' || r.status === 'UNDER_VERIFICATION').length;
  const verified = reports.filter((r) => r.status === 'VERIFIED').length;
  const inProgress = reports.filter((r) => r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS').length;
  const resolved = reports.filter((r) => r.status === 'RESOLVED').length;
  const rejected = reports.filter((r) => r.status === 'REJECTED').length;

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">
            {t('admin.title')}
          </h1>
          <p className="text-xs text-[#3f4f40] font-semibold mt-1">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Dashboard Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="inline-flex items-center justify-center gap-2 bg-[#E39A2E] hover:bg-[#d58e24] active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed text-[#182619] px-4 py-2.5 rounded-full font-bold text-xs shadow-sm hover:shadow transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap min-w-[110px]"
          title={t('admin.refresh')}
        >
          <RefreshCw className={`w-4 h-4 shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="leading-none">{refreshing ? t('admin.refreshing') : t('admin.refresh')}</span>
        </button>
      </div>

      {/* Metrics Cards - Clean No Border No Shadow */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.totalReports')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#0F4C2E] mt-1">{total}</div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.pendingVerification')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#E39A2E] mt-1">{pending}</div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.verifiedReports')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#1E7A45] mt-1">{verified}</div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.workInProgress')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#C97C16] mt-1">{inProgress}</div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.resolvedReports')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#2F9E5A] mt-1">{resolved}</div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="text-xs font-bold text-[#3f4f40]">{t('admin.rejectedReports')}</div>
          <div className="text-3xl font-black font-['Archivo'] text-[#C23B36] mt-1">{rejected}</div>
        </div>
      </div>

      {/* Recent Reports Table - Clean No Border No Shadow */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#0F4C2E]">{t('admin.latestReports')}</h3>
          <Link
            href="/admin/reports"
            className="text-xs font-bold text-[#0F4C2E] flex items-center gap-1 hover:underline"
          >
            {t('admin.viewAll')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs font-bold text-[#3f4f40]">{t('admin.loadingData')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="bg-[#F6F8F6] text-[#182619] rounded-xl">
                  <th className="p-3.5 rounded-l-xl">{t('admin.colId')}</th>
                  <th className="p-3.5">{t('admin.colCategory')}</th>
                  <th className="p-3.5">{t('admin.colLocation')}</th>
                  <th className="p-3.5">{t('admin.colDate')}</th>
                  <th className="p-3.5">{t('admin.colStatus')}</th>
                  <th className="p-3.5 text-right rounded-r-xl">{t('admin.colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-[#F6F8F6]/50 transition-colors">
                    <td className="p-3.5 font-['Archivo'] font-bold text-[#0F4C2E]">#{r.publicId}</td>
                    <td className="p-3.5">{lang === 'en' ? r.category?.nameEn || r.category?.nameBn : r.category?.nameBn}</td>
                    <td className="p-3.5 max-w-[200px] truncate">{r.locationAddress}</td>
                    <td className="p-3.5">{formatDate(r.createdAt, lang)}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.status === 'RESOLVED'
                            ? 'bg-[#2F9E5A] text-white'
                            : r.status === 'REJECTED'
                            ? 'bg-[#C23B36] text-white'
                            : 'bg-[#E39A2E] text-[#182619]'
                        }`}
                      >
                        {t(`track.status.${r.status}`) || r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/admin/reports/${r.id}`}
                        className="inline-flex items-center gap-1 bg-[#EAF0EB] text-[#0F4C2E] px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#0F4C2E] hover:text-white transition-colors"
                      >
                        <Eye className="w-3 h-3" /> {t('admin.details')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
