import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Compass, 
  Sparkles, 
  Info,
  ChevronRight
} from 'lucide-react';
import { LocalGuide, Tour, MapPOI } from '../types/travel';
import { InteractiveMap } from '../components/InteractiveMap';
import { AdPlacement } from '../components/AdPlacement';

interface GuidesPageProps {
  guides: LocalGuide[];
  tours: Tour[];
  pois: MapPOI[];
  selectedGuideSlug?: string;
  onBookTour: (tour: Tour) => void;
  onViewTourDetails: (tour: Tour) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  guides,
  tours,
  pois,
  selectedGuideSlug,
  onBookTour,
  onViewTourDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeGuide, setActiveGuide] = useState<LocalGuide | null>(() => {
    if (selectedGuideSlug) {
      return guides.find((g) => g.slug === selectedGuideSlug) || null;
    }
    return null;
  });

  const categories = ['All', 'Historic Sanctuaries', 'Coastal Wandering', 'Urban Heritage'];

  const filteredGuides = guides.filter((g) => {
    const matchesQuery =
      !searchQuery ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || g.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  // If a guide is active, render the full deep-dive guide reader view
  if (activeGuide) {
    const guidePois = pois.filter((p) => p.destination === activeGuide.destination);
    const relatedTour = tours.find((t) => t.id === activeGuide.relatedTourId) || tours[0];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
        {/* Back navigation */}
        <button
          onClick={() => setActiveGuide(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destination Guides</span>
        </button>

        {/* Guide Header Banner */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
            <span className="font-semibold text-amber-800 uppercase tracking-wider">{activeGuide.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeGuide.destination}, {activeGuide.country}</span>
            <span aria-hidden="true">·</span>
            <span>{activeGuide.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 font-display leading-tight text-balance">
            {activeGuide.title}
          </h1>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/60 flex items-start gap-3 text-xs text-amber-950">
            <Calendar className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Best Season to Visit:</strong> {activeGuide.bestTimeToVisit}
            </div>
          </div>

          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={activeGuide.coverImage}
              alt={activeGuide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-3xl">
            {activeGuide.intro}
          </p>
        </div>

        {/* Interactive Guide Map Section */}
        <section className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Cartographic Overview
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                Key Sanctuary Map: {activeGuide.destination}
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              {guidePois.length} Pinpointed Locations
            </span>
          </div>

          <div className="h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <InteractiveMap
              pois={guidePois.length > 0 ? guidePois : pois}
              center={activeGuide.centerCoords}
              zoom={activeGuide.zoomLevel}
              height="420px"
            />
          </div>

          {/* Top Spots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {activeGuide.topSpots.map((spot, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">{spot.name}</span>
                  <span className="text-stone-400 text-[11px]">{spot.category}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{spot.description}</p>
                <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-md border border-amber-200/50">
                  <strong>Steward Tip:</strong> {spot.localTip}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Neighborhood Breakdown */}
        <section className="space-y-6 pt-4 border-t border-stone-200">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Neighborhood Atlas
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Where to Wander in {activeGuide.destination}
            </h2>
          </div>

          <div className="space-y-4">
            {activeGuide.districts.map((district, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-stone-100">
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    {district.name}
                  </h3>
                  <span className="text-xs text-stone-500 italic">
                    Vibe: {district.vibe}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {district.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                    Local Insights:
                  </span>
                  {district.insiderTips.map((tip, tipIdx) => (
                    <div key={tipIdx} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="text-amber-800 font-bold shrink-0">·</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsored Stays & Transit Banner */}
        <div className="pt-2">
          <AdPlacement
            format="leaderboard"
            partnerName="Terraform Eco-Sanctuaries & Stone Villas"
            category="Curated Accommodation Partner"
            destinationTag={`${activeGuide.destination} & Regional Enclaves`}
            tagline={`Certified sustainable heritage farmhouses and boutique stone lodgings situated close to ${activeGuide.destination}'s quiet trails.`}
            ctaText="Browse Available Villas"
          />
        </div>

        {/* Suggested Day Itinerary */}
        <section className="space-y-6 pt-4 border-t border-stone-200">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Curated Field Plan
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              A Perfect 24 Hours in {activeGuide.destination}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeGuide.dayPlan.map((plan, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  {plan.period}
                </div>
                <h4 className="text-sm font-bold text-stone-900 font-display">
                  {plan.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {plan.activity}
                </p>
                <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <strong>Recommended Venue:</strong> {plan.recommendedVenue}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Etiquette Guidelines */}
        <section className="space-y-4 pt-4 border-t border-stone-200">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Respectful Stewardship
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Local Etiquette & Travel Customs
            </h2>
          </div>

          <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 space-y-2.5">
            {activeGuide.localEtiquette.map((custom, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>{custom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tour Bridge Callout */}
        {relatedTour && (
          <div className="p-8 bg-stone-900 text-stone-100 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Experience It In Person
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {relatedTour.title}
              </h3>
              <p className="text-xs text-stone-300 max-w-xl">
                Join native guide {relatedTour.guide.name} for an intimate {relatedTour.duration} journey with private access to these very sanctuaries.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onViewTourDetails(relatedTour)}
                className="px-4 py-2.5 text-xs font-medium text-stone-200 hover:text-white border border-stone-700 rounded-lg transition-colors"
              >
                View Full Itinerary
              </button>
              <button
                onClick={() => onBookTour(relatedTour)}
                className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              >
                Book This Tour (${relatedTour.price})
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Directory View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Page Title */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
          Field Intelligence Archive
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
          Local Insider Guides
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Comprehensive regional handbooks crafted by long-term residents. Detailed walking maps, neighborhood textures, and respectful travel principles.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search guides by region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sponsored Partner Banner */}
      <AdPlacement
        format="leaderboard"
        partnerName="Rail Europe & Heritage Express"
        category="Scenic Train Routes"
        destinationTag="Low-Carbon Travel"
        tagline="Cross country boundaries sustainably with high-speed panoramic rail passes, dining car reservations, and station lounge access."
        ctaText="Plan Rail Route"
      />

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setActiveGuide(guide)}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-stone-900/80 px-2.5 py-1 rounded">
                  {guide.destination} · {guide.country}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>

                {/* District tags */}
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] text-stone-500">
                  {guide.districts.map((d, i) => (
                    <span key={i} className="bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                      {d.name.split('&')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between text-xs font-semibold text-amber-800">
              <span>Read Complete Field Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
