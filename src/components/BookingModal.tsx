import React, { useState } from 'react';
import { X, Calendar, Users, ShieldCheck, CheckCircle2, Tag, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Tour, Booking } from '../types/travel';

interface BookingModalProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
  onViewMyTrips: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tour,
  isOpen,
  onClose,
  onBookingConfirmed,
  onViewMyTrips,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Selection
  const [selectedDate, setSelectedDate] = useState(tour.nextDates[0] || '2026-11-04');
  const [timeSlot, setTimeSlot] = useState(tour.itinerary[0]?.time || '08:00 AM');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Step 2: Traveler details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');

  // Step 3: Payment simulation
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 4: Confirmed booking
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const basePricePerAdult = tour.price;
  const basePricePerChild = Math.round(tour.price * 0.65);
  const subtotal = adults * basePricePerAdult + children * basePricePerChild;
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const bookingFee = 0; // Transparent zero booking fees
  const total = subtotal - discountAmount + bookingFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'EXPLORE10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "EXPLORE10" for 10% off.');
    }
  };

  const handleCompleteBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newRef = `WL-${Math.floor(10000 + Math.random() * 90000)}`;
      const booking: Booking = {
        id: `book-${Date.now()}`,
        bookingRef: newRef,
        tourId: tour.id,
        tourTitle: tour.title,
        destination: tour.destination,
        date: selectedDate,
        timeSlot,
        guests: { adults, children },
        totalPrice: total,
        leadTraveler: {
          fullName: fullName.trim() || 'Lead Traveler',
          email: email.trim() || 'guest@wanderlore.com',
          phone: phone.trim() || '+1 555-0192',
          country: country.trim() || 'International',
          dietaryNotes: dietaryNotes.trim() || undefined,
        },
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        qrCodeId: `QR-${newRef}`,
      };

      setCreatedBooking(booking);
      onBookingConfirmed(booking);
      setIsProcessing(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>Curated Tour Reservation</span>
              <span>·</span>
              <span className="text-amber-800">Step {step} of 4</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display truncate max-w-md">
              {tour.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-200 h-1">
          <div
            className="bg-stone-900 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* STEP 1: Date, Time & Guests */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                1. Select Guaranteed Departure Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tour.nextDates.map((dateStr) => {
                  const dateObj = new Date(dateStr);
                  const formatted = dateObj.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{formatted}</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        Small group confirmed
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                2. Departure Time Slot
              </label>
              <div className="flex gap-2">
                {['07:30 AM', '09:00 AM', '02:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      timeSlot === slot
                        ? 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-stone-500" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                3. Number of Travelers (Max 8-10 per group)
              </label>
              <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-stone-900">Adults (Age 13+)</div>
                    <div className="text-xs text-stone-500">${tour.price} / person</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(adults - 1)}
                      className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center text-sm font-semibold disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums">{adults}</span>
                    <button
                      type="button"
                      disabled={adults + children >= 8}
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center text-sm font-semibold disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-stone-900">Children (Age 5–12)</div>
                    <div className="text-xs text-stone-500">${basePricePerChild} (35% off)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(children - 1)}
                      className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center text-sm font-semibold disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums">{children}</span>
                    <button
                      type="button"
                      disabled={adults + children >= 8}
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center text-sm font-semibold disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div>
                <span className="text-xs text-stone-500">Total for {adults + children} guests:</span>
                <div className="text-xl font-bold text-stone-900 font-display tabular-nums">
                  ${subtotal}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
              >
                <span>Continue to Traveler Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Traveler Details */}
        {step === 2 && (
          <div className="p-6 space-y-4">
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Lead Traveler Contact & Notes
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Martin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. clara@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Mobile Phone (with country code) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 415 555 2671"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Country of Residence
                </label>
                <input
                  type="text"
                  placeholder="e.g. United Kingdom"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Dietary Requirements, Allergies or Walking Needs
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Vegetarian, shellfish allergy, or need slower pace on steep stairways..."
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-2.5 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Your local guide {tour.guide.name} receives your contact details directly 24 hours prior to departure for seamless meeting coordination.
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!fullName.trim() || !email.trim() || !phone.trim()}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-40 rounded-lg transition-colors shadow-sm"
              >
                <span>Continue to Summary & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Review & Simulation Checkout */}
        {step === 3 && (
          <div className="p-6 space-y-5">
            {/* Booking Summary Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-900">{tour.destination} Curated Tour</span>
                <span className="text-stone-600">{selectedDate} at {timeSlot}</span>
              </div>
              <div className="space-y-1.5 text-stone-600">
                <div className="flex justify-between">
                  <span>{adults} × Adults (${tour.price})</span>
                  <span className="tabular-nums font-medium">${adults * basePricePerAdult}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between">
                    <span>{children} × Children (${basePricePerChild})</span>
                    <span className="tabular-nums font-medium">${children * basePricePerChild}</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Field Promo Discount (10%)</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Carbon-Neutral Steward Fee</span>
                  <span className="font-medium text-emerald-700">Included ($0)</span>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                <span>Total Amount Due</span>
                <span className="text-base font-display tabular-nums">${total} USD</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Have a field voucher code? (Try EXPLORE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 uppercase"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode.trim()}
                  className="px-4 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-lg disabled:opacity-40"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
              {promoApplied && <p className="text-[11px] text-emerald-700 mt-1">10% slow traveler discount applied.</p>}
            </div>

            {/* Payment simulation */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 uppercase tracking-wider">
                <span>Secure Checkout Simulation</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-0.5">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-0.5">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 leading-relaxed">
              <strong>Free Cancellation Guarantee:</strong> Cancel or reschedule up to 48 hours before the tour start time for a 100% full refund with zero penalty fees.
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
              >
                {isProcessing ? 'Confirming with Guide...' : `Confirm & Pay $${total}`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Instant Confirmation & Digital Voucher */}
        {step === 4 && createdBooking && (
          <div className="p-6 space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-stone-900 font-display">
                Your Tour is Confirmed!
              </h4>
              <p className="text-xs text-stone-500">
                A confirmation receipt and meeting instructions have been sent to <strong>{createdBooking.leadTraveler.email}</strong>
              </p>
            </div>

            {/* Digital Ticket Voucher Card */}
            <div className="max-w-md mx-auto bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                    Official Field Voucher
                  </span>
                  <div className="text-sm font-bold text-stone-900 font-display">
                    {tour.destination} · {createdBooking.tourTitle}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400">Ref No.</span>
                  <div className="text-xs font-mono font-bold text-stone-800">
                    {createdBooking.bookingRef}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 mb-3">
                <div>
                  <span className="text-stone-400 text-[10px] block">Date & Time</span>
                  <span className="font-semibold">{createdBooking.date} at {createdBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block">Travelers</span>
                  <span className="font-semibold">{createdBooking.guests.adults} Adults{createdBooking.guests.children > 0 ? `, ${createdBooking.guests.children} Children` : ''}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 text-[10px] block">Meeting Spot</span>
                  <span className="font-semibold text-stone-900">{tour.meetingPoint}</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">{tour.meetingAddress}</p>
                </div>
              </div>

              {/* QR Code Graphic Simulation */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200 bg-white -mx-5 -mb-5 px-5 py-3">
                <div className="text-[11px] text-stone-500">
                  <span>Show this digital voucher to guide <strong>{tour.guide.name}</strong> upon arrival.</span>
                </div>
                <div className="w-12 h-12 bg-stone-900 rounded p-1 shrink-0 flex items-center justify-center text-[9px] text-white font-mono text-center leading-tight">
                  [ QR ]
                  <br />
                  PASS
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewMyTrips();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
              >
                View in My Bookings
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg transition-colors"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
