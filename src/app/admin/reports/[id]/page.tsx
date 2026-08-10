'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../../../components/AdminLayout';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Calendar, Phone, CheckCircle2, XCircle, UserCheck, Clock, FileText, Camera, Upload, AlertCircle, ArrowLeft, X } from 'lucide-react';
import { formatDate } from '../../../../lib/utils';

export default function AdminReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string } | null>(null);

  // Form Controls for Status Update
  const [newStatus, setNewStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Cleaning Activity Controls
  const [cleanedBy, setCleanedBy] = useState('DNCC Field Sanitation Team');
  const [wasteVolumeKg, setWasteVolumeKg] = useState('150');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [uploadingAfter, setUploadingAfter] = useState(false);

  const loadReportDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports/${id}`);
      const data = await res.json();
      if (data.success) {
        setReport(data.data);
        setNewStatus(data.data.status);
        setPriority(data.data.priority);
        setAssignedTo(data.data.assignedTo || '');
        if (data.data.cleaningActivity?.afterImageUrl) {
          setAfterImageUrl(data.data.cleaningActivity.afterImageUrl);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportDetail();
  }, [id]);

  // Client-side image compression targeting ~150-200 KB
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (file.size <= 200 * 1024) {
        resolve(file);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            0.7
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  // After Image Upload Handler
  const handleAfterImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    const file = await compressImage(rawFile);
    setUploadingAfter(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setAfterImageUrl(data.url);
      }
    } catch (e) {
      alert('After image upload failed');
    } finally {
      setUploadingAfter(false);
    }
  };

  const handleUpdate = async (statusOverride?: string) => {
    setUpdating(true);
    const targetStatus = statusOverride || newStatus;

    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetStatus,
          priority,
          assignedTo: assignedTo.trim() || null,
          note: adminNote.trim() || null,
          rejectionReason: targetStatus === 'REJECTED' ? rejectionReason : null,
          cleanedBy: targetStatus === 'RESOLVED' ? cleanedBy : null,
          wasteVolumeKg: targetStatus === 'RESOLVED' ? wasteVolumeKg : null,
          afterImageUrl: targetStatus === 'RESOLVED' ? afterImageUrl : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAdminNote('');
        loadReportDetail();
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Failed to update report');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-16 font-bold text-[#0F4C2E]">রিপোর্ট বিস্তারিত লোড হচ্ছে...</div>
      </AdminLayout>
    );
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="text-center py-16 font-bold text-[#C23B36]">রিপোর্টটি পাওয়া যায়নি।</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0F4C2E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> তালিকায় ফিরে যান
        </button>
        <span className="font-['Archivo'] font-black text-xl text-[#0F4C2E]">
          #{report.publicId}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Report Details & Images */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
            <div className="flex flex-wrap justify-between items-center border-b-2 border-[#EFEFE1] pb-4 mb-4 gap-2">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#3f4f40] block">ক্যাটেগরি</span>
                <span className="text-lg font-bold text-[#0F4C2E]">{report.category?.nameBn}</span>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border-2 border-[#182619] ${
                  report.status === 'RESOLVED'
                    ? 'bg-[#2F9E5A] text-white'
                    : report.status === 'REJECTED'
                    ? 'bg-[#C23B36] text-white'
                    : 'bg-[#E39A2E] text-[#182619]'
                }`}
              >
                {report.status}
              </span>
            </div>

            <div className="space-y-3 text-xs font-semibold text-[#182619]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F4C2E]" />
                <span className="text-[#3f4f40]">অবস্থান:</span> {report.locationAddress}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0F4C2E]" />
                <span className="text-[#3f4f40]">জমা দেওয়া হয়েছে:</span> {formatDate(report.createdAt, 'bn')}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F4C2E]" />
                <span className="text-[#3f4f40]">নাগরিক মোবাইল:</span> {report.mobileNumber || 'নম্বর প্রদান করা হয়নি'}
              </div>
              <div className="pt-2 border-t border-[#c9c8b3]">
                <span className="text-[#3f4f40] block mb-1">সমস্যার বিস্তারিত বিবরণ:</span>
                <p className="text-sm font-normal bg-[#F8F7EC] p-3 rounded border border-[#c9c8b3]">
                  {report.description}
                </p>
              </div>
            </div>

            {/* Before Images */}
            <div className="mt-6 pt-4 border-t-2 border-[#EFEFE1]">
              <h4 className="font-bold text-xs uppercase text-[#0F4C2E] mb-3 flex items-center justify-between">
                <span>বিফোর ইমেজ (Citizen Uploaded Evidence)</span>
                <span className="text-[11px] text-[#3f4f40] font-normal lowercase">(ক্লিক করে বড় করে দেখুন)</span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {report.images?.map((img: any) => (
                  <div key={img.id} className="border-2 border-[#182619] rounded overflow-hidden group relative">
                    <img
                      src={img.imageUrl}
                      alt="Before"
                      onClick={() =>
                        setActiveModalImage({
                          url: img.imageUrl,
                          title: `Before Evidence — #${report.publicId}`,
                        })
                      }
                      className="w-full h-40 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    <span className="block text-[10px] font-bold p-1 bg-[#EFEFE1] text-center">
                      {img.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolved After Evidence (If Available) */}
            {report.cleaningActivity?.afterImageUrl && (
              <div className="mt-6 pt-4 border-t-2 border-[#2F9E5A]">
                <h4 className="font-bold text-xs uppercase text-[#2F9E5A] mb-3 flex items-center justify-between">
                  <span>আফটার ক্লিনিং প্রমাণ (After Cleanup Evidence)</span>
                  <span className="text-[11px] text-[#3f4f40] font-normal lowercase">(ক্লিক করে বড় করে দেখুন)</span>
                </h4>
                <div className="max-w-xs border-2 border-[#182619] rounded overflow-hidden">
                  <img
                    src={report.cleaningActivity.afterImageUrl}
                    alt="After"
                    onClick={() =>
                      setActiveModalImage({
                        url: report.cleaningActivity.afterImageUrl,
                        title: `Cleaned After Evidence — #${report.publicId}`,
                      })
                    }
                    className="w-full h-40 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  <span className="block text-[10px] font-bold p-1 bg-[#2F9E5A] text-white text-center">
                    CLEANED AFTER
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline & Status History */}
          <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
            <h3 className="text-sm font-bold text-[#0F4C2E] uppercase tracking-wider mb-4">
              স্ট্যাটাস হিস্ট্রি ও অ্যাক্টিভিটি লগ (Audit History)
            </h3>
            <div className="space-y-4 border-l-2 border-[#182619] ml-2 pl-4">
              {report.statusHistory?.map((sh: any) => (
                <div key={sh.id} className="relative text-xs">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#E39A2E] border-2 border-[#182619]" />
                  <div className="font-bold text-[#182619]">{sh.status}</div>
                  <div className="text-[11px] text-[#3f4f40]">{formatDate(sh.createdAt, 'bn')}</div>
                  {sh.note && <div className="text-[11px] text-[#0F4C2E] italic mt-0.5">"{sh.note}"</div>}
                  {sh.createdBy && <div className="text-[10px] text-[#3f4f40]">বাই: {sh.createdBy}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Actions & Resolution Form */}
        <div className="space-y-6">
          {/* Action Quick Buttons */}
          <div className="bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.08)] space-y-4">
            <h3 className="font-bold text-sm text-[#0F4C2E] border-b-2 border-[#EFEFE1] pb-2">
              দ্রুত স্ট্যাটাস পরিবর্তন
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setNewStatus('VERIFIED');
                  handleUpdate('VERIFIED');
                }}
                className="bg-[#1E7A45] text-white text-[11px] font-bold py-2 px-2 rounded border-2 border-[#182619] hover:bg-[#0F4C2E] transition-colors text-center"
              >
                ✓ Verify
              </button>
              <button
                onClick={() => {
                  setNewStatus('IN_PROGRESS');
                  handleUpdate('IN_PROGRESS');
                }}
                className="bg-[#E39A2E] text-[#182619] text-[11px] font-bold py-2 px-2 rounded border-2 border-[#182619] hover:bg-[#C97C16] transition-colors text-center"
              >
                ⚙ Progress
              </button>
              <button
                onClick={() => {
                  setNewStatus('RESOLVED');
                  handleUpdate('RESOLVED');
                }}
                className="bg-[#2F9E5A] text-white text-[11px] font-bold py-2 px-2 rounded border-2 border-[#182619] hover:bg-[#1E7A45] transition-colors text-center"
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
                className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-bold bg-white"
              >
                <option value="SUBMITTED">SUBMITTED</option>
                <option value="UNDER_VERIFICATION">UNDER_VERIFICATION</option>
                <option value="VERIFIED">VERIFIED</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-bold mb-1">অগ্রাধিকার:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-bold bg-white"
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
                className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold"
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
                className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs"
              ></textarea>
            </div>

            {/* If Status is RESOLVED, Show Cleaning Evidence Controls */}
            {newStatus === 'RESOLVED' && (
              <div className="bg-[#F8F7EC] border-2 border-[#0F4C2E] p-4 rounded-md space-y-3">
                <h4 className="font-bold text-xs text-[#0F4C2E] uppercase">
                  পরিচ্ছন্নতা কাজ সম্পন্ন করার তথ্য (Resolution Details)
                </h4>
                <div>
                  <label className="block text-[11px] font-bold mb-1">টিমের নাম:</label>
                  <input
                    type="text"
                    value={cleanedBy}
                    onChange={(e) => setCleanedBy(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[#c9c8b3] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">বর্জ্য পরিমাণ (KG):</label>
                  <input
                    type="number"
                    value={wasteVolumeKg}
                    onChange={(e) => setWasteVolumeKg(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[#c9c8b3] rounded text-xs"
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
                    <img src={afterImageUrl} alt="After preview" className="w-20 h-20 object-cover mt-2 border rounded" />
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => handleUpdate()}
              disabled={updating}
              className="w-full bg-[#0F4C2E] text-white border-2 border-[#182619] py-3 rounded-md font-bold text-xs shadow-[3px_3px_0_#182619] hover:bg-[#1E7A45]"
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
            className="relative max-w-4xl max-h-[90vh] bg-[#F8F7EC] border-4 border-[#182619] rounded-xl p-3 shadow-[8px_8px_0_#000] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#182619] px-1">
              <span className="font-bold text-xs text-[#0F4C2E] uppercase tracking-wider">
                {activeModalImage.title}
              </span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="bg-[#C23B36] text-white p-1 rounded-full border-2 border-[#182619] hover:bg-red-700 transition-colors"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={activeModalImage.url}
              alt="Enlarged view"
              className="w-full max-h-[78vh] object-contain rounded-lg border border-[#c9c8b3]"
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
