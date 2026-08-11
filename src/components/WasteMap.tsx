'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '../lib/i18n';

interface MarkerItem {
  id: string;
  publicId: string;
  latitude: number;
  longitude: number;
  status: string;
  locationAddress: string;
  description: string;
  category?: { nameBn: string; nameEn: string };
}

interface WasteMapProps {
  markers?: MarkerItem[];
  interactive?: boolean;
  selectable?: boolean;
  onSelectLocation?: (lat: number, lng: number) => void;
  height?: string;
}

// Dynamically import Leaflet components to bypass SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const LocationPickerHandler = dynamic(
  () =>
    import('react-leaflet').then((mod) => {
      const { useMapEvents } = mod;
      return function Handler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
        useMapEvents({
          click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
          },
        });
        return null;
      };
    }),
  { ssr: false }
);

// Map Resizer component to ensure Leaflet recalculates dimensions after mount
const MapResizer = dynamic(
  () =>
    import('react-leaflet').then((mod) => {
      const { useMap } = mod;
      return function Resizer() {
        const map = useMap();
        useEffect(() => {
          const timer = setTimeout(() => {
            map.invalidateSize();
          }, 250);
          return () => clearTimeout(timer);
        }, [map]);
        return null;
      };
    }),
  { ssr: false }
);

export const WasteMap: React.FC<WasteMapProps> = ({
  markers = [],
  selectable = false,
  onSelectLocation,
  height = '420px',
}) => {
  const { lang, t } = useLanguage();
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [customIcons, setCustomIcons] = useState<any>({});
  const [selectedPos, setSelectedPos] = useState<{ lat: number; lng: number } | null>(null);

  // Default center: Central Dhaka North (Mirpur/Gulshan area)
  const defaultCenter = [23.8103, 90.4125];

  useEffect(() => {
    import('leaflet').then((L) => {
      // Create sleek borderless marker icons
      const redIcon = L.divIcon({
        className: 'custom-pin-red',
        html: `<div style="background:#C23B36; width:20px; height:20px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); shadow:none;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      });
      const amberIcon = L.divIcon({
        className: 'custom-pin-amber',
        html: `<div style="background:#E39A2E; width:20px; height:20px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); shadow:none;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      });
      const greenIcon = L.divIcon({
        className: 'custom-pin-green',
        html: `<div style="background:#2F9E5A; width:20px; height:20px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); shadow:none;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      });

      setCustomIcons({
        SUBMITTED: redIcon,
        UNDER_VERIFICATION: amberIcon,
        VERIFIED: amberIcon,
        ASSIGNED: amberIcon,
        IN_PROGRESS: amberIcon,
        RESOLVED: greenIcon,
        REJECTED: redIcon,
        DEFAULT: amberIcon,
      });
      setLeafletLoaded(true);
    });
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPos({ lat, lng });
    if (onSelectLocation) {
      onSelectLocation(lat, lng);
    }
  };

  if (!leafletLoaded) {
    return (
      <div
        style={{ height }}
        className="w-full bg-[#EAF0EB] rounded-2xl"
      />
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <div style={{ height }}>
        {/* @ts-ignore */}
        <MapContainer
          center={defaultCenter as [number, number]}
          zoom={12}
          scrollWheelZoom={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Automatic Leaflet container resizer */}
          <MapResizer />

          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {selectable && onSelectLocation && (
            <LocationPickerHandler onSelect={handleMapClick} />
          )}

          {/* User selected location pin */}
          {selectedPos && (
            // @ts-ignore
            <Marker
              position={[selectedPos.lat, selectedPos.lng]}
              icon={customIcons.SUBMITTED || customIcons.DEFAULT}
            >
              {/* @ts-ignore */}
              <Popup>
                <div className="text-xs font-bold text-[#182619]">
                  নির্বাচন করা স্থান ({selectedPos.lat.toFixed(4)}, {selectedPos.lng.toFixed(4)})
                </div>
              </Popup>
            </Marker>
          )}

          {/* Pre-loaded Report Markers */}
          {markers.map((m) => {
            const icon = customIcons[m.status] || customIcons.DEFAULT;
            return (
              // @ts-ignore
              <Marker key={m.id} position={[m.latitude, m.longitude]} icon={icon}>
                {/* @ts-ignore */}
                <Popup>
                  <div className="p-1 max-w-[220px]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-['Archivo'] font-black text-xs text-[#0F4C2E]">
                        #{m.publicId}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.status === 'RESOLVED'
                            ? 'bg-[#2F9E5A] text-white'
                            : m.status === 'SUBMITTED'
                            ? 'bg-[#C23B36] text-white'
                            : 'bg-[#E39A2E] text-[#182619]'
                        }`}
                      >
                        {t(`track.timeline.${m.status.toLowerCase()}`) || m.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#182619] mb-1">
                      {lang === 'bn' ? m.category?.nameBn : m.category?.nameEn}
                    </div>

                    <div className="text-[11px] text-[#4b5563] line-clamp-2 mb-1.5">
                      📍 {m.locationAddress}
                    </div>

                    {m.description && (
                      <div className="text-[11px] text-[#182619] italic line-clamp-2 mb-2 bg-[#F6F8F6] p-2 rounded-lg">
                        "{m.description}"
                      </div>
                    )}

                    <a
                      href={`/track?q=${m.publicId}`}
                      className="block text-center text-xs font-bold bg-[#0F4C2E] text-white py-1.5 px-3 rounded-full hover:bg-[#1E7A45] transition-colors"
                    >
                      🔍 স্ট্যাটাস ট্র্যাক করুন →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold flex gap-4 z-10 text-[#182619]">
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
  );
};

