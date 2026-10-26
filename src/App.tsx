import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GuidesPage } from './pages/GuidesPage';
import { ToursPage } from './pages/ToursPage';
import { MapPage } from './pages/MapPage';
import { BlogPage } from './pages/BlogPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { BookingModal } from './components/BookingModal';
import { ReviewModal } from './components/ReviewModal';
import { AdProvider } from './context/AdContext';
import { SocialBarTop } from './components/ads/SocialBarTop';
import { PopunderTop } from './components/ads/PopunderTop';
import { AdPerformanceLab } from './components/ads/AdPerformanceLab';
import { 
  INITIAL_TOURS, 
  INITIAL_GUIDES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_REVIEWS, 
  INITIAL_MAP_POIS, 
  INITIAL_BOOKINGS 
} from './data/travelData';
import { Tour, LocalGuide, BlogPost, Review, Booking } from './types/travel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<Record<string, string>>({});

  // Central State with LocalStorage Persistence
  const [tours, setTours] = useState<Tour[]>(INITIAL_TOURS);
  const [guides] = useState<LocalGuide[]>(INITIAL_GUIDES);
  const [posts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('wanderlore_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('wanderlore_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Modals state
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [reviewTour, setReviewTour] = useState<Tour | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlore_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookings]);

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlore_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reviews]);

  const handleNavigate = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleSubmitReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    // Recalculate tour average rating & count
    setTours((prevTours) =>
      prevTours.map((t) => {
        if (t.id === newReview.tourId) {
          const newCount = t.reviewCount + 1;
          const newAvg = Number(
            (((t.rating * t.reviewCount) + newReview.rating) / newCount).toFixed(2)
          );
          return {
            ...t,
            reviewCount: newCount,
            rating: newAvg,
          };
        }
        return t;
      })
    );
  };

  const activeConfirmedBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <AdProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900">
        {/* Social BarTOP Unit */}
        <SocialBarTop />

        {/* PopunderTOP Simulated Window */}
        <PopunderTop />

        {/* Strict Top Bar Contract Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          bookingCount={activeConfirmedBookingsCount}
        />

      {/* Main Pages Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            tours={tours}
            guides={guides}
            posts={posts}
            reviews={reviews}
            pois={INITIAL_MAP_POIS}
            onNavigate={handleNavigate}
            onBookTour={(tour) => setBookingTour(tour)}
            onViewTourDetails={(tour) => handleNavigate('tours', { tourId: tour.id })}
            onViewGuideDetails={(guide) => handleNavigate('guides', { guideSlug: guide.slug })}
            onViewPostDetails={(post) => handleNavigate('blog', { postSlug: post.slug })}
          />
        )}

        {currentPage === 'guides' && (
          <GuidesPage
            guides={guides}
            tours={tours}
            pois={INITIAL_MAP_POIS}
            selectedGuideSlug={navParams.guideSlug}
            onBookTour={(tour) => setBookingTour(tour)}
            onViewTourDetails={(tour) => handleNavigate('tours', { tourId: tour.id })}
          />
        )}

        {currentPage === 'tours' && (
          <ToursPage
            tours={tours}
            reviews={reviews}
            selectedTourId={navParams.tourId}
            onBookTour={(tour) => setBookingTour(tour)}
            onOpenReviewModal={(tour) => setReviewTour(tour)}
          />
        )}

        {currentPage === 'map' && (
          <MapPage
            pois={INITIAL_MAP_POIS}
            tours={tours}
            guides={guides}
            onBookTour={(tour) => setBookingTour(tour)}
            onViewGuide={(guide) => handleNavigate('guides', { guideSlug: guide.slug })}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            posts={posts}
            tours={tours}
            selectedPostSlug={navParams.postSlug}
            onBookTour={(tour) => setBookingTour(tour)}
            onViewTourDetails={(tour) => handleNavigate('tours', { tourId: tour.id })}
          />
        )}

        {currentPage === 'my-trips' && (
          <MyTripsPage
            bookings={bookings}
            tours={tours}
            onCancelBooking={handleCancelBooking}
            onOpenReviewModal={(tour) => setReviewTour(tour)}
            onNavigateToTours={() => handleNavigate('tours')}
          />
        )}
      </main>

      {/* Booking Checkout Modal */}
      {bookingTour && (
        <BookingModal
          tour={bookingTour}
          isOpen={!!bookingTour}
          onClose={() => setBookingTour(null)}
          onBookingConfirmed={handleBookingConfirmed}
          onViewMyTrips={() => handleNavigate('my-trips')}
        />
      )}

      {/* Review Submission Modal */}
      {reviewTour && (
        <ReviewModal
          tour={reviewTour}
          isOpen={!!reviewTour}
          onClose={() => setReviewTour(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* Quiet Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Ad Performance Lab Inspector */}
      <AdPerformanceLab />
    </div>
  </AdProvider>
);
}
