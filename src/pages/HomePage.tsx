import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  Navigation,
  Quote
} from 'lucide-react';
import { Tour, LocalGuide, BlogPost, Review, MapPOI } from '../types/travel';
import { InteractiveMap } from '../components/InteractiveMap';
import { AdPlacement } from '../components/AdPlacement';

interface HomePageProps {
  tours: Tour[];
  guides: LocalGuide[];
  posts: BlogPost[];
  reviews: Review[];
  pois: MapPOI[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onBookTour: (tour: Tour) => void;
  onViewTourDetails: (tour: Tour) => void;
  onViewGuideDetails: (guide: LocalGuide) => void;
  onViewPostDetails: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  tours,
  guides,
  posts,
  reviews,
  pois,
  onNavigate,
  onBookTour,
  onViewTourDetails,
  onViewGuideDetails,
  onViewPostDetails,
}) => {
  const [destinationQuery, setDestinationQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Historic Alleys' | 'Coastal & Nature' | 'Culinary & Wine' | 'Artisans & Craft'>('All');
  const [selectedMapPoi, setSelectedMapPoi] = useState<MapPOI | null>(pois[0] || null);

  const filteredTours = tours.filter((tour) => {
    const matchesDest =
      !destinationQuery ||
      tour.destination.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(destinationQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || tour.category === activeCategory;
    return matchesDest && matchesCat;
  });

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-stone-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_travel_curated_journey_1792975378948.jpg"
            alt="Scenic cobblestone village during golden hour"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter brightness-95 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-stone-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <span>Wanderlore Collective</span>
              <span aria-hidden="true">·</span>
              <span>Intimate Small-Group Travel</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-[1.12]">
              Unrushed journeys guided by native historians and artisans.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              Leave the crowded tour bus corridors behind. Discover secluded Zen moss temples at dawn, walk terraced lemon groves with agronomists, and sit down to home-cooked meals in living cultural communities.
            </p>

            {/* Interactive Search Bar */}
            <div className="pt-4 max-w-2xl">
              <div className="p-2 bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full flex items-center px-3">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by destination (e.g. Kyoto, Amalfi, Lisbon, Oaxaca)..."
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    className="w-full py-2 bg-transparent text-sm text-stone-100 placeholder-stone-400 focus:outline-none"
                  />
                  {destinationQuery && (
                    <button
                      onClick={() => setDestinationQuery('')}
                      className="text-xs text-stone-400 hover:text-stone-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  onClick={() => onNavigate('tours', { query: destinationQuery })}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Explore Curated Tours
                </button>
              </div>

              {/* Quick destination anchors */}
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-stone-400">
                <span className="font-medium text-stone-300">Popular regions:</span>
                {['Kyoto', 'Amalfi Coast', 'Lisbon', 'Oaxaca'].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setDestinationQuery(dest)}
                    className="hover:text-amber-300 transition-colors underline underline-offset-4 decoration-stone-600 hover:decoration-amber-300"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four-Column KPI / Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-stone-200 shadow-xl">
          <div className="space-y-1 p-2">
            <div className="text-2xl font-bold text-stone-900 font-display tabular-nums">100%</div>
            <div className="text-xs font-semibold text-stone-800">Native Guide Stewardship</div>
            <div className="text-xs text-stone-500">Every tour led by certified historians and regional locals.</div>
          </div>
          <div className="space-y-1 p-2 border-l border-stone-100">
            <div className="text-2xl font-bold text-stone-900 font-display tabular-nums">Max 8–10</div>
            <div className="text-xs font-semibold text-stone-800">Capped Intimate Groups</div>
            <div className="text-xs text-stone-500">Zero megaphones, zero buses, zero rushed itineraries.</div>
          </div>
          <div className="space-y-1 p-2 border-l border-stone-100">
            <div className="text-2xl font-bold text-stone-900 font-display tabular-nums">4.96 / 5</div>
            <div className="text-xs font-semibold text-stone-800">Verified Traveler Score</div>
            <div className="text-xs text-stone-500">Over 380+ detailed field reviews across 5 regions.</div>
          </div>
          <div className="space-y-1 p-2 border-l border-stone-100">
            <div className="text-2xl font-bold text-stone-900 font-display tabular-nums">100%</div>
            <div className="text-xs font-semibold text-stone-800">Direct Fair-Pay Guarantee</div>
            <div className="text-xs text-stone-500">Artisans & family workshops receive full dignified rates.</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Curated Tours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Handcrafted Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Curated Small-Group Tours
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Limited to single departures each week. Designed to immerse you into living traditions with guaranteed entry and private access.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
            {(['All', 'Historic Alleys', 'Coastal & Nature', 'Culinary & Wine', 'Artisans & Craft'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-white text-stone-900 font-semibold shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.slice(0, 3).map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Tour Image Frame with fallback */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={tour.coverImage}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {tour.destination} · {tour.country}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-200">
                  <div className="flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tour.rating}</span>
                    <span className="text-stone-300 font-normal">({tour.reviewCount})</span>
                  </div>
                  <div className="text-stone-200 font-medium">
                    {tour.groupSize}
                  </div>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{tour.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {tour.duration}
                    </span>
                  </div>

                  <h3
                    onClick={() => onViewTourDetails(tour)}
                    className="text-base font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {tour.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {tour.tagline}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                  {tour.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-500 block">From</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-stone-900 font-display tabular-nums">
                        ${tour.price}
                      </span>
                      {tour.originalPrice && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ${tour.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewTourDetails(tour)}
                      className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 transition-colors"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onBookTour(tour)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('tours')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors"
          >
            <span>View All Curated Itineraries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Curated Partner Ad Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlacement
          format="leaderboard"
          partnerName="Japan Rail East & Scenic Alpine Shinkansen"
          category="Curated Transit Partner"
          destinationTag="East Asia & Alpine Passes"
          tagline="Reserve reserved panoramic carriage seats on the Hokuriku Shinkansen connecting Tokyo, Nagano, and Kyoto historic districts."
          ctaText="Explore Transit Passes"
        />
      </section>

      {/* 4. Interactive Local Highlights Map Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Geographic Cartography
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Interactive Local Sanctuary Map
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Pinpointed historic tearooms, clifftop trails, and artisan workshops. Click any pin to reveal field notes and local recommendations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <span>Open Fullscreen Map Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveMap
              pois={pois}
              selectedPoiId={selectedMapPoi?.id}
              onSelectPoi={(poi) => setSelectedMapPoi(poi)}
              height="440px"
            />
          </div>

          {/* Active POI Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm">
            {selectedMapPoi ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-amber-800">{selectedMapPoi.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedMapPoi.destination}</span>
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={selectedMapPoi.image}
                    alt={selectedMapPoi.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    {selectedMapPoi.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {selectedMapPoi.description}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                  <span className="font-semibold text-stone-900 block mb-0.5">Insider Field Tip:</span>
                  <p>{selectedMapPoi.localTip}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-stone-400">
                <Navigation className="w-8 h-8 mb-2" />
                <p className="text-xs">Click any marker pin on the map to preview detailed location tips.</p>
              </div>
            )}

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('map')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors text-center shadow-sm"
              >
                Explore All Coordinates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Local Guides Showcase */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                Field Intelligence
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
                In-Depth Destination Guides
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                Written by residents and regional stewards. Detailed daily itineraries, neighborhood walkability, and local etiquette rules.
              </p>
            </div>

            <button
              onClick={() => onNavigate('guides')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-800 hover:text-stone-950 transition-colors"
            >
              <span>View All Destination Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => onViewGuideDetails(guide)}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{guide.destination}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-800 font-semibold">
                  <span>Read Field Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Field Notes / Blog Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Field Notes Journal
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Stories from the Trail
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Reflections on culinary heritage, ethical tourism, and slow wandering.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-800 hover:text-stone-950 transition-colors"
          >
            <span>Visit the Journal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onViewPostDetails(post)}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>By {post.author.name}</span>
                <span className="font-semibold text-stone-900 group-hover:text-amber-800">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Verified Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Traveler Voices
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Field Reports & Verified Reviews
          </h2>
          <p className="text-sm text-stone-600">
            Real feedback from slow travelers who have explored with our native guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Verified Tour
                  </span>
                </div>

                <h4 className="text-sm font-bold text-stone-900 font-display">
                  "{review.title}"
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-900">{review.author.name}</div>
                  <div className="text-stone-500">{review.author.country} · {review.author.travelerType}</div>
                </div>
                <div className="text-stone-400 text-[11px]">{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
