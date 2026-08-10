'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { WasteMap } from '../../components/WasteMap';
import { Upload, MapPin, CheckCircle2, AlertCircle, Trash2, Camera, Copy, Check, Eye, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ImagePreviewItem {
  id: string;
  previewUrl: string;
  serverUrl?: string;
  uploading: boolean;
  error?: boolean;
}

export default function ReportPage() {
  const { lang, t } = useLanguage();

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');

  // Image previews state (instant client preview + server upload tracking)
  const [imagePreviews, setImagePreviews] = useState<ImagePreviewItem[]>([]);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [submittedReport, setSubmittedReport] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
          setSelectedCategory(data.data[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // GPS Location handler
  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          setLocationAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Dhaka North)`);
        },
        (err) => {
          alert('GPS location permission denied or unavailable. Please enter address or click on the map.');
        }
      );
    }
  };

  // Instant Image Upload & Preview Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg('');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const itemId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const clientPreviewUrl = URL.createObjectURL(file);

      // Add instant client-side preview thumbnail immediately
      setImagePreviews((prev) => [
        ...prev,
        { id: itemId, previewUrl: clientPreviewUrl, uploading: true },
      ]);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          setImagePreviews((prev) =>
            prev.map((item) =>
              item.id === itemId
                ? { ...item, serverUrl: data.url, uploading: false }
                : item
            )
          );
        } else {
          setImagePreviews((prev) =>
            prev.map((item) =>
              item.id === itemId
                ? { ...item, uploading: false, error: true }
                : item
            )
          );
          setErrorMsg(data.error || 'Failed to upload image');
        }
      } catch (err) {
        setImagePreviews((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, uploading: false, error: true }
              : item
          )
        );
        setErrorMsg('Image upload error');
      }
    }

    // Reset file input
    e.target.value = '';
  };

  const removeImagePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      setErrorMsg('Please select a waste category.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide details about the problem.');
      return;
    }
    if (!locationAddress.trim()) {
      setErrorMsg('Please specify the location.');
      return;
    }

    // Extract successfully uploaded server image URLs
    const uploadedUrls = imagePreviews
      .map((item) => item.serverUrl || item.previewUrl)
      .filter(Boolean);

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: selectedCategory,
          description,
          locationAddress,
          latitude: latitude || 23.8103,
          longitude: longitude || 90.4125,
          mobileNumber: mobileNumber.trim() || null,
          imageUrls: uploadedUrls,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedReport(data.data);
      } else {
        setErrorMsg(data.error || 'Failed to submit report');
      }
    } catch (err) {
      setErrorMsg('Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReportId = () => {
    if (submittedReport?.publicId) {
      navigator.clipboard.writeText(submittedReport.publicId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-6 sm:py-8 bg-[#F8F7EC] border-t-2 border-[#182619] min-h-[calc(100vh-52px)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {submittedReport ? (
          /* SUCCESS SCREEN */
          <div className="max-w-xl mx-auto bg-white border-2 border-[#182619] rounded-lg p-6 shadow-[6px_6px_0_rgba(0,0,0,0.15)] text-center">
            <CheckCircle2 className="w-14 h-14 text-[#2F9E5A] mx-auto mb-3" />
            <h2 className="text-xl font-bold text-[#0F4C2E] mb-1">
              {t('form.successTitle')}
            </h2>
            <p className="text-xs text-[#3f4f40] mb-4">{t('form.saveNotice')}</p>

            <div className="bg-[#EFEFE1] border-2 border-[#182619] rounded-md p-4 my-4 relative">
              <div className="text-[11px] uppercase font-extrabold tracking-wider text-[#3f4f40] mb-1">
                {t('form.reportIdLabel')}
              </div>
              <div className="font-['Archivo'] font-black text-2xl sm:text-3xl text-[#0F4C2E] tracking-wider my-1">
                {submittedReport.publicId}
              </div>
              <button
                onClick={copyReportId}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold bg-[#E39A2E] text-[#182619] border-2 border-[#182619] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#182619] hover:bg-[#C97C16]"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'অনুলিপি করা হয়েছে' : 'আইডি কপি করুন'}
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                href={`/track?q=${submittedReport.publicId}`}
                className="bg-[#0F4C2E] text-white font-bold text-xs px-5 py-2.5 rounded-full border-2 border-[#182619] shadow-[2px_2px_0_#182619]"
              >
                {t('hero.ctaTrack')}
              </Link>
              <button
                onClick={() => {
                  setSubmittedReport(null);
                  setDescription('');
                  setLocationAddress('');
                  setImagePreviews([]);
                }}
                className="bg-[#EFEFE1] text-[#182619] font-bold text-xs px-5 py-2.5 rounded-full border-2 border-[#182619]"
              >
                নতুন রিপোর্ট করুন
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left side info */}
            <div>
              <span className="font-['Archivo'] font-extrabold text-[11px] tracking-widest text-[#1E7A45] uppercase block mb-1">
                {t('form.tag')}
              </span>
              <h2 className="text-2xl font-bold mb-2">{t('form.title')}</h2>
              <p className="text-sm text-[#3f4f40] leading-relaxed mb-5">
                {t('form.subtitle')}
              </p>

              <ul className="space-y-2.5 mb-6">
                <li className="flex items-center gap-2.5 font-semibold text-xs text-[#3f4f40]">
                  <span className="w-6 h-6 rounded-full bg-[#E39A2E] border-2 border-[#182619] flex items-center justify-center font-['Archivo'] font-black text-[11px] text-[#182619]">
                    1
                  </span>
                  {t('form.steps.0')}
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-xs text-[#3f4f40]">
                  <span className="w-6 h-6 rounded-full bg-[#E39A2E] border-2 border-[#182619] flex items-center justify-center font-['Archivo'] font-black text-[11px] text-[#182619]">
                    2
                  </span>
                  {t('form.steps.1')}
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-xs text-[#3f4f40]">
                  <span className="w-6 h-6 rounded-full bg-[#E39A2E] border-2 border-[#182619] flex items-center justify-center font-['Archivo'] font-black text-[11px] text-[#182619]">
                    3
                  </span>
                  {t('form.steps.2')}
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-xs text-[#3f4f40]">
                  <span className="w-6 h-6 rounded-full bg-[#E39A2E] border-2 border-[#182619] flex items-center justify-center font-['Archivo'] font-black text-[11px] text-[#182619]">
                    4
                  </span>
                  {t('form.steps.3')}
                </li>
              </ul>
            </div>

            {/* Right side form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border-2 border-[#182619] rounded-lg p-5 sm:p-6 shadow-[5px_5px_0_rgba(0,0,0,0.08)] space-y-3.5"
            >
              {errorMsg && (
                <div className="bg-[#C23B36]/10 border-2 border-[#C23B36] rounded-md p-2.5 text-xs text-[#C23B36] font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              {/* Instant Image Upload & Previews Grid */}
              <div>
                <label className="block font-bold text-xs text-[#182619] mb-1">
                  {t('form.imageLabel')}
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {imagePreviews.map((img) => (
                      <div
                        key={img.id}
                        className="relative group border-2 border-[#182619] rounded-md overflow-hidden h-24 bg-[#EFEFE1]"
                      >
                        <img
                          src={img.previewUrl}
                          alt="Waste preview"
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setActiveModalImage(img.previewUrl)}
                        />

                        {/* Uploading Spinner Overlay */}
                        {img.uploading && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Loader2 className="w-5 h-5 animate-spin" />
                          </div>
                        )}

                        {/* Success Badge */}
                        {!img.uploading && !img.error && (
                          <div className="absolute bottom-1 left-1 bg-[#2F9E5A] text-white p-0.5 rounded-full border border-[#182619]">
                            <Check className="w-3 h-3" />
                          </div>
                        )}

                        {/* Action Buttons: Preview & Delete */}
                        <div className="absolute top-1 right-1 flex gap-1">
                          <button
                            type="button"
                            onClick={() => setActiveModalImage(img.previewUrl)}
                            className="bg-[#182619] text-white p-1 rounded-full border border-white hover:bg-[#0F4C2E]"
                            title="বড় করে দেখুন"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImagePreview(img.id)}
                            className="bg-[#C23B36] text-white p-1 rounded-full border border-white hover:bg-red-700"
                            title="ছবি মুছুন"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button Box */}
                <label className="border-2 border-dashed border-[#c9c8b3] rounded-md p-3.5 text-center bg-[#EFEFE1] cursor-pointer block hover:border-[#0F4C2E] transition-colors">
                  <Camera className="w-6 h-6 text-[#1E7A45] mx-auto mb-1" />
                  <span className="font-semibold text-xs text-[#3f4f40]">
                    {t('form.imageHint')}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block font-bold text-xs text-[#182619] mb-1">
                  {t('form.categoryLabel')}
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md bg-white font-semibold text-xs focus:outline-none focus:border-[#0F4C2E]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === 'bn' ? c.nameBn : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Input & GPS */}
              <div>
                <label htmlFor="location" className="block font-bold text-xs text-[#182619] mb-1">
                  {t('form.locationLabel')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="location"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    placeholder={t('form.locationPlaceholder')}
                    className="flex-1 px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none focus:border-[#0F4C2E]"
                  />
                  <button
                    type="button"
                    onClick={handleGPS}
                    className="border-2 border-[#182619] bg-[#EFEFE1] rounded-md px-3 text-[11px] font-bold flex items-center gap-1 whitespace-nowrap hover:bg-[#E39A2E] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#0F4C2E]" />
                    {t('form.gpsBtn')}
                  </button>
                </div>

                {/* Map coordinate picker */}
                <div className="mt-2">
                  <div className="text-[11px] font-bold text-[#3f4f40] mb-1">
                    ম্যাপে পিন পয়েন্ট করে অবস্থান নির্বাচন করতে পারেন:
                  </div>
                  <WasteMap
                    selectable={true}
                    onSelectLocation={(lat, lng) => {
                      setLatitude(lat);
                      setLongitude(lng);
                      setLocationAddress(`Pin: ${lat.toFixed(4)}, ${lng.toFixed(4)} (Dhaka North)`);
                    }}
                    height="140px"
                  />
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label htmlFor="details" className="block font-bold text-xs text-[#182619] mb-1">
                  {t('form.detailsLabel')}
                </label>
                <textarea
                  id="details"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('form.detailsPlaceholder')}
                  className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none focus:border-[#0F4C2E]"
                ></textarea>
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="phone" className="block font-bold text-xs text-[#182619] mb-1">
                  {t('form.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder={t('form.phonePlaceholder')}
                  className="w-full px-3 py-2 border-2 border-[#c9c8b3] rounded-md text-xs font-semibold focus:outline-none focus:border-[#0F4C2E]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0F4C2E] text-white border-2 border-[#182619] rounded-md py-2.5 font-bold text-sm shadow-[3px_3px_0_rgba(0,0,0,0.25)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_rgba(0,0,0,0.25)] transition-all"
              >
                {submitting ? t('form.submitting') : t('form.submitBtn')}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Fullsize Image Preview Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-3xl max-h-[85vh] bg-[#F8F7EC] border-2 border-[#182619] rounded-lg p-2 overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-3 right-3 bg-[#C23B36] text-white p-1.5 rounded-full border-2 border-[#182619] hover:bg-red-700 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={activeModalImage}
              alt="Enlarged waste preview"
              className="w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
