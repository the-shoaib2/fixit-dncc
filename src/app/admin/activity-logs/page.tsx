'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { formatDate } from '@/lib/utils';

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Initial sample logs
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

      <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)] max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead>
              <tr className="border-b-2 border-[#182619] bg-[#EFEFE1] text-[#182619]">
                <th className="p-3">সময়</th>
                <th className="p-3">এডমিন</th>
                <th className="p-3">অ্যাকশন (Action)</th>
                <th className="p-3">বিস্তারিত (Details)</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b border-[#c9c8b3]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8F7EC]">
                  <td className="p-3 font-mono text-[11px]">{formatDate(log.createdAt, 'bn')}</td>
                  <td className="p-3 font-bold text-[#0F4C2E]">{log.admin?.email}</td>
                  <td className="p-3">
                    <span className="bg-[#EFEFE1] px-2 py-0.5 rounded border border-[#182619] font-mono text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-[#3f4f40]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
