"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Tag, 
  TrendingUp, 
  CheckCircle2,
  Mail
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blogs-data";
import Particles from "@/components/Particles";
import ShinyText from "@/components/ShinyText";
import ConsultationModal from "@/components/ConsultationModal";
import { toast } from "sonner";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const categories = ["All", "Web Architecture", "AI & Automation", "Cloud & DevOps", "UI/UX & Mobile"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Subscribed successfully! You'll receive our monthly tech insights.");
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-[#050408] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050408]/80 backdrop-blur-xl border-b border-purple-500/10">
        <nav className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] shrink-0">
              <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-tight">Devoxa Technologies</span>
              <span className="text-[10px] font-mono font-semibold tracking-wider text-purple-300 uppercase">Engineering Insights</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
              <span>Return to Home</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex border border-purple-400/40 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-xs font-mono uppercase tracking-widest text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Book a call —</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="relative pt-32 md:pt-40 pb-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#0e0a1f] via-[#080514] to-[#050408]">
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <Particles particleCount={100} particleColors={['#ffffff', '#8b5cf6', '#c084fc']} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_15px_rgba(167,139,250,0.25)] mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>DEV & TECH BLOG</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            <ShinyText text="Engineering Insights & Tech Innovations" color="#ffffff" shineColor="#8b5cf6" speed={3} />
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Deep dives into modern web architecture, enterprise AI automation, cloud security, and UI/UX design crafted by Devoxa Technologies engineers.
          </p>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-2xl bg-[#0c0817]/90 border border-purple-500/30 rounded-3xl p-2 sm:p-3 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex items-center gap-3 px-4 py-2.5 w-full bg-white/5 rounded-2xl border border-white/10 flex-1">
              <Search className="w-4 h-4 text-purple-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or tag..."
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-gray-500 w-full"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)] scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10 space-y-16">
        
        {/* Featured Article Card (Shown when filter is 'All' and no search query) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <section className="w-full">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>FEATURED ARTICLE</span>
            </div>
            
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-[#0c0817]/90 border border-purple-500/25 overflow-hidden backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-full min-h-[320px] overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0817] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c0817]" />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 group-hover:text-purple-300 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-300 text-sm leading-relaxed font-light mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-9 h-9 rounded-full object-cover border border-purple-400/40" />
                      <div>
                        <span className="text-xs font-bold text-white block">{featuredPost.author.name}</span>
                        <span className="text-[10px] text-gray-400 block">{featuredPost.author.role}</span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Blog Grid Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Latest Articles ({filteredPosts.length})</span>
          </h3>
          {selectedCategory !== "All" && (
            <span className="text-xs text-purple-300 font-mono">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 overflow-hidden backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight mb-2.5 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-purple-300/80 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2.5 pt-4">
                    <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-purple-400/30" />
                    <span className="text-xs font-medium text-gray-300">{post.author.name}</span>
                  </div>

                  <span className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-1 pt-4">
                    Read <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0c0817]/60 border border-purple-500/20 rounded-3xl p-8">
            <BookOpen className="w-12 h-12 text-purple-400/50 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">No Articles Found</h4>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              No results matched "{searchQuery}". Try searching for another topic or reset your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="px-5 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter / Devoxa Insights Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-[#0c0817] border border-purple-500/30 p-8 sm:p-12 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/50 border border-purple-400/30 text-purple-300 font-mono text-[10px] uppercase tracking-widest font-bold mb-4">
              <Mail className="w-3.5 h-3.5 text-purple-300" />
              <span>DEVOXA NEWSLETTER</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Stay Ahead of Tech Trends
            </h3>

            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Get our latest engineering breakdowns, cloud architecture benchmarks, and software design guides delivered straight to your inbox monthly.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your work email address"
                className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder:text-gray-400 focus:border-purple-400 outline-none flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
