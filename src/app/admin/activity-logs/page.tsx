'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import { formatDate } from '../../../lib/utils';

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    setLogs([
      {
        id: '1',
        action: 'UPDATE_REPORT',
        details: 'Updated report FIX-2026-000101 status to RESOLVED',
        admin: { email: 'admin@dncc.gov.bd' },
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        action: 'ADMIN_LOGIN',
        details: 'Admin admin@dncc.gov.bd logged in successfully',
        admin: { email: 'admin@dncc.gov.bd' },
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black font-['Archivo'] text-[#0F4C2E]">অডিট লগ (Activity Audit Logs)</h1>
        <p className="text-xs text-[#3f4f40] font-semibold mt-1">
          কন্ট্রোল রুম এডমিনদের সকল কার্যক্রমের সিস্টেম সিকিউরিটি রেকর্ড
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead>
              <tr className="bg-[#F6F8F6] text-[#182619]">
                <th className="p-3.5 rounded-l-xl">সময়</th>
                <th className="p-3.5">এডমিন</th>
                <th className="p-3.5">অ্যাকশন (Action)</th>
                <th className="p-3.5 rounded-r-xl">বিস্তারিত (Details)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F6F8F6]/50 transition-colors">
                  <td className="p-3.5 font-mono text-[11px]">{formatDate(log.createdAt, 'bn')}</td>
                  <td className="p-3.5 font-bold text-[#0F4C2E]">{log.admin?.email}</td>
                  <td className="p-3.5">
                    <span className="bg-[#F6F8F6] px-2.5 py-1 rounded-full font-mono text-[10px] font-bold text-[#0F4C2E]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#3f4f40]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
