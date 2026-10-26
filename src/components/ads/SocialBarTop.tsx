import React, { useEffect, useState } from 'react';
import { Bell, Flame, X, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useAds } from '../../context/AdContext';

export const SocialBarTop: React.FC = () => {
  const { enabledFormats, recordImpression, recordClick, stats } = useAds();
  const [dismissed, setDismissed] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (enabledFormats.social_bar_top && !dismissed) {
      recordImpression('social_bar_top');
    }
  }, [enabledFormats.social_bar_top, dismissed]);

  if (!enabledFormats.social_bar_top || dismissed) return null;

  const unitStats = stats.social_bar_top || { impressions: 0, clicks: 0, ctr: 0 };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick('social_bar_top');
    setClicked(true);
    window.open('https://arwf.org/4/f97e329cd6ff1ff5914c922923374b52', '_blank', 'noopener,noreferrer');
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div
      onClick={handleClick}
      className="relative z-40 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-stone-100 border-b border-amber-900/50 py-2 px-4 shadow-sm cursor-pointer transition-colors hover:brightness-105"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        
        {/* Left: Social Bar Badge & Proof */}
        <div className="flex items-center gap-2.5 truncate">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider shrink-0">
            <Flame className="w-3 h-3 text-amber-400" />
            Social BarTOP
          </span>
          <span className="text-stone-300 truncate hidden sm:inline">
            <strong className="text-white">Live Traveler Alert:</strong> 38 slow travelers secured Kyoto dawn sanctuary spots today.
          </span>
          <span className="text-stone-200 truncate sm:hidden">
            Kyoto dawn sanctuary spots 85% full.
          </span>
        </div>

        {/* Center / Right: Offer & CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold hover:text-white transition-colors">
            <span>{clicked ? 'Offer Activated (+1 Click)' : 'Claim $25 Welcome Voucher'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          <span className="hidden md:inline text-[10px] font-mono text-stone-400">
            CTR: {unitStats.ctr}%
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="p-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded transition-colors"
            title="Dismiss Social Bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {clicked && (
        <div className="absolute inset-0 bg-amber-900/90 flex items-center justify-center text-xs font-bold text-white z-50">
          <Sparkles className="w-4 h-4 text-amber-300 mr-2" />
          Social Bar Click Tracked! Redirecting to Exclusive Offer...
        </div>
      )}
    </div>
  );
};
