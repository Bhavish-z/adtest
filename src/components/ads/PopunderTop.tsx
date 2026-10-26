import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useAds } from '../../context/AdContext';

export const PopunderTop: React.FC = () => {
  const { enabledFormats, activePopunder, closePopunder, recordClick, stats } = useAds();
  const [clicked, setClicked] = useState(false);

  if (!enabledFormats.popunder_top || !activePopunder) return null;

  const unitStats = stats.popunder_top || { impressions: 0, clicks: 0, ctr: 0 };

  const handleAction = () => {
    recordClick('popunder_top');
    setClicked(true);
    window.open('https://arwf.org/4/f97e329cd6ff1ff5914c922923374b52', '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setClicked(false);
      closePopunder();
    }, 1800);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 p-4 flex justify-center animate-slideDown pointer-events-none">
      <div className="pointer-events-auto w-full max-w-xl bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-amber-600/60 p-5 space-y-4">
        
        {/* Top bar with ad indicator */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[10px] text-stone-400">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">
              PopunderTOP Simulated Window
            </span>
            <span>·</span>
            <span>High-Performing Interstitial</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-amber-400">CTR {unitStats.ctr}%</span>
            <button
              onClick={closePopunder}
              className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Exclusive Slow Traveler Privilege</span>
          </div>

          <h3 className="text-lg font-bold text-white font-display">
            Complimentary Private Tea Ceremony Voucher ($50 Value)
          </h3>

          <p className="text-xs text-stone-300 leading-relaxed">
            Reserved exclusively for Wanderlore readers: Receive a direct voucher valid for private machiya tea tastings or cliffside Amalfi lemon granita tastings with any 2026 reservation.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-800">
          <span className="text-[11px] text-stone-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Spam · One-Click Redeem</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={closePopunder}
              className="px-3 py-1.5 text-xs text-stone-400 hover:text-white transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleAction}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {clicked ? (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Voucher Unlocked!</span>
                </>
              ) : (
                <>
                  <span>Activate Voucher Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
