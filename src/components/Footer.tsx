import React, { useState } from 'react';
import { Compass, Mail, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-stone-800">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-bold text-stone-100 font-display">
              <Compass className="w-5 h-5 text-amber-500" />
              <span>Wanderlore</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              A travel publication and small-group touring collective dedicated to slow discovery. We partner exclusively with native historians, artisans, and agronomists to preserve local cultural heritage and reveal the quiet corners of the world.
            </p>
            <div className="text-xs text-stone-500 pt-2">
              Carbon Neutral Guided Journeys · Maximum 8–10 Travelers · 100% Native Stewardship
            </div>
          </div>

          {/* Curated Portals */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-4">
              Explore Wanderlore
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Local Insider Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Curated Small-Group Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Interactive Map Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Field Notes Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-trips')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Booking & Vouchers
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Field Dispatch */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-4">
              The Field Dispatch
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Bi-weekly essays, secret opening hours, and newly released small-group tour dates.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-800/80 rounded-lg border border-amber-900/40 flex items-center gap-2 text-xs text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You are subscribed to the Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-800/90 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-medium bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded-lg transition-colors"
                >
                  Join Field Notes
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Wanderlore Collective. Handcrafted for slow travelers worldwide.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Ethical Tourism Charter</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Guide Honorarium Guarantee</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
