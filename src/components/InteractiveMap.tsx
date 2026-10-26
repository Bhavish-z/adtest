import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPOI } from '../types/travel';

interface InteractiveMapProps {
  pois: MapPOI[];
  selectedPoiId?: string | null;
  onSelectPoi?: (poi: MapPOI) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  routePoiIds?: string[];
  interactive?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Heritage: { bg: '#b45309', border: '#78350f', text: '#ffffff' }, // amber-700
  Culinary: { bg: '#c2410c', border: '#7c2d12', text: '#ffffff' }, // orange-700
  Nature: { bg: '#15803d', border: '#14532d', text: '#ffffff' },   // green-700
  Viewpoint: { bg: '#0369a1', border: '#075985', text: '#ffffff' },// sky-700
  Artisan: { bg: '#6d28d9', border: '#4c1d95', text: '#ffffff' },  // violet-700
  'Tour Meeting Point': { bg: '#0f172a', border: '#020617', text: '#ffffff' } // slate-900
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pois,
  selectedPoiId,
  onSelectPoi,
  center = [35.0116, 135.7681],
  zoom = 13,
  height = '500px',
  routePoiIds = [],
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: interactive,
        scrollWheelZoom: interactive,
        dragging: interactive,
        touchZoom: interactive,
      });

      // CartoDB Positron / OpenStreetMap clean tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync center and zoom when changed externally
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center?.[0], center?.[1], zoom]);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    pois.forEach((poi) => {
      const isSelected = selectedPoiId === poi.id;
      const palette = CATEGORY_COLORS[poi.category] || { bg: '#292524', border: '#0c0a09', text: '#ffffff' };
      const markerSize = isSelected ? 38 : 30;

      // Custom SVG divIcon
      const iconHtml = `
        <div style="
          width: ${markerSize}px;
          height: ${markerSize}px;
          background-color: ${palette.bg};
          border: 2px solid ${isSelected ? '#ffffff' : palette.border};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        ">
          <div style="
            width: ${markerSize / 3.2}px;
            height: ${markerSize / 3.2}px;
            background-color: ${palette.text};
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-poi-marker',
        html: iconHtml,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize],
        popupAnchor: [0, -markerSize],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: customIcon });

      const popupContent = `
        <div style="min-width: 200px; max-width: 260px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 600; color: ${palette.bg}; letter-spacing: 0.05em; margin-bottom: 2px;">
            ${poi.category} · ${poi.destination}
          </div>
          <div style="font-weight: 700; font-size: 14px; color: #1c1917; margin-bottom: 6px;">
            ${poi.name}
          </div>
          <div style="font-size: 12px; color: #57534e; line-height: 1.4; margin-bottom: 8px;">
            ${poi.description}
          </div>
          <div style="font-size: 11px; background-color: #fafaf9; border: 1px solid #e7e5e4; padding: 6px 8px; border-radius: 6px; color: #78716c;">
            <strong style="color: #292524;">Local Tip:</strong> ${poi.localTip}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectPoi) {
          onSelectPoi(poi);
        }
      });

      marker.addTo(map);
      markersRef.current[poi.id] = marker;
    });

    // Auto-fit bounds if multiple POIs exist and no specific center forced
    if (pois.length > 1 && !selectedPoiId) {
      const bounds = L.latLngBounds(pois.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [pois, selectedPoiId]);

  // Open popup if selected
  useEffect(() => {
    if (selectedPoiId && markersRef.current[selectedPoiId]) {
      const marker = markersRef.current[selectedPoiId];
      marker.openPopup();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true });
      }
    }
  }, [selectedPoiId]);

  // Handle route line drawing between POIs in routePoiIds
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (routePoiIds && routePoiIds.length >= 2) {
      const routePoints: [number, number][] = [];
      routePoiIds.forEach((id) => {
        const found = pois.find((p) => p.id === id);
        if (found) {
          routePoints.push([found.lat, found.lng]);
        }
      });

      if (routePoints.length >= 2) {
        polylineRef.current = L.polyline(routePoints, {
          color: '#b45309', // amber-700
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8',
          lineJoin: 'round',
        }).addTo(map);

        map.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
      }
    }
  }, [routePoiIds, pois]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200 shadow-sm" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
