import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  CheckCircle2, 
  X, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  MessageSquarePlus,
  Compass
} from 'lucide-react';
import { Tour, Review } from '../types/travel';
import { InteractiveMap } from '../components/InteractiveMap';
import { AdPlacement } from '../components/AdPlacement';

interface ToursPageProps {
  tours: Tour[];
  reviews: Review[];
  selectedTourId?: string | null;
  onBookTour: (tour: Tour) => void;
  onOpenReviewModal: (tour: Tour) => void;
  onCloseTourDetails?: () => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  tours,
  reviews,
  selectedTourId,
  onBookTour,
  onOpenReviewModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTour, setActiveTour] = useState<Tour | null>(() => {
    if (selectedTourId) {
      return tours.find((t) => t.id === selectedTourId) || null;
    }
    return null;
  });

  const destinations = ['All', 'Kyoto', 'Amalfi Coast', 'Lisbon', 'Oaxaca'];
  const categories = ['All', 'Historic Alleys', 'Coastal & Nature', 'Culinary & Wine', 'Artisans & Craft'];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      !searchQuery ||
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDest = selectedDestination === 'All' || tour.destination === selectedDestination;
    const matchesCat = selectedCategory === 'All' || tour.category === selectedCategory;
    return matchesSearch && matchesDest && matchesCat;
  });

  // If a tour is active, show the deep-dive Tour Details view
  if (activeTour) {
    const tourReviews = reviews.filter((r) => r.tourId === activeTour.id);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
        {/* Top Back Navigation */}
        <button
          onClick={() => setActiveTour(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Curated Tours</span>
        </button>

        {/* Hero Banner */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
            <span className="font-semibold text-amber-800 uppercase tracking-wider">{activeTour.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeTour.destination}, {activeTour.country}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{activeTour.rating}</span> ({activeTour.reviewCount} reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 font-display leading-tight text-balance">
            {activeTour.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
            {activeTour.tagline}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">Duration</span>
              <span className="font-semibold text-stone-900">{activeTour.duration}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Group Size</span>
              <span className="font-semibold text-stone-900">{activeTour.groupSize}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Pacing</span>
              <span className="font-semibold text-stone-900">{activeTour.difficulty} Walking</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Price / Guest</span>
              <span className="font-bold text-stone-900 text-sm font-display">${activeTour.price} USD</span>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={activeTour.coverImage}
              alt={activeTour.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Action Bar (Sticky or prominent) */}
        <div className="p-6 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
              Guaranteed Small-Group Departure
            </span>
            <div className="text-sm text-stone-300">
              Next available: <strong className="text-white">{activeTour.nextDates[0]}</strong>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-2xl font-bold font-display">${activeTour.price}</span>
              <span className="text-xs text-stone-400 block">per traveler</span>
            </div>
            <button
              onClick={() => onBookTour(activeTour)}
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
            >
              Reserve Tour Spots
            </button>
          </div>
        </div>

        {/* Detailed Itinerary */}
        <section className="space-y-6 pt-4 border-t border-stone-200">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Field Schedule
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Step-by-Step Itinerary
            </h2>
          </div>

          <div className="space-y-6">
            {activeTour.itinerary.map((stop, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200">
                <div className="flex flex-col items-center shrink-0">
                  <div className="px-2.5 py-1 bg-stone-900 text-white text-[11px] font-mono font-bold rounded-md">
                    {stop.time}
                  </div>
                  {idx < activeTour.itinerary.length - 1 && (
                    <div className="w-0.5 flex-1 bg-stone-200 my-2" />
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <h4 className="text-base font-bold text-stone-900 font-display">
                    {stop.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {stop.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-stone-500">
                    {stop.sights.map((sight, sIdx) => (
                      <span key={sIdx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                        {sight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusions & Exclusions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              What Is Included
            </h3>
            <div className="space-y-2 text-xs text-stone-700">
              {activeTour.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Not Included / Notes
            </h3>
            <div className="space-y-2 text-xs text-stone-600">
              {activeTour.exclusions.map((exc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-stone-400 font-bold shrink-0">·</span>
                  <span>{exc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guide Bio */}
        <section className="p-6 bg-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-800 text-white font-display text-xl font-bold flex items-center justify-center shrink-0 shadow-sm">
            {activeTour.guide.avatar}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="text-xs text-amber-800 font-semibold uppercase tracking-wider">
              Your Native Tour Leader
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              {activeTour.guide.name}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {activeTour.guide.bio}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] text-stone-500 pt-1">
              <span><strong>Languages:</strong> {activeTour.guide.languages.join(', ')}</span>
              <span>·</span>
              <span><strong>Tours Led:</strong> {activeTour.guide.toursLed}+ departures</span>
            </div>
          </div>
        </section>

        {/* Meeting Point with pinpoint */}
        <section className="space-y-4 pt-4 border-t border-stone-200">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Field Logistics
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Meeting Point & Departure Coordinate
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              <strong>{activeTour.meetingPoint}</strong> — {activeTour.meetingAddress}
            </p>
          </div>

          <div className="h-64 rounded-2xl overflow-hidden border border-stone-200">
            <InteractiveMap
              pois={[
                {
                  id: 'meeting-pt',
                  name: activeTour.meetingPoint,
                  category: 'Tour Meeting Point',
                  destination: activeTour.destination,
                  lat: activeTour.meetingCoords[0],
                  lng: activeTour.meetingCoords[1],
                  description: activeTour.meetingAddress,
                  localTip: 'Arrive 10 minutes prior to departure.',
                  image: activeTour.coverImage,
                },
              ]}
              center={activeTour.meetingCoords}
              zoom={15}
              height="256px"
            />
          </div>
        </section>

        {/* Travel Protection / Equipment Sponsor Banner */}
        <AdPlacement
          format="leaderboard"
          partnerName="World Nomads Ethical Traveler Cover"
          category="Curated Insurance Partner"
          destinationTag={`${activeTour.destination} & Field Wandering`}
          tagline="Comprehensive small-group travel coverage including sudden trip cancellations, mountain trail rescue, and camera gear protection."
          ctaText="Explore Travel Protection"
        />

        {/* Verified Reviews Section */}
        <section className="space-y-6 pt-4 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                Traveler Feedback
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Field Reviews for this Tour ({tourReviews.length})
              </h3>
            </div>

            <button
              onClick={() => onOpenReviewModal(activeTour)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-700" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="space-y-4">
            {tourReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="text-sm font-bold text-stone-900 font-display">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Sub ratings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                  <div>Knowledge: <strong className="text-stone-800">{rev.breakdown.knowledge}/5</strong></div>
                  <div>Pacing: <strong className="text-stone-800">{rev.breakdown.pacing}/5</strong></div>
                  <div>Sights: <strong className="text-stone-800">{rev.breakdown.sights}/5</strong></div>
                  <div>Value: <strong className="text-stone-800">{rev.breakdown.value}/5</strong></div>
                </div>

                <div className="text-xs text-stone-500 pt-1">
                  — <strong>{rev.author.name}</strong>, {rev.author.country} ({rev.author.travelerType})
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Directory Catalog View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
          Curated Touring Collective
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
          Curated Small-Group Tours
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Crafted for curious travelers who value depth over checklists. Capped at 8 to 10 guests with guaranteed departure dates and direct artisan compensation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by tour title, region, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-medium text-stone-500 self-center hidden md:inline">Region:</span>
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedDestination === dest
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Style Categories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
          <span className="text-xs font-medium text-stone-500 mr-2">Tour Style:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={tour.coverImage}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-stone-900/80 px-2.5 py-1 rounded">
                  {tour.destination} · {tour.country}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-100">
                  <div className="flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tour.rating}</span>
                    <span className="text-stone-300 font-normal">({tour.reviewCount})</span>
                  </div>
                  <div className="text-stone-200 font-medium">{tour.groupSize}</div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{tour.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {tour.duration}
                  </span>
                </div>

                <h3
                  onClick={() => setActiveTour(tour)}
                  className="text-base font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors cursor-pointer leading-snug line-clamp-2"
                >
                  {tour.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {tour.tagline}
                </p>

                <div className="pt-2 text-xs text-stone-500 space-y-1">
                  <div><strong>Guide:</strong> {tour.guide.name} ({tour.guide.role})</div>
                  <div><strong>Next departure:</strong> {tour.nextDates[0]}</div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-stone-400 block">Per person</span>
                <span className="text-lg font-bold text-stone-900 font-display tabular-nums">
                  ${tour.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTour(tour)}
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
        ))}

        {/* In-feed Sponsored Gear Placement Card */}
        <AdPlacement
          format="in-feed"
          partnerName="Maison Basque Canvas Field Rucksacks"
          category="Expedition Luggage"
          destinationTag="Handcrafted in Europe"
          tagline="Hand-waxed British Millerain cotton canvas packs with solid brass hardware, designed for rugged day treks and cobblestone alleys."
          ctaText="Explore Rucksacks"
        />
      </div>

      {/* Bottom Catalog Partner Banner */}
      <AdPlacement
        format="billboard"
        partnerName="Carbon Neutral Travel Collective"
        category="Sustainable Journeying"
        destinationTag="Offset & Reforestation"
        tagline="Offset 100% of your long-haul flight emissions directly through verified community mangrove and agroforestry sanctuaries."
        ctaText="Calculate Flight Footprint"
      />
    </div>
  );
};
