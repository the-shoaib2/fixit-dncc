'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../../components/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '../../../../lib/utils';
import { useLanguage } from '../../../../lib/i18n';
import { ArrowLeft, MapPin, Calendar, Phone, AlertCircle, FileText, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function AdminReportDetailPage() {
  const { lang, t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [cleanedBy, setCleanedBy] = useState('');
  const [wasteVolumeKg, setWasteVolumeKg] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [updating, setUpdating] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string } | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports/${id}`);
      const data = await res.json();
      if (data.success) {
        setReport(data.data);
        setNewStatus(data.data.status);
        setPriority(data.data.priority);
        setAssignedTo(data.data.assignedTo || '');
        if (data.data.cleaningActivity) {
          setCleanedBy(data.data.cleaningActivity.cleanedBy || '');
          setWasteVolumeKg(data.data.cleaningActivity.wasteVolumeKg?.toString() || '');
          setAfterImageUrl(data.data.cleaningActivity.afterImageUrl || '');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReport();
  }, [id]);

  const handleAfterImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setAfterImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
    }
  };

  const handleUpdate = async (overrideStatus?: string) => {
    setUpdating(true);
    const statusToUse = overrideStatus || newStatus;
    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusToUse,
          priority,
          assignedTo,
          note: adminNote,
          rejectionReason: statusToUse === 'REJECTED' ? rejectionReason : null,
          cleanedBy: statusToUse === 'RESOLVED' ? cleanedBy || 'DNCC Waste Team' : null,
          wasteVolumeKg: statusToUse === 'RESOLVED' && wasteVolumeKg ? parseFloat(wasteVolumeKg) : null,
          afterImageUrl: statusToUse === 'RESOLVED' ? afterImageUrl : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminNote('');
        fetchReport();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-xs font-bold text-[#3f4f40]">বিস্তারিত লোড হচ্ছে...</div>
      </AdminLayout>
    );
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-xs font-bold text-[#C23B36]">রিপোর্টটি পাওয়া যায়নি!</div>
      </AdminLayout>
    );
  }

  const beforeImages = report.images?.filter((img: any) => img.type === 'BEFORE') || [];
  const afterImages = report.images?.filter((img: any) => img.type === 'AFTER') || [];
  const finalAfterUrl = afterImages.length > 0 ? afterImages[0].imageUrl : report.cleaningActivity?.afterImageUrl;

  return (
    <AdminLayout>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C2E] hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> পিছনে ফিরে যান
        </button>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-['Archivo'] text-[#0F4C2E]">
                রিপোর্ট #{report.publicId}
              </h1>
              <span className="bg-[#EAF0EB] text-[#0F4C2E] px-3 py-1 rounded-full text-xs font-bold">
                {report.category?.nameBn}
              </span>
            </div>
            <p className="text-xs text-[#3f4f40] font-semibold mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {report.locationAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left Column: Details & Images */}
        <div className="space-y-6">
          {/* Main Details Card */}
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">সামগ্রিক তথ্য</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  report.status === 'RESOLVED'
                    ? 'bg-[#2F9E5A] text-white'
                    : report.status === 'REJECTED'
                    ? 'bg-[#C23B36] text-white'
                    : 'bg-[#E39A2E] text-[#182619]'
                }`}
              >
                {t(`track.status.${report.status}`) || report.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">জমার তারিখ:</span>
                <span className="font-bold text-[#182619]">{formatDate(report.createdAt, 'bn')}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">মোবাইল নম্বর:</span>
                <span className="font-bold text-[#182619] font-mono">{report.mobileNumber || 'অজানা'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">অগ্রাধিকার:</span>
                <span className="font-bold text-[#0F4C2E]">{report.priority}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">দায়িত্বপ্রাপ্ত:</span>
                <span className="font-bold text-[#182619]">{report.assignedTo || 'এখনও বরাদ্দ হয়নি'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">জিপিএস কোঅর্ডিনেট:</span>
                <span className="font-bold text-[#182619] font-mono">
                  {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500 block mb-1">সমস্যার বিস্তারিত বিবরণ:</span>
              <p className="text-xs text-[#182619] leading-relaxed bg-[#F6F8F6] p-3 rounded-xl">
                {report.description}
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-sm text-[#0F4C2E] mb-4">সংযুক্ত ছবিসমূহ</h3>

            <div className="space-y-4">
              {/* Before Images */}
              <div>
                <span className="text-xs font-bold text-red-600 block mb-2">
                  📷 রিপোর্টেড বর্জ্য ছবি (Before Image):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {beforeImages.length > 0 ? (
                    beforeImages.map((img: any) => (
                      <div
                        key={img.id}
                        onClick={() => setActiveModalImage({ url: img.imageUrl, title: 'Reported Waste Image' })}
                        className="rounded-xl overflow-hidden cursor-pointer group relative bg-gray-100 h-32"
                      >
                        <img src={img.imageUrl} alt="Before" className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">কোনো Before ছবি পাওয়া যায়নি</div>
                  )}
                </div>
              </div>

              {/* After / Cleaned Image */}
              {finalAfterUrl && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs font-bold text-[#1E7A45] block mb-2">
                    ✅ পরিচ্ছন্নতার আফটার ছবি (Verified Cleaned Image):
                  </span>
                  <div
                    onClick={() => setActiveModalImage({ url: finalAfterUrl, title: 'Cleaned Image' })}
                    className="max-w-xs rounded-xl overflow-hidden cursor-pointer bg-gray-100 h-40 relative"
                  >
                    <img src={finalAfterUrl} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline History */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-sm text-[#0F4C2E] mb-4">স্ট্যাটাস ইতিহাস (Timeline)</h3>
            <div className="relative pl-6 space-y-4 border-l-2 border-gray-200">
              {report.statusHistory?.map((h: any) => (
                <div key={h.id} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#E39A2E]" />
                  <div className="text-xs font-bold text-[#182619]">{h.status}</div>
                  <div className="text-[11px] text-gray-500">{formatDate(h.createdAt, 'bn')}</div>
                  {h.note && <div className="text-xs text-gray-600 mt-0.5">{h.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Actions & Resolution Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0F4C2E] border-b border-gray-100 pb-2">
              দ্রুত স্ট্যাটাস পরিবর্তন
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setNewStatus('VERIFIED');
                  handleUpdate('VERIFIED');
                }}
                className="bg-[#1E7A45] text-white text-[11px] font-bold py-2 px-2 rounded-full hover:bg-[#0F4C2E] transition-colors text-center"
              >
                ✓ Verify
              </button>
              <button
                onClick={() => {
                  setNewStatus('IN_PROGRESS');
                  handleUpdate('IN_PROGRESS');
                }}
                className="bg-[#E39A2E] text-[#182619] text-[11px] font-bold py-2 px-2 rounded-full hover:bg-[#C97C16] transition-colors text-center"
              >
                ⚙ Progress
              </button>
              <button
                onClick={() => {
                  setNewStatus('RESOLVED');
                  handleUpdate('RESOLVED');
                }}
                className="bg-[#2F9E5A] text-white text-[11px] font-bold py-2 px-2 rounded-full hover:bg-[#1E7A45] transition-colors text-center"
              >
                ✔ Resolved
              </button>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold mb-1">স্ট্যাটাস বাছাই:</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-full text-xs font-bold bg-[#F6F8F6] border-none focus:outline-none"
              >
                <option value="SUBMITTED">{t('track.status.SUBMITTED')}</option>
                <option value="UNDER_VERIFICATION">{t('track.status.UNDER_VERIFICATION')}</option>
                <option value="VERIFIED">{t('track.status.VERIFIED')}</option>
                <option value="ASSIGNED">{t('track.status.ASSIGNED')}</option>
                <option value="IN_PROGRESS">{t('track.status.IN_PROGRESS')}</option>
                <option value="RESOLVED">{t('track.status.RESOLVED')}</option>
                <option value="REJECTED">{t('track.status.REJECTED')}</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-bold mb-1">অগ্রাধিকার:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-full text-xs font-bold bg-[#F6F8F6] border-none focus:outline-none"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>

            {/* Field Assignment */}
            <div>
              <label className="block text-xs font-bold mb-1">দায়িত্বপ্রাপ্ত টিম/কর্মকর্তা:</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="যেমন: Zone 3 Cleanup Squad"
                className="w-full px-4 py-2.5 rounded-full text-xs font-semibold bg-[#F6F8F6] border-none focus:outline-none"
              />
            </div>

            {/* Internal Admin Note */}
            <div>
              <label className="block text-xs font-bold mb-1">অভ্যন্তরীণ নোট (Internal Note):</label>
              <textarea
                rows={2}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="নোট লিখুন..."
                className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#F6F8F6] border-none focus:outline-none"
              ></textarea>
            </div>

            {/* If Status is RESOLVED, Show Cleaning Evidence Controls */}
            {newStatus === 'RESOLVED' && (
              <div className="bg-[#F6F8F6] p-4 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-[#0F4C2E] uppercase">
                  পরিচ্ছন্নতা কাজ সম্পন্ন করার তথ্য (Resolution Details)
                </h4>
                <div>
                  <label className="block text-[11px] font-bold mb-1">টিমের নাম:</label>
                  <input
                    type="text"
                    value={cleanedBy}
                    onChange={(e) => setCleanedBy(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-full text-xs border-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">বর্জ্য পরিমাণ (KG):</label>
                  <input
                    type="number"
                    value={wasteVolumeKg}
                    onChange={(e) => setWasteVolumeKg(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-full text-xs border-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">আফটার ফটো (Cleaned Image):</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAfterImageUpload}
                    className="text-xs"
                  />
                  {afterImageUrl && (
                    <img src={afterImageUrl} alt="After preview" className="w-20 h-20 object-cover mt-2 rounded-xl" />
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => handleUpdate()}
              disabled={updating}
              className="w-full bg-[#0F4C2E] text-white py-3.5 rounded-full font-bold text-xs hover:bg-[#1E7A45] transition-colors"
            >
              {updating ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন (Save Update)'}
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Image Preview Modal Dialog */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 px-1">
              <span className="font-bold text-xs text-[#0F4C2E] uppercase tracking-wider">
                {activeModalImage.title}
              </span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="bg-[#C23B36] text-white p-1.5 rounded-full hover:bg-red-700 transition-colors"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={activeModalImage.url}
              alt="Enlarged view"
              className="w-full max-h-[78vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
