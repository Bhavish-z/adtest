import React, { useState } from 'react';
import { ExternalLink, Info, X } from 'lucide-react';

export type AdFormat = 'leaderboard' | 'medium-rectangle' | 'in-feed' | 'billboard';

interface AdPlacementProps {
  format: AdFormat;
  partnerName?: string;
  category?: string;
  tagline?: string;
  ctaText?: string;
  image?: string;
  destinationTag?: string;
  className?: string;
}

const DEFAULT_PARTNERS: Record<string, { partnerName: string; category: string; tagline: string; ctaText: string; destinationTag: string }> = {
  leaderboard: {
    partnerName: 'Japan Rail Pass & Regional Liners',
    category: 'Scenic Transit',
    tagline: 'Unlimited travel across Shinkansen bullet trains and historic rural lines with flexible 7, 14, and 21-day passes.',
    ctaText: 'Check Rail Routes',
    destinationTag: 'Japan & East Asia',
  },
  'medium-rectangle': {
    partnerName: 'Terraform Botanical Stays',
    category: 'Eco-Sanctuaries',
    tagline: 'Solar-powered stone villas and heritage farmhouse retreats nestled in coastal hills.',
    ctaText: 'Explore Stays',
    destinationTag: 'Sustainable Stays',
  },
  'in-feed': {
    partnerName: 'Maison Basque Canvas & Leather Goods',
    category: 'Artisan Gear',
    tagline: 'Waterproof waxed canvas rucksacks and hand-stitched travel journals crafted for decades of slow exploration.',
    ctaText: 'View Artisan Gear',
    destinationTag: 'Heritage Craft',
  },
  billboard: {
    partnerName: 'World Nomads Ethical Traveler Cover',
    category: 'Travel Insurance',
    tagline: 'Flexible travel insurance covering high-altitude trekking, lost artisan cargo, and emergency medical repatriation in 130+ countries.',
    ctaText: 'Get Instant Quote',
    destinationTag: 'Global Coverage',
  },
};

export const AdPlacement: React.FC<AdPlacementProps> = ({
  format,
  partnerName,
  category,
  tagline,
  ctaText,
  image,
  destinationTag,
  className = '',
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (dismissed) {
    return (
      <div className="py-2 px-4 bg-stone-100 rounded-lg border border-stone-200 text-center text-[11px] text-stone-500 flex items-center justify-between">
        <span>Advertisement hidden for this session.</span>
        <button
          onClick={() => setDismissed(false)}
          className="underline hover:text-stone-800"
        >
          Restore
        </button>
      </div>
    );
  }

  const defaultData = DEFAULT_PARTNERS[format] || DEFAULT_PARTNERS.leaderboard;
  const pName = partnerName || defaultData.partnerName;
  const pCategory = category || defaultData.category;
  const pTagline = tagline || defaultData.tagline;
  const pCta = ctaText || defaultData.ctaText;
  const pTag = destinationTag || defaultData.destinationTag;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  // 1. Medium Rectangle (300x250 style for sidebars / panels)
  if (format === 'medium-rectangle') {
    return (
      <aside aria-label="Sponsored Content" className={`relative bg-stone-100/90 rounded-2xl border border-stone-200/90 p-4 overflow-hidden ${className}`}>
        {/* Ad disclosure header */}
        <div className="flex items-center justify-between text-[10px] text-stone-600 mb-2.5 pb-1.5 border-b border-stone-200">
          <span className="uppercase font-semibold tracking-wider">Sponsored Partner</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="hover:text-stone-700"
              title="About Wanderlore Curated Partners"
            >
              <Info className="w-3 h-3" />
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="hover:text-stone-700"
              title="Hide Ad"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {showInfo && (
          <div className="mb-3 p-2 bg-white rounded-lg text-[10px] text-stone-600 border border-stone-200">
            Wanderlore features vetted independent gear, transit, and eco-lodging partners that adhere to our ethical tourism charter.
          </div>
        )}

        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
            {pCategory} · {pTag}
          </div>
          <h4 className="text-sm font-bold text-stone-900 font-display leading-snug">
            {pName}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
            {pTagline}
          </p>

          <button
            onClick={handleClick}
            className="w-full mt-3 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>{clicked ? 'Partner Page Opened' : pCta}</span>
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </button>
        </div>
      </aside>
    );
  }

  // 2. In-Feed Card (matches tour or blog grid)
  if (format === 'in-feed') {
    return (
      <aside aria-label="Sponsored Content" className={`bg-stone-100/80 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between group ${className}`}>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-[10px] text-stone-600 pb-2 border-b border-stone-200">
            <span className="uppercase font-semibold tracking-wider">Curated Placement</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="hover:text-stone-700"
              >
                <Info className="w-3 h-3" />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="hover:text-stone-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {showInfo && (
            <div className="p-2 bg-white rounded-lg text-[10px] text-stone-600 border border-stone-200">
              Vetted artisan partner aligning with slow-living craftsmanship.
            </div>
          )}

          <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
            {pCategory} · {pTag}
          </div>

          <h3 className="text-base font-bold text-stone-900 font-display leading-snug">
            {pName}
          </h3>

          <p className="text-xs text-stone-600 leading-relaxed">
            {pTagline}
          </p>
        </div>

        <div className="p-6 pt-0 mt-2">
          <button
            onClick={handleClick}
            className="w-full py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>{clicked ? 'Connecting to Partner...' : pCta}</span>
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </button>
        </div>
      </aside>
    );
  }

  // 3. Leaderboard & Billboard (Horizontal Banner for page sections)
  return (
    <aside aria-label="Sponsored Content" className={`relative w-full bg-stone-100/90 rounded-2xl border border-stone-200/90 p-4 sm:p-5 overflow-hidden ${className}`}>
      {/* Micro ad label row */}
      <div className="flex items-center justify-between text-[10px] text-stone-600 mb-2 pb-1.5 border-b border-stone-200">
        <span className="uppercase font-semibold tracking-wider">Partner Spotlight</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:text-stone-700 inline-flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span className="hidden sm:inline">Ad Disclosure</span>
          </button>
          <span>·</span>
          <button
            onClick={() => setDismissed(true)}
            className="hover:text-stone-700 inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span className="hidden sm:inline">Hide</span>
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-2 p-2 bg-white rounded-lg text-[10px] text-stone-600 border border-stone-200">
          This ad supports Wanderlore independent journalism and native guide honorarium fund.
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold uppercase tracking-wider">
            <span>{pCategory}</span>
            <span aria-hidden="true">·</span>
            <span>{pTag}</span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-stone-900 font-display">
            {pName}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {pTagline}
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={handleClick}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs whitespace-nowrap"
          >
            <span>{clicked ? 'Opening Partner...' : pCta}</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>
      </div>
    </aside>
  );
};
