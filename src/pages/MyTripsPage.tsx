import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Compass, 
  AlertCircle,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { Booking, Tour } from '../types/travel';
import { AdPlacement } from '../components/AdPlacement';

interface MyTripsPageProps {
  bookings: Booking[];
  tours: Tour[];
  onCancelBooking: (bookingId: string) => void;
  onOpenReviewModal: (tour: Tour) => void;
  onNavigateToTours: () => void;
}

export const MyTripsPage: React.FC<MyTripsPageProps> = ({
  bookings,
  tours,
  onCancelBooking,
  onOpenReviewModal,
  onNavigateToTours,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'all'>('upcoming');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const displayedBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') {
      return b.status === 'confirmed';
    }
    return true;
  });

  // Helper to generate and download an .ics calendar file
  const handleDownloadCalendar = (booking: Booking, tour?: Tour) => {
    const title = `Curated Tour: ${booking.tourTitle}`;
    const location = tour ? `${tour.meetingPoint}, ${tour.meetingAddress}` : booking.destination;
    const description = `Wanderlore Curated Tour Reservation\\nReference: ${booking.bookingRef}\\nGuests: ${booking.guests.adults} Adults\\nTime: ${booking.timeSlot}`;
    
    // Parse date
    const dateClean = booking.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wanderlore//Curated Tours//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingRef}@wanderlore.com`,
      `DTSTAMP:${dateClean}T080000Z`,
      `DTSTART;VALUE=DATE:${dateClean}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${booking.bookingRef}-tour-calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice(booking.bookingRef);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Traveler Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            My Bookings & Digital Passes
          </h1>
          <p className="text-sm text-stone-600">
            Access digital tour vouchers, download calendar invites, manage departure times, or leave field reviews.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-white text-stone-900 font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Confirmed Upcoming
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-stone-900 font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Calendar file downloaded for booking <strong>{downloadNotice}</strong>. You can open it in Apple Calendar or Google Calendar.</span>
        </div>
      )}

      {displayedBookings.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-900 font-display">
              No Bookings Found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You do not have any {activeTab === 'upcoming' ? 'upcoming' : ''} reservations. Explore our handcrafted departures across Kyoto, Amalfi, Lisbon, and Oaxaca.
            </p>
          </div>
          <button
            onClick={onNavigateToTours}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
          >
            <span>Browse Curated Tours</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedBookings.map((booking) => {
            const tour = tours.find((t) => t.id === booking.tourId);
            const isConfirmed = booking.status === 'confirmed';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
              >
                {/* Header row */}
                <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/60">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-stone-900 bg-white border border-stone-300 px-2.5 py-1 rounded-md shadow-xs">
                      {booking.bookingRef}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700 line-through'
                      }`}
                    >
                      {isConfirmed ? 'Confirmed & Guaranteed' : 'Cancelled'}
                    </span>
                  </div>

                  <div className="text-xs text-stone-500">
                    Booked on {new Date(booking.bookedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {/* Main Content Info */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  
                  {/* Left: Tour info */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                        {booking.destination} Experience
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 font-display mt-0.5">
                        {booking.tourTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Date & Time</span>
                        <span className="font-semibold">{booking.date}</span>
                        <div className="text-stone-500">{booking.timeSlot}</div>
                      </div>

                      <div>
                        <span className="text-stone-400 block text-[11px]">Travelers</span>
                        <span className="font-semibold">{booking.guests.adults} Adults</span>
                        {booking.guests.children > 0 && (
                          <div className="text-stone-500">{booking.guests.children} Children</div>
                        )}
                      </div>

                      <div>
                        <span className="text-stone-400 block text-[11px]">Total Paid</span>
                        <span className="font-bold text-stone-900 tabular-nums font-display text-sm">
                          ${booking.totalPrice} USD
                        </span>
                        <div className="text-emerald-700 text-[11px]">Zero Fees</div>
                      </div>
                    </div>

                    {tour && (
                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                        <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-800" />
                          <span>Meeting Point: {tour.meetingPoint}</span>
                        </div>
                        <p className="text-stone-500 text-[11px] pl-5">{tour.meetingAddress}</p>
                      </div>
                    )}

                    {booking.leadTraveler.dietaryNotes && (
                      <div className="text-xs text-stone-500">
                        <strong>Special notes:</strong> {booking.leadTraveler.dietaryNotes}
                      </div>
                    )}
                  </div>

                  {/* Right: Digital Voucher Pass & Actions */}
                  <div className="p-4 bg-stone-900 text-white rounded-xl space-y-4 shadow-inner text-center">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pb-2 border-b border-stone-800">
                      <span>DIGITAL PASS</span>
                      <span className="font-mono">{booking.qrCodeId}</span>
                    </div>

                    {/* QR Code Graphic Simulation */}
                    <div className="w-24 h-24 bg-white rounded-lg mx-auto p-2 flex flex-col items-center justify-center text-stone-950 font-mono text-[10px] space-y-1">
                      <QrCode className="w-16 h-16 text-stone-900" />
                    </div>

                    <p className="text-[11px] text-stone-400 leading-tight">
                      Present on phone screen to guide {tour?.guide.name || 'upon arrival'}.
                    </p>

                    <div className="pt-2 border-t border-stone-800 space-y-2">
                      {isConfirmed && (
                        <button
                          onClick={() => handleDownloadCalendar(booking, tour)}
                          className="w-full py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Add to Calendar (.ics)</span>
                        </button>
                      )}

                      {tour && (
                        <button
                          onClick={() => onOpenReviewModal(tour)}
                          className="w-full py-2 text-xs font-medium text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          <span>Write Field Review</span>
                        </button>
                      )}

                      {isConfirmed && (
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="w-full py-1 text-[11px] text-stone-400 hover:text-red-400 transition-colors"
                        >
                          Cancel Booking (Free 48h Refund)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Traveler Logistics & Courier Partner Banner */}
      <AdPlacement
        format="leaderboard"
        partnerName="Yamato Hands-Free Hotel-to-Hotel Luggage Courier"
        category="Travel Logistics"
        destinationTag="Same-Day Delivery"
        tagline="Travel unencumbered between cities. Ship your heavy bags directly from hotel to ryokan or airport with real-time GPS tracking."
        ctaText="Book Luggage Forwarding"
      />
    </div>
  );
};
