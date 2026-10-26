import React, { useState } from 'react';
import { Menu, X, Compass, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  bookingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, bookingCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'guides', label: 'Local Guides' },
    { id: 'tours', label: 'Curated Tours' },
    { id: 'map', label: 'Interactive Map' },
    { id: 'blog', label: 'Field Notes' },
    { id: 'my-trips', label: 'My Bookings' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0 text-left hover:text-amber-800 transition-colors"
          >
            <Compass className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Wanderlore</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-stone-900 font-semibold'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {link.id === 'my-trips' && bookingCount > 0 && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 text-[11px] font-semibold bg-stone-200 text-stone-800 rounded">
                      {bookingCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('tours')}
              className="px-4.5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Book Curated Tour
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('my-trips')}
              className="p-2 text-stone-700 hover:text-stone-900"
              aria-label="View Bookings"
            >
              <CalendarCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-100/60 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
                {link.id === 'my-trips' && bookingCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-amber-200 text-amber-900 rounded">
                    {bookingCount} active
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('tours')}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
            >
              Book Curated Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
