import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Sparkles, TrendingUp, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { useAds, AD_CONFIGS } from '../../context/AdContext';
import { AdUnitType } from '../../types/ads';

export const SMARTLINK_URL = 'https://arwf.org/4/f97e329cd6ff1ff5914c922923374b52';

interface AdProps {
  id?: string;
  className?: string;
}

// Reusable iframe ad renderer that executes the exact atOptions script in an isolated context
interface IframeAdProps {
  type: AdUnitType;
  adKey: string;
  width: number;
  height: number;
  title: string;
  className?: string;
}

const IframeAdRenderer: React.FC<IframeAdProps> = ({
  type,
  adKey,
  width,
  height,
  title,
  className = '',
}) => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [clickedFeedback, setClickedFeedback] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (enabledFormats[type]) {
      recordImpression(type);
    }
  }, [type, enabledFormats[type]]);

  if (!enabledFormats[type]) return null;

  const config = AD_CONFIGS[type];
  const unitStats = stats[type] || { impressions: 0, clicks: 0, ctr: 0 };

  const handleClick = (e: React.MouseEvent) => {
    recordClick(type);
    setClickedFeedback(true);
    setTimeout(() => setClickedFeedback(false), 1800);
  };

  // Exact HTML payload executing the user's atOptions script
  const iframeHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${adKey}',
      'format' : 'iframe',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bicea.org/22/${adKey}"></script>
</body>
</html>`;

  return (
    <div
      onClick={handleClick}
      className={`relative mx-auto rounded-xl overflow-hidden border border-stone-300/80 bg-white shadow-xs group transition-all hover:border-amber-600/70 ${className}`}
      style={{ width: `${width}px`, maxWidth: '100%', height: `${height}px` }}
    >
      {/* Ad Format Header Tag */}
      <div className="absolute top-1 right-1.5 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-900/85 text-[9px] font-mono font-medium text-stone-200 pointer-events-none">
        <span>{config.dimensions}</span>
        <span className="text-amber-400">· CTR {unitStats.ctr}%</span>
      </div>

      {/* The Live Ad Network Iframe with user's atOptions code */}
      <iframe
        title={`Ad Unit ${config.dimensions} - ${title}`}
        srcDoc={iframeHtml}
        width={width}
        height={height}
        onLoad={() => setAdLoaded(true)}
        className="w-full h-full border-0 block overflow-hidden z-10 relative"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />

      {/* Fallback Display underneath if ad blocker intercepts the 3rd-party script */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider mb-0.5">
          {config.name} ({config.dimensions})
        </div>
        <div className="text-xs font-bold text-stone-800 line-clamp-1">
          {title}
        </div>
        <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1 font-mono">
          <span>Key: {adKey.slice(0, 8)}...</span>
        </div>
      </div>

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

// 1. Banner : 468x60
// Key: bb98a6b3e416d88c0114b2ab48e1744f
export const Banner468x60: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full overflow-x-auto py-1">
      <IframeAdRenderer
        type="banner_468x60"
        adKey="bb98a6b3e416d88c0114b2ab48e1744f"
        width={468}
        height={60}
        title="Japan Rail & High-Speed Transit 468x60"
        className={className}
      />
    </div>
  );
};

// 2. 300x250 (Medium Rectangle)
// Key: 8a39e28fb8bb4b737db2af8278d84752
export const Banner300x250: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full py-1">
      <IframeAdRenderer
        type="banner_300x250"
        adKey="8a39e28fb8bb4b737db2af8278d84752"
        width={300}
        height={250}
        title="Curated Villa Stays & Retreats 300x250"
        className={className}
      />
    </div>
  );
};

// 3. 160x300 (Half Skyscraper)
// Key: fdb96a52d95db7c2726b6cac50dc072e
export const Banner160x300: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full py-1">
      <IframeAdRenderer
        type="banner_160x300"
        adKey="fdb96a52d95db7c2726b6cac50dc072e"
        width={160}
        height={300}
        title="Field Expedition Rucksacks 160x300"
        className={className}
      />
    </div>
  );
};

// 4. 160x600 (Wide Skyscraper)
// Key: bedbbf316e2fa58d893014257db98f3e
export const Banner160x600: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full py-1">
      <IframeAdRenderer
        type="banner_160x600"
        adKey="bedbbf316e2fa58d893014257db98f3e"
        width={160}
        height={600}
        title="Grand European Rail Pass 160x600"
        className={className}
      />
    </div>
  );
};

// 5. 320x50 (Mobile Leaderboard)
// Key: 6ebe642f2dc993110599930f03786c48
export const Banner320x50: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full py-1">
      <IframeAdRenderer
        type="banner_320x50"
        adKey="6ebe642f2dc993110599930f03786c48"
        width={320}
        height={50}
        title="Worldwide Travel eSIM 320x50"
        className={className}
      />
    </div>
  );
};

// 6. 728x90 (Standard Leaderboard)
// Key: bd821831aabb1983f5b0b6d312025a59
export const Banner728x90: React.FC<AdProps> = ({ className = '' }) => {
  return (
    <div className="flex justify-center w-full overflow-x-auto py-1">
      <IframeAdRenderer
        type="banner_728x90"
        adKey="bd821831aabb1983f5b0b6d312025a59"
        width={728}
        height={90}
        title="World Nomads Ethical Travel Insurance 728x90"
        className={className}
      />
    </div>
  );
};

// 7. Native Banner:
// <script async="async" data-cfasync="false" src="https://bicea.org/21/8f0f4574024177ba8db8a68cca37904a"></script>
// <div id="container-8f0f4574024177ba8db8a68cca37904a"></div>
export const NativeBanner: React.FC<AdProps> = ({ className = '' }) => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [clickedFeedback, setClickedFeedback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabledFormats.native_banner) {
      recordImpression('native_banner');

      // Inject the user's native banner script tag dynamically
      const scriptId = 'native-ad-script-8f0f';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://bicea.org/21/8f0f4574024177ba8db8a68cca37904a';
        document.body.appendChild(script);
      }
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

      {/* Target Container required by user's native ad script */}
      <div id="container-8f0f4574024177ba8db8a68cca37904a" ref={containerRef} className="w-full min-h-[10px]" />

      {/* 3-column native grid (renders alongside or as fallback) */}
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

// 8. Smartlink:
// URL: https://arwf.org/4/f97e329cd6ff1ff5914c922923374b52
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
    window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 p-2.5 bg-amber-50 hover:bg-amber-100/90 border border-amber-200 rounded-xl cursor-pointer transition-colors shadow-2xs group ${className}`}
    >
      <div className="w-6 h-6 rounded-md bg-amber-700 text-white flex items-center justify-center shrink-0">
        <TrendingUp className="w-3.5 h-3.5" />
      </div>
      <div className="text-left">
        <div className="text-[9px] font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <span>Smartlink</span>
          <span>·</span>
          <span>{category}</span>
          <span className="text-stone-500 font-mono">(CTR {unitStats.ctr}%)</span>
        </div>
        <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900 transition-colors flex items-center gap-1">
          <span>{anchorText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
};
