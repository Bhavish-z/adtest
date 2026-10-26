import React, { useState } from 'react';
import { 
  BarChart3, 
  X, 
  TrendingUp, 
  MousePointerClick, 
  DollarSign, 
  Eye, 
  RotateCcw, 
  Play, 
  Check, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAds, AD_CONFIGS } from '../../context/AdContext';
import { AdUnitType } from '../../types/ads';

export const AdPerformanceLab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    enabledFormats, 
    toggleFormat, 
    stats, 
    recordClick, 
    resetAllStats, 
    openPopunder 
  } = useAds();

  const adKeys = Object.keys(AD_CONFIGS) as AdUnitType[];

  // Calculate aggregates
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalRevenue = 0;

  adKeys.forEach((key) => {
    const s = stats[key] || { impressions: 0, clicks: 0, estimatedRevenue: 0 };
    totalImpressions += s.impressions;
    totalClicks += s.clicks;
    totalRevenue += s.estimatedRevenue;
  });

  const aggregateCtr = totalImpressions > 0 
    ? Number(((totalClicks / totalImpressions) * 100).toFixed(2)) 
    : 0;

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2.5 rounded-xl shadow-2xl border border-amber-500/50 flex items-center gap-2 text-xs font-semibold hover:scale-105 transition-all group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <BarChart3 className="w-4 h-4 text-amber-400" />
        <span>Ad Performance Lab</span>
        <span className="px-1.5 py-0.2 bg-amber-400/20 text-amber-300 font-mono text-[10px] rounded">
          {adKeys.filter((k) => enabledFormats[k]).length}/10 Active
        </span>
      </button>

      {/* Main Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-700" />
                  <h3 className="text-lg font-bold text-stone-900 font-display">
                    Ad Unit Format Performance Lab
                  </h3>
                </div>
                <p className="text-xs text-stone-500">
                  Live diagnostics for all 10 requested ad units. Toggle formats, simulate user clicks, and analyze CTR & revenue performance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openPopunder}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-amber-800" />
                  <span>Test PopunderTOP</span>
                </button>
                <button
                  onClick={resetAllStats}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
                  title="Reset Metrics"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 bg-stone-100/60 border-b border-stone-200">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Total Impressions
                </span>
                <div className="text-xl font-bold text-stone-900 font-display tabular-nums mt-0.5">
                  {totalImpressions.toLocaleString()}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Fired across pages
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Total Clicks
                </span>
                <div className="text-xl font-bold text-stone-900 font-display tabular-nums mt-0.5">
                  {totalClicks.toLocaleString()}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                  <MousePointerClick className="w-3 h-3" /> Engaged users
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Average CTR
                </span>
                <div className="text-xl font-bold text-amber-800 font-display tabular-nums mt-0.5">
                  {aggregateCtr}%
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Click-Through Rate
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Estimated Revenue
                </span>
                <div className="text-xl font-bold text-emerald-700 font-display tabular-nums mt-0.5">
                  ${totalRevenue.toFixed(2)}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Combined eCPM yield
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-800">
                  Ad Unit Format Breakdown ({adKeys.length} Formats Tested)
                </span>
                <span>Click "Simulate Click" to test live CTR increases</span>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Ad Unit Format</th>
                      <th className="py-2.5 px-3">Dimensions</th>
                      <th className="py-2.5 px-3 text-right">Imp.</th>
                      <th className="py-2.5 px-3 text-right">Clicks</th>
                      <th className="py-2.5 px-3 text-right">CTR</th>
                      <th className="py-2.5 px-3 text-right">Est. eCPM</th>
                      <th className="py-2.5 px-3 text-right">Est. Rev.</th>
                      <th className="py-2.5 px-3 text-center">Test Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {adKeys.map((key) => {
                      const cfg = AD_CONFIGS[key];
                      const s = stats[key] || { impressions: 0, clicks: 0, ctr: 0, estimatedRevenue: 0 };
                      const isEnabled = enabledFormats[key];

                      return (
                        <tr
                          key={key}
                          className={`hover:bg-stone-50/70 transition-colors ${
                            !isEnabled ? 'opacity-40 bg-stone-50/40' : ''
                          }`}
                        >
                          {/* Toggle switch */}
                          <td className="py-2.5 px-3">
                            <button
                              onClick={() => toggleFormat(key)}
                              className={`w-8 h-4 rounded-full transition-colors relative ${
                                isEnabled ? 'bg-stone-900' : 'bg-stone-300'
                              }`}
                            >
                              <span
                                className={`block w-3 h-3 bg-white rounded-full transition-transform absolute top-0.5 ${
                                  isEnabled ? 'left-4.5' : 'left-0.5'
                                }`}
                              />
                            </button>
                          </td>

                          {/* Name */}
                          <td className="py-2.5 px-3 font-semibold text-stone-900">
                            {cfg.name}
                          </td>

                          {/* Dimensions */}
                          <td className="py-2.5 px-3">
                            <span className="font-mono bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-[11px] font-bold">
                              {cfg.dimensions}
                            </span>
                          </td>

                          {/* Impressions */}
                          <td className="py-2.5 px-3 text-right tabular-nums text-stone-600 font-mono">
                            {s.impressions}
                          </td>

                          {/* Clicks */}
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold text-stone-900 font-mono">
                            {s.clicks}
                          </td>

                          {/* CTR */}
                          <td className="py-2.5 px-3 text-right tabular-nums font-mono">
                            <span
                              className={`px-1.5 py-0.5 rounded font-bold ${
                                s.ctr >= 3.0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : s.ctr >= 1.5
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              {s.ctr}%
                            </span>
                          </td>

                          {/* eCPM */}
                          <td className="py-2.5 px-3 text-right tabular-nums text-stone-500 font-mono">
                            ${cfg.ecpm.toFixed(2)}
                          </td>

                          {/* Estimated Revenue */}
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold text-emerald-800 font-mono">
                            ${s.estimatedRevenue.toFixed(2)}
                          </td>

                          {/* Test Trigger */}
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => recordClick(key)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded border border-stone-200 transition-colors"
                            >
                              + Click
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Format Placement Guide */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <span className="font-semibold text-stone-900 block">
                  Placement Guide Across Wanderlore:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                  <div>· <strong>728x90:</strong> Leaderboard in Home & Guides top sections</div>
                  <div>· <strong>468x60:</strong> Classic Banner in Guides & Blog reader</div>
                  <div>· <strong>300x250:</strong> Medium Rectangle in Interactive Map sidebar</div>
                  <div>· <strong>160x600:</strong> Wide Skyscraper in Guides & Map flanked layout</div>
                  <div>· <strong>160x300:</strong> Half Skyscraper in Tour Details side rail</div>
                  <div>· <strong>320x50:</strong> Mobile Leaderboard in responsive views</div>
                  <div>· <strong>Social BarTOP:</strong> Docked top alert ticker with CTR tracking</div>
                  <div>· <strong>Native Banner:</strong> Multi-story sponsored recommendation grid</div>
                  <div>· <strong>PopunderTOP:</strong> High-intent modal drawer with voucher offer</div>
                  <div>· <strong>Smartlink:</strong> Dynamic contextual offer link in articles</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>All metrics persist locally in your browser session.</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
              >
                Close Lab
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
