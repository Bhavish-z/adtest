import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdUnitType, AdPerformanceStats } from '../types/ads';

export const AD_CONFIGS: Record<AdUnitType, { name: string; dimensions: string; ecpm: number }> = {
  banner_468x60: { name: 'Classic Full Banner', dimensions: '468x60', ecpm: 1.25 },
  banner_300x250: { name: 'Medium Rectangle (MREC)', dimensions: '300x250', ecpm: 2.80 },
  banner_160x300: { name: 'Half Skyscraper', dimensions: '160x300', ecpm: 1.95 },
  banner_160x600: { name: 'Wide Skyscraper', dimensions: '160x600', ecpm: 3.40 },
  banner_320x50: { name: 'Mobile Leaderboard', dimensions: '320x50', ecpm: 1.65 },
  banner_728x90: { name: 'Desktop Leaderboard', dimensions: '728x90', ecpm: 2.90 },
  social_bar_top: { name: 'Social Bar TOP', dimensions: 'Responsive Top', ecpm: 4.50 },
  native_banner: { name: 'Native Recommendation Banner', dimensions: 'Fluid Grid', ecpm: 3.85 },
  popunder_top: { name: 'Popunder TOP', dimensions: 'Modal / Overlay', ecpm: 5.20 },
  smartlink: { name: 'Smartlink Dynamic Offer', dimensions: 'Text / CTA', ecpm: 4.10 },
};

interface AdContextValue {
  enabledFormats: Record<AdUnitType, boolean>;
  stats: Record<AdUnitType, AdPerformanceStats>;
  toggleFormat: (type: AdUnitType) => void;
  recordImpression: (type: AdUnitType) => void;
  recordClick: (type: AdUnitType) => void;
  resetAllStats: () => void;
  activePopunder: boolean;
  openPopunder: () => void;
  closePopunder: () => void;
}

const AdContext = createContext<AdContextValue | undefined>(undefined);

const INITIAL_ENABLED: Record<AdUnitType, boolean> = {
  banner_468x60: true,
  banner_300x250: true,
  banner_160x300: true,
  banner_160x600: true,
  banner_320x50: true,
  banner_728x90: true,
  social_bar_top: true,
  native_banner: true,
  popunder_top: true,
  smartlink: true,
};

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabledFormats, setEnabledFormats] = useState<Record<AdUnitType, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wanderlore_ad_formats');
      return saved ? JSON.parse(saved) : INITIAL_ENABLED;
    } catch {
      return INITIAL_ENABLED;
    }
  });

  const [stats, setStats] = useState<Record<AdUnitType, AdPerformanceStats>>(() => {
    try {
      const saved = localStorage.getItem('wanderlore_ad_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    const initial: Partial<Record<AdUnitType, AdPerformanceStats>> = {};
    (Object.keys(AD_CONFIGS) as AdUnitType[]).forEach((type) => {
      // Seed initial realistic impressions so user can see immediate metrics
      const imp = Math.floor(120 + Math.random() * 80);
      const clk = Math.max(1, Math.floor(imp * (0.015 + Math.random() * 0.035)));
      const ctr = Number(((clk / imp) * 100).toFixed(2));
      const ecpm = AD_CONFIGS[type].ecpm;
      const rev = Number(((imp / 1000) * ecpm).toFixed(2));
      initial[type] = {
        impressions: imp,
        clicks: clk,
        ctr,
        estimatedRevenue: rev,
      };
    });
    return initial as Record<AdUnitType, AdPerformanceStats>;
  });

  const [activePopunder, setActivePopunder] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wanderlore_ad_formats', JSON.stringify(enabledFormats));
    } catch (e) {
      console.warn('Ad format storage failed', e);
    }
  }, [enabledFormats]);

  useEffect(() => {
    try {
      localStorage.setItem('wanderlore_ad_stats', JSON.stringify(stats));
    } catch (e) {
      console.warn('Ad stats storage failed', e);
    }
  }, [stats]);

  const toggleFormat = (type: AdUnitType) => {
    setEnabledFormats((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const recordImpression = (type: AdUnitType) => {
    setStats((prev) => {
      const current = prev[type] || { impressions: 0, clicks: 0, ctr: 0, estimatedRevenue: 0 };
      const newImp = current.impressions + 1;
      const newCtr = Number(((current.clicks / newImp) * 100).toFixed(2));
      const ecpm = AD_CONFIGS[type]?.ecpm || 2.0;
      const newRev = Number(((newImp / 1000) * ecpm).toFixed(2));
      return {
        ...prev,
        [type]: {
          ...current,
          impressions: newImp,
          ctr: newCtr,
          estimatedRevenue: newRev,
        },
      };
    });
  };

  const recordClick = (type: AdUnitType) => {
    setStats((prev) => {
      const current = prev[type] || { impressions: 1, clicks: 0, ctr: 0, estimatedRevenue: 0 };
      const newClk = current.clicks + 1;
      const newCtr = Number(((newClk / current.impressions) * 100).toFixed(2));
      const ecpm = AD_CONFIGS[type]?.ecpm || 2.0;
      const newRev = Number(((current.impressions / 1000) * ecpm + (newClk * 0.15)).toFixed(2));
      return {
        ...prev,
        [type]: {
          ...current,
          clicks: newClk,
          ctr: newCtr,
          estimatedRevenue: newRev,
        },
      };
    });
  };

  const resetAllStats = () => {
    const fresh: Partial<Record<AdUnitType, AdPerformanceStats>> = {};
    (Object.keys(AD_CONFIGS) as AdUnitType[]).forEach((type) => {
      fresh[type] = { impressions: 1, clicks: 0, ctr: 0, estimatedRevenue: 0 };
    });
    setStats(fresh as Record<AdUnitType, AdPerformanceStats>);
  };

  const openPopunder = () => {
    recordImpression('popunder_top');
    setActivePopunder(true);
  };

  const closePopunder = () => {
    setActivePopunder(false);
  };

  return (
    <AdContext.Provider
      value={{
        enabledFormats,
        stats,
        toggleFormat,
        recordImpression,
        recordClick,
        resetAllStats,
        activePopunder,
        openPopunder,
        closePopunder,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};
