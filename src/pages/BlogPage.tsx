import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft, 
  Quote, 
  Check, 
  Send, 
  User,
  Compass
} from 'lucide-react';
import { BlogPost, Tour } from '../types/travel';
import { AdPlacement } from '../components/AdPlacement';

interface BlogPageProps {
  posts: BlogPost[];
  tours: Tour[];
  selectedPostSlug?: string;
  onBookTour: (tour: Tour) => void;
  onViewTourDetails: (tour: Tour) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  tours,
  selectedPostSlug,
  onBookTour,
  onViewTourDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(() => {
    if (selectedPostSlug) {
      return posts.find((p) => p.slug === selectedPostSlug) || null;
    }
    return null;
  });

  // Comments state per post
  const [commentsState, setCommentsState] = useState<{ [postId: string]: BlogPost['comments'] }>({});
  const [newAuthor, setNewAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const categories = ['All', 'Local Lore & Culture', 'Culinary Journeys', 'Sustainable Travel'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddComment = (postId: string) => {
    if (!newAuthor.trim() || !newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: newAuthor.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: newCommentText.trim(),
    };

    const currentList = commentsState[postId] || posts.find((p) => p.id === postId)?.comments || [];
    setCommentsState({
      ...commentsState,
      [postId]: [...currentList, newComment],
    });

    setNewAuthor('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 2000);
  };

  // If viewing an article, render full reader view
  if (activePost) {
    const relatedTour = activePost.relatedTourId
      ? tours.find((t) => t.id === activePost.relatedTourId)
      : null;
    const postComments = commentsState[activePost.id] || activePost.comments;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
        {/* Back navigation */}
        <button
          onClick={() => setActivePost(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Field Notes Archive</span>
        </button>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
            <span className="font-semibold text-amber-800 uppercase tracking-wider">{activePost.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {activePost.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 font-display leading-tight text-balance">
            {activePost.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-stone-600 pt-1 pb-4 border-b border-stone-200">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs">
              {activePost.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-stone-900">{activePost.author.name}</div>
              <div className="text-stone-500">{activePost.author.role}</div>
            </div>
          </div>

          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={activePost.coverImage}
              alt={activePost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-stone max-w-none space-y-6 text-stone-800 text-sm sm:text-base leading-relaxed">
          {activePost.paragraphs.map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {para}
            </p>
          ))}

          {/* Pull Quote */}
          {activePost.quote && (
            <div className="my-8 p-6 bg-stone-100 rounded-2xl border-y border-stone-300 space-y-2">
              <Quote className="w-6 h-6 text-amber-800 opacity-60" />
              <p className="text-base sm:text-lg font-serif italic text-stone-900">
                "{activePost.quote.text}"
              </p>
              <div className="text-xs text-stone-500 font-sans not-italic">
                — {activePost.quote.source}
              </div>
            </div>
          )}

          {/* In-Article Editorial Placement */}
          <div className="my-6">
            <AdPlacement
              format="leaderboard"
              partnerName="Caminho Sol: Slow Travel Journals & Ink"
              category="Travel Writing & Stationery"
              destinationTag="Field Equipment"
              tagline="Acid-free fountain pen notebooks made from repurposed hemp and cotton rag, bound by hand in Porto."
              ctaText="View Field Journals"
            />
          </div>

          {/* Key Field Takeaways */}
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Field Recommendations & Etiquette
            </h4>
            <div className="space-y-2 text-xs text-stone-700">
              {activePost.keyTakeaways.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Related Tour Recommendation */}
        {relatedTour && (
          <div className="p-6 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Experience This Story in the Field
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                {relatedTour.title}
              </h3>
              <p className="text-xs text-stone-300 max-w-md">
                Small-group tour led by {relatedTour.guide.name}. Limited departures.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onViewTourDetails(relatedTour)}
                className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white"
              >
                Itinerary
              </button>
              <button
                onClick={() => onBookTour(relatedTour)}
                className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              >
                Book Tour (${relatedTour.price})
              </button>
            </div>
          </div>
        )}

        {/* Comments & Reader Tips Section */}
        <section className="space-y-6 pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-800" />
              <span>Reader Notes & Field Tips ({postComments.length})</span>
            </h3>
          </div>

          {/* Comment list */}
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">{comment.author}</span>
                  <span className="text-stone-400 text-[11px]">{comment.date}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Add a comment form */}
          <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Share Your Field Tip or Question
            </h4>

            {commentSubmitted ? (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Your comment has been posted to this story.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Elena R.)"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
                <textarea
                  rows={3}
                  placeholder="Have you visited this location? Share an observation, opening hour tip, or question..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
                <button
                  type="button"
                  onClick={() => handleAddComment(activePost.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Field Note</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Blog Directory
  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
          Editorial Journal
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
          Field Notes & Travel Reflections
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Deep essays on culinary heritage, dawn markets, indigenous craftsmanship, and the art of unhurried travel.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search articles by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Marquee Article */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <div
          onClick={() => setActivePost(featuredPost)}
          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer grid grid-cols-1 lg:grid-cols-2 group"
        >
          <div className="aspect-[16/10] lg:aspect-auto bg-stone-100 overflow-hidden">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-amber-800">{featuredPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.publishedDate}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display group-hover:text-amber-800 transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
              <span>Essay by <strong>{featuredPost.author.name}</strong></span>
              <span className="font-semibold text-amber-800 flex items-center gap-1">
                Read Field Note <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(selectedCategory === 'All' && !searchQuery ? remainingPosts : filteredPosts).map((post) => (
          <article
            key={post.id}
            onClick={() => setActivePost(post)}
            className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100">
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

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>By {post.author.name}</span>
              <span className="font-semibold text-stone-900 group-hover:text-amber-800 flex items-center gap-1">
                Read Story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}

        {/* Sponsored Field Placement Card */}
        <AdPlacement
          format="in-feed"
          partnerName="Slow Food International Travel Guide"
          category="Culinary Stewardship"
          destinationTag="Global Gastronomy"
          tagline="An international atlas connecting travelers with heirloom grain farmers, raw milk cheesemakers, and biodynamic winemakers."
          ctaText="Explore Food Atlas"
        />
      </div>
    </div>
  );
};
