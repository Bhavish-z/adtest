export type AdUnitType =
  | 'banner_468x60'
  | 'banner_300x250'
  | 'banner_160x300'
  | 'banner_160x600'
  | 'banner_320x50'
  | 'banner_728x90'
  | 'social_bar_top'
  | 'native_banner'
  | 'popunder_top'
  | 'smartlink';

export interface AdFormatConfig {
  id: AdUnitType;
  name: string;
  dimensions: string;
  category: string;
  description: string;
  avgEcpm: number; // e.g. $1.80
  baseCtr: number;  // e.g. 1.4%
}

export interface AdPerformanceStats {
  impressions: number;
  clicks: number;
  ctr: number;
  estimatedRevenue: number;
}
