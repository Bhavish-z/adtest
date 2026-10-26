import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Filter, 
  Search, 
  Plus, 
  Trash2, 
  Route, 
  ExternalLink,
  BookOpen, 
  Compass, 
  Check
} from 'lucide-react';
import { MapPOI, Tour, LocalGuide } from '../types/travel';
import { InteractiveMap } from '../components/InteractiveMap';
import { AdPlacement } from '../components/AdPlacement';

interface MapPageProps {
  pois: MapPOI[];
  tours: Tour[];
  guides: LocalGuide[];
  onBookTour: (tour: Tour) => void;
  onViewGuide: (guide: LocalGuide) => void;
}

const DESTINATION_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  All: { center: [35.0116, 135.7681], zoom: 3 },
  Kyoto: { center: [35.0116, 135.7681], zoom: 13 },
  'Amalfi Coast': { center: [40.6340, 14.6027], zoom: 12 },
  Lisbon: { center: [38.7115, -9.1355], zoom: 14 },
  Oaxaca: { center: [17.0654, -96.7236], zoom: 12 },
};

export const MapPage: React.FC<MapPageProps> = ({
  pois,
  tours,
  guides,
  onBookTour,
  onViewGuide,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('Kyoto');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(pois[0]?.id || null);
  const [dayRoutePoiIds, setDayRoutePoiIds] = useState<string[]>([]);
  const [routeExportSuccess, setRouteExportSuccess] = useState(false);

  const destinations = ['All', 'Kyoto', 'Amalfi Coast', 'Lisbon', 'Oaxaca'];
  const categories = ['All', 'Heritage', 'Culinary', 'Nature', 'Viewpoint', 'Artisan'];

  const filteredPois = pois.filter((p) => {
    const matchesDest = selectedDestination === 'All' || p.destination === selectedDestination;
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDest && matchesCat && matchesSearch;
  });

  const activePoi = pois.find((p) => p.id === selectedPoiId) || filteredPois[0] || null;
  const relatedTour = activePoi?.relatedTourId
    ? tours.find((t) => t.id === activePoi.relatedTourId)
    : null;
  const relatedGuide = activePoi
    ? guides.find((g) => g.destination === activePoi.destination)
    : null;

  const currentCenter = DESTINATION_CENTERS[selectedDestination]?.center || [35.0116, 135.7681];
  const currentZoom = DESTINATION_CENTERS[selectedDestination]?.zoom || 13;

  const handleToggleRoutePoi = (id: string) => {
    if (dayRoutePoiIds.includes(id)) {
      setDayRoutePoiIds(dayRoutePoiIds.filter((item) => item !== id));
    } else {
      setDayRoutePoiIds([...dayRoutePoiIds, id]);
    }
  };

  const handleExportRoute = () => {
    setRouteExportSuccess(true);
    setTimeout(() => setRouteExportSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Cartographic Discovery
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Interactive Local Map Explorer
          </h1>
          <p className="text-sm text-stone-600">
            Explore authentic sanctuaries, cliffside trails, and artisan workshops across our featured regions. Select stops to build your personalized walking route.
          </p>
        </div>

        {/* Route Builder summary pill / counter */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-600 bg-white border border-stone-200 px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <Route className="w-4 h-4 text-amber-700" />
            <span>
              Day Route: <strong>{dayRoutePoiIds.length}</strong> {dayRoutePoiIds.length === 1 ? 'Stop' : 'Stops'} selected
            </span>
          </div>
          {dayRoutePoiIds.length > 0 && (
            <button
              onClick={() => setDayRoutePoiIds([])}
              className="text-xs text-stone-400 hover:text-red-600 transition-colors"
              title="Clear Route"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Controls Bar: Destinations & Categories */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Destination Selector */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-medium text-stone-500 whitespace-nowrap">Focus:</span>
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setSelectedDestination(dest);
                  const firstInDest = pois.find((p) => dest === 'All' || p.destination === dest);
                  if (firstInDest) setSelectedPoiId(firstInDest.id);
                }}
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

          {/* Search box */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search points on map..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Categories row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
          <span className="text-xs font-medium text-stone-500 mr-2">Layer:</span>
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

      {/* Main Map & Interactive Sidebar Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Map View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
            <InteractiveMap
              pois={filteredPois}
              selectedPoiId={selectedPoiId}
              onSelectPoi={(poi) => setSelectedPoiId(poi.id)}
              center={currentCenter}
              zoom={currentZoom}
              height="600px"
              routePoiIds={dayRoutePoiIds}
            />
          </div>

          {/* Route Planner Bar (if 2+ pins selected) */}
          {dayRoutePoiIds.length >= 2 && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Route className="w-5 h-5 text-amber-800 shrink-0" />
                <div>
                  <span className="font-semibold text-stone-900">Custom Day Route Active</span>
                  <p className="text-stone-600">
                    Calculated route line drawn across {dayRoutePoiIds.length} stops (~2.4 to 4.2 km estimated stroll).
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportRoute}
                className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
              >
                {routeExportSuccess ? 'Route Itinerary Saved!' : 'Save Route Itinerary'}
              </button>
            </div>
          )}
        </div>

        {/* POI Details & List Panel */}
        <div className="space-y-6">
          
          {/* Active POI Card */}
          {activePoi ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-800 uppercase tracking-wider">
                  {activePoi.category}
                </span>
                <span className="text-stone-500 font-medium">{activePoi.destination}</span>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={activePoi.image}
                  alt={activePoi.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  {activePoi.name}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {activePoi.description}
                </p>
              </div>

              {/* Local tip callout */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block mb-0.5">Insider Field Note:</span>
                <p>{activePoi.localTip}</p>
              </div>

              {/* Action: Add to Day Route */}
              <button
                onClick={() => handleToggleRoutePoi(activePoi.id)}
                className={`w-full py-2.5 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                  dayRoutePoiIds.includes(activePoi.id)
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                }`}
              >
                {dayRoutePoiIds.includes(activePoi.id) ? (
                  <>
                    <Check className="w-4 h-4 text-amber-800" />
                    <span>In Your Day Route ({dayRoutePoiIds.indexOf(activePoi.id) + 1})</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Walking Day Route</span>
                  </>
                )}
              </button>

              {/* Related Tour Link */}
              {relatedTour && (
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] text-stone-400 uppercase font-semibold">
                    Visited on Curated Tour:
                  </span>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs flex items-center justify-between gap-2">
                    <span className="font-semibold text-stone-800 line-clamp-1">{relatedTour.title}</span>
                    <button
                      onClick={() => onBookTour(relatedTour)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded shrink-0 whitespace-nowrap"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              )}

              {/* Related Guide Link */}
              {relatedGuide && (
                <div className="pt-2">
                  <button
                    onClick={() => onViewGuide(relatedGuide)}
                    className="text-xs text-amber-800 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read {relatedGuide.destination} Insider Guide</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-white rounded-2xl border border-stone-200 text-center text-xs text-stone-500">
              No point selected. Click a map marker or choose below.
            </div>
          )}

          {/* Location Quick List */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2 shadow-sm">
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Locations in View ({filteredPois.length})
            </h4>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {filteredPois.map((p) => {
                const isSelected = p.id === activePoi?.id;
                const inRoute = dayRoutePoiIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPoiId(p.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-2 transition-colors ${
                      isSelected
                        ? 'border-stone-900 bg-stone-100/80 font-semibold text-stone-900'
                        : 'border-stone-100 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="truncate">
                      <div className="truncate">{p.name}</div>
                      <span className="text-[10px] text-stone-400">{p.category} · {p.destination}</span>
                    </div>
                    {inRoute && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        Stop #{dayRoutePoiIds.indexOf(p.id) + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Sponsored Partner Placement */}
          <AdPlacement
            format="medium-rectangle"
            partnerName="TopoTrail Offline Regional Maps"
            category="Cartography & GPS"
            destinationTag={`${selectedDestination} & Off-Grid Trails`}
            tagline="Download vector topographic maps with zero cellular roaming required. Preloaded with historic stone paths and water fountain points."
            ctaText="Get Offline Maps"
          />
        </div>
      </div>
    </div>
  );
};
