import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, TrendingUp, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { useAds, AD_CONFIGS } from '../../context/AdContext';
import { AdUnitType } from '../../types/ads';

interface AdProps {
  id?: string;
  className?: string;
}

// Helper container with ad format badge and click feedback
const AdWrapper: React.FC<{
  type: AdUnitType;
  width: string;
  height: string;
  children: React.ReactNode;
  className?: string;
}> = ({ type, width, height, children, className = '' }) => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [clickedFeedback, setClickedFeedback] = useState(false);

  useEffect(() => {
    if (enabledFormats[type]) {
      recordImpression(type);
    }
  }, [type, enabledFormats[type]]);

  if (!enabledFormats[type]) return null;

  const config = AD_CONFIGS[type];
  const unitStats = stats[type] || { impressions: 0, clicks: 0, ctr: 0, estimatedRevenue: 0 };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick(type);
    setClickedFeedback(true);
    setTimeout(() => setClickedFeedback(false), 1800);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative mx-auto bg-stone-100/90 border border-stone-300/80 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:border-amber-600/70 transition-all group ${className}`}
      style={{ width: '100%', maxWidth: width, minHeight: height }}
    >
      {/* Format Badge Indicator */}
      <div className="absolute top-1 right-1.5 z-20 flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-stone-900/80 text-[9px] font-mono font-medium text-stone-200">
        <span>{config.dimensions}</span>
        <span className="text-amber-400">· CTR {unitStats.ctr}%</span>
      </div>

      {children}

      {/* Click feedback toast overlay */}
      {clickedFeedback && (
        <div className="absolute inset-0 z-30 bg-stone-900/90 backdrop-blur-xs flex items-center justify-center p-2 text-center text-xs font-semibold text-amber-300 animate-fadeIn">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click Recorded! (+1 Conversion)</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 1. Banner : 468x60 (Classic Banner)
export const Banner468x60: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_468x60" width="468px" height="60px" className={className}>
      <div className="h-[60px] px-3 py-1 flex items-center justify-between gap-3 bg-gradient-to-r from-stone-100 via-white to-stone-100">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded bg-amber-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
            JR
          </div>
          <div className="truncate">
            <div className="text-[10px] text-amber-900 font-semibold uppercase tracking-wider">
              Japan Rail Pass 2026
            </div>
            <div className="text-xs font-bold text-stone-900 truncate">
              Unlimited High-Speed Shinkansen Travel
            </div>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded shadow-2xs">
          <span>Book Pass</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </AdWrapper>
  );
};

// 2. 300x250 (Medium Rectangle)
export const Banner300x250: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_300x250" width="300px" height="250px" className={className}>
      <div className="h-[250px] p-4 flex flex-col justify-between bg-white">
        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
            Sponsored Retreat
          </div>
          <h4 className="text-sm font-bold text-stone-900 font-display leading-snug">
            Kyoto Secluded Machiya Villas
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
            Private 120-year-old wooden townhouses featuring cedar aromatic bathtubs, private moss verandas, and daily in-villa tea ceremonies.
          </p>
          <div className="text-[11px] text-stone-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified Heritage Quality</span>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 block">From</span>
            <span className="text-sm font-bold text-stone-900 font-display">$190/night</span>
          </div>
          <div className="px-3 py-1.5 text-xs font-bold text-white bg-stone-900 rounded-lg flex items-center gap-1">
            <span>Check Dates</span>
            <ExternalLink className="w-3 h-3 text-stone-300" />
          </div>
        </div>
      </div>
    </AdWrapper>
  );
};

// 3. 160x300 (Half Skyscraper / Vertical Mini Banner)
export const Banner160x300: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_160x300" width="160px" height="300px" className={className}>
      <div className="h-[300px] p-3 flex flex-col justify-between bg-stone-50 text-center">
        <div className="space-y-2">
          <span className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider block">
            Field Gear
          </span>
          <div className="w-12 h-12 bg-stone-900 text-amber-400 rounded-full mx-auto flex items-center justify-center font-bold text-sm">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-xs font-bold text-stone-900 font-display leading-tight">
            Waxed Canvas Field Packs
          </h4>
          <p className="text-[11px] text-stone-600 leading-tight">
            Waterproof hiking rucksacks with lifetime guarantee.
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-stone-200">
          <div className="text-[10px] text-emerald-800 font-bold">20% Off Spring</div>
          <div className="w-full py-1 text-[11px] font-bold text-stone-900 bg-amber-400 rounded flex items-center justify-center gap-1">
            <span>Shop Now</span>
          </div>
        </div>
      </div>
    </AdWrapper>
  );
};

// 4. 160x600 (Wide Skyscraper)
export const Banner160x600: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_160x600" width="160px" height="600px" className={className}>
      <div className="h-[600px] p-3.5 flex flex-col justify-between bg-white text-center">
        <div className="space-y-4">
          <div className="text-[9px] font-semibold text-amber-800 uppercase tracking-widest pb-1 border-b border-stone-100">
            Slow Travel Partner
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-stone-800">EUROPASS</span>
            <h4 className="text-sm font-bold text-stone-900 font-display leading-tight">
              Grand Alpine & Coastal Rail Pass
            </h4>
          </div>

          <p className="text-[11px] text-stone-600 leading-relaxed text-left">
            Ride through 33 countries with 1 flexible ticket. High-speed panoramic trains through the Swiss Alps and Mediterranean coastlines.
          </p>

          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[10px] text-amber-900 text-left space-y-1">
            <div className="font-bold">Includes:</div>
            <div>· Unlimited train days</div>
            <div>· Free seat reservations</div>
            <div>· Ferry discounts</div>
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-stone-200">
          <div className="text-xs font-bold text-stone-900 font-display">
            From $245
          </div>
          <div className="w-full py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs flex items-center justify-center gap-1">
            <span>Get Pass</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </AdWrapper>
  );
};

// 5. 320x50 (Mobile Leaderboard)
export const Banner320x50: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_320x50" width="320px" height="50px" className={className}>
      <div className="h-[50px] px-3 py-1 flex items-center justify-between gap-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white">
        <div className="truncate">
          <div className="text-[9px] text-amber-400 font-semibold uppercase tracking-wider">
            Travel eSIM 5G
          </div>
          <div className="text-xs font-bold truncate">
            Unlimited Data in 160+ Countries
          </div>
        </div>
        <div className="shrink-0 text-[10px] font-bold bg-amber-400 text-stone-950 px-2 py-1 rounded">
          From $4.50
        </div>
      </div>
    </AdWrapper>
  );
};

// 6. 728x90 (Standard Leaderboard)
export const Banner728x90: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <AdWrapper type="banner_728x90" width="728px" height="90px" className={className}>
      <div className="h-[90px] px-5 py-2.5 flex items-center justify-between gap-4 bg-gradient-to-r from-stone-50 via-white to-stone-50">
        <div className="space-y-1 max-w-lg truncate">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
            <span>Official Sponsor</span>
            <span aria-hidden="true">·</span>
            <span>World Nomads Ethical Travel Insurance</span>
          </div>
          <div className="text-sm font-bold text-stone-900 font-display truncate">
            Explore with total peace of mind: High-altitude trekking & camera gear covered
          </div>
          <div className="text-[11px] text-stone-500 truncate">
            Trusted by over 2.4 million independent and slow travelers across 130+ countries worldwide.
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm">
          <span>Get Instant Quote</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </AdWrapper>
  );
};

// 7. Native Banner (Editorial Multi-item Sponsored Widget)
export const NativeBanner: React.FC<AdProps> = ({ className = '' }) => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [clickedFeedback, setClickedFeedback] = useState(false);

  useEffect(() => {
    if (enabledFormats.native_banner) {
      recordImpression('native_banner');
    }
  }, [enabledFormats.native_banner]);

  if (!enabledFormats.native_banner) return null;

  const unitStats = stats.native_banner || { impressions: 0, clicks: 0, ctr: 0 };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick('native_banner');
    setClickedFeedback(true);
    setTimeout(() => setClickedFeedback(false), 1800);
  };

  const nativeItems = [
    {
      title: 'How Traditional Kyoto Tea Masters Brew at 70°C for Savory Umami',
      sponsor: 'Ippodo Green Tea Co.',
      category: 'Culinary Craft',
      tag: 'Sponsored Article',
    },
    {
      title: 'The Italian Mule Tracks That Avoid Every Amalfi Ferry Tour Bus',
      sponsor: 'Campania Heritage Trails',
      category: 'Trail Atlas',
      tag: 'Sponsored Guide',
    },
    {
      title: 'Why Slow Travelers Are Switching to Hand-Waxed British Canvas Rucksacks',
      sponsor: 'Maison Basque Studio',
      category: 'Expedition Gear',
      tag: 'Partner Story',
    },
  ];

  return (
    <div className={`p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-display">
            Recommended Stories & Partner Dispatches
          </span>
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded font-semibold">
            Native Banner
          </span>
        </div>
        <span className="text-[10px] text-stone-500 font-mono">
          CTR: {unitStats.ctr}% · {unitStats.clicks} clicks
        </span>
      </div>

      {/* 3-column native grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nativeItems.map((item, idx) => (
          <div
            key={idx}
            onClick={handleCardClick}
            className="p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-amber-600/70 hover:bg-stone-100/70 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-stone-500">
                <span className="font-semibold text-amber-800">{item.category}</span>
                <span>{item.tag}</span>
              </div>
              <h5 className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                {item.title}
              </h5>
            </div>
            <div className="pt-3 mt-2 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
              <span>By {item.sponsor}</span>
              <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-stone-900" />
            </div>
          </div>
        ))}
      </div>

      {clickedFeedback && (
        <div className="absolute inset-0 z-30 bg-stone-900/90 backdrop-blur-xs rounded-2xl flex items-center justify-center p-4 text-center text-xs font-semibold text-amber-300">
          <span>Native Content Click Recorded (+1 Engagement)</span>
        </div>
      )}
    </div>
  );
};

// 8. Smartlink (Contextual Dynamic Offer Link)
export const Smartlink: React.FC<{
  anchorText?: string;
  category?: string;
  className?: string;
}> = ({
  anchorText = 'Compare Best Available Slow Travel Train Passes',
  category = 'Dynamic Rail & Ferry Routes',
  className = '',
}) => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (enabledFormats.smartlink) {
      recordImpression('smartlink');
    }
  }, [enabledFormats.smartlink]);

  if (!enabledFormats.smartlink) return null;

  const unitStats = stats.smartlink || { impressions: 0, clicks: 0, ctr: 0 };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick('smartlink');
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center gap-2 p-2.5 bg-amber-50 hover:bg-amber-100/90 border border-amber-200 rounded-xl cursor-pointer transition-colors shadow-2xs group ${className}`}
    >
      <div className="w-6 h-6 rounded-md bg-amber-700 text-white flex items-center justify-center shrink-0">
        <TrendingUp className="w-3.5 h-3.5" />
      </div>
      <div className="text-left">
        <div className="text-[9px] font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <span>Smartlink Offer</span>
          <span>·</span>
          <span>{category}</span>
          <span className="text-stone-500 font-mono">(CTR {unitStats.ctr}%)</span>
        </div>
        <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900 transition-colors flex items-center gap-1">
          <span>{clicked ? 'Smartlink Redirecting to Best Regional Provider...' : anchorText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
