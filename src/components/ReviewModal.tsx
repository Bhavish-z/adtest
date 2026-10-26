import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { Tour, Review } from '../types/travel';

interface ReviewModalProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  tour,
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [knowledge, setKnowledge] = useState(5);
  const [pacing, setPacing] = useState(5);
  const [sights, setSights] = useState(5);
  const [value, setValue] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [travelerType, setTravelerType] = useState<'Solo' | 'Couple' | 'Family' | 'Small Group'>('Couple');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim() || !name.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      tourId: tour.id,
      author: {
        name: name.trim(),
        country: country.trim() || 'Verified Traveler',
        travelerType,
      },
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      breakdown: {
        knowledge,
        pacing,
        sights,
        value,
      },
      helpfulCount: 0,
      verified: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Review Your Experience
            </h3>
            <p className="text-xs text-stone-500 truncate max-w-xs">
              {tour.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-stone-900 font-display">
              Review Published!
            </h4>
            <p className="text-xs text-stone-500">
              Thank you for sharing your genuine field perspective with fellow slow travelers.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Overall Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Overall Experience Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating ?? rating)
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-stone-800">
                  {hoverRating ?? rating} out of 5
                </span>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Guide Knowledge</label>
                <select
                  value={knowledge}
                  onChange={(e) => setKnowledge(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-md px-2 py-1 text-xs text-stone-800"
                >
                  <option value={5}>5 - Master Storyteller</option>
                  <option value={4}>4 - Very Knowledgeable</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Needs Improvement</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Pacing & Comfort</label>
                <select
                  value={pacing}
                  onChange={(e) => setPacing(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-md px-2 py-1 text-xs text-stone-800"
                >
                  <option value={5}>5 - Perfectly Unrushed</option>
                  <option value={4}>4 - Well Balanced</option>
                  <option value={3}>3 - Standard</option>
                  <option value={2}>2 - Rushed in parts</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Sights & Exclusivity</label>
                <select
                  value={sights}
                  onChange={(e) => setSights(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-md px-2 py-1 text-xs text-stone-800"
                >
                  <option value={5}>5 - True Hidden Gems</option>
                  <option value={4}>4 - Great Selection</option>
                  <option value={3}>3 - Standard Itinerary</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Value for Money</label>
                <select
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-md px-2 py-1 text-xs text-stone-800"
                >
                  <option value={5}>5 - Exceeded Value</option>
                  <option value={4}>4 - Fair & Worth It</option>
                  <option value={3}>3 - Average</option>
                </select>
              </div>
            </div>

            {/* Traveler Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Traveler Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Solo', 'Couple', 'Family', 'Small Group'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTravelerType(type)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      travelerType === type
                        ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title & Comment */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Headline / Key Takeaway
              </label>
              <input
                type="text"
                required
                placeholder="e.g. An intimate morning that felt like a private walk with a friend"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Detailed Review
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share specific details about the guide, food, quiet moments, or advice for future travelers..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Author info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Martin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Country / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lyon, France"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
              >
                Submit Verified Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
