"use client";

import { useState } from "react";
import Image from "next/image"
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
  Terminal,
  Compass,
  Cpu,
  Layers,
  ChevronRight,
  Zap,
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

  const categories = [
    { name: "All", count: BLOG_POSTS.length },
    { name: "Web Architecture", count: BLOG_POSTS.filter(p => p.category === "Web Architecture").length },
    { name: "AI & Automation", count: BLOG_POSTS.filter(p => p.category === "AI & Automation").length },
    { name: "Cloud & DevOps", count: BLOG_POSTS.filter(p => p.category === "Cloud & DevOps").length },
    { name: "UI/UX & Mobile", count: BLOG_POSTS.filter(p => p.category === "UI/UX & Mobile").length },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost.id || selectedCategory !== "All" || searchQuery !== "");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Welcome aboard! You are now subscribed to Devoxa Engineering Insights.");
    setNewsletterEmail("");
  };

  const trendingTopics = [
    "NEXT.JS 16", "AI AGENTS", "KUBERNETES", "RAG ARCHITECTURE", "ZERO-TRUST", "SPATIAL UI", "TURBOPACK", "BLENDER 3D"
  ];

  return (
    <div className="min-h-screen bg-[#050408] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050408]/85 backdrop-blur-2xl border-b border-purple-500/15">
        <nav className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] shrink-0">
              <div className="w-full h-full bg-[#0B0819] rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-tight">Devoxa Technologies</span>
              <span className="text-[10px] font-mono font-semibold tracking-widest text-purple-300 uppercase">Tech Publication & Journal</span>
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

      {/* Cyber Hero Header */}
      <section className="relative pt-32 md:pt-40 pb-12 px-6 md:px-12 bg-gradient-to-b from-[#0f0926] via-[#080514] to-[#050408] overflow-hidden border-b border-purple-500/10">
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <Particles particleCount={120} particleColors={['#ffffff', '#8b5cf6', '#c084fc']} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient from-purple-600/25 via-indigo-600/15 to-transparent rounded-full blur-[150px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(167,139,250,0.3)] mb-5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>SYS // DEVOXA_INSIGHTS_V2.6</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-4">
                <ShinyText text="ARCHITECTING THE DIGITAL FRONTIER." color="#ffffff" shineColor="#a78bfa" speed={3} />
              </h1>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
                An engineering publication exploring high-scale cloud systems, artificial intelligence agents, spatial UIs, and full-stack performance optimization.
              </p>
            </div>

            {/* Live Stats Pill Box */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0c0817]/90 border border-purple-500/30 backdrop-blur-xl shadow-xl shrink-0 w-full md:w-auto">
              <div className="pr-4 border-r border-white/10">
                <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">PUBLISHED POSTS</span>
                <span className="text-2xl font-extrabold text-white">{BLOG_POSTS.length} Articles</span>
              </div>
              <div className="pl-2">
                <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">SYSTEM STATUS</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>

          {/* Search Command Input Bar */}
          <div className="w-full bg-[#0c0817]/90 border border-purple-500/30 rounded-2xl p-2.5 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-3 w-full bg-white/5 rounded-xl border border-white/10 flex-1">
              <Search className="w-4 h-4 text-purple-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type keywords (e.g., Next.js, AI, Kubernetes, RAG)..."
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-gray-500 w-full font-mono"
              />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Trending Wire Marquee Ticker */}
      <div className="w-full bg-[#0c0817] border-y border-purple-500/15 py-3 overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs font-mono text-purple-300/80 uppercase tracking-widest">
          {trendingTopics.concat(trendingTopics).map((topic, index) => (
            <span key={index} className="flex items-center gap-3">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>{topic}</span>
              <span className="text-gray-600">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Asymmetric Split Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Left Sidebar Navigation */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            
            {/* Category Matrix Filter Card */}
            <div className="bg-[#0c0817]/90 border border-purple-500/25 rounded-3xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <h3 className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>CATEGORIES MATRIX</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </h3>

              <div className="space-y-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400/40"
                          : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent"
                      }`}
                    >
                      <span className="font-mono">{cat.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-gray-400"}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trending Tags Cloud */}
            <div className="bg-[#0c0817]/90 border border-purple-500/25 rounded-3xl p-6 backdrop-blur-xl">
              <h3 className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>EXPLORE TAGS</span>
                <Tag className="w-4 h-4 text-purple-400" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "AI", "LLM", "Architecture", "DevOps", "AWS", "UI/UX", "Glassmorphism", "Performance"].map(t => (
                  <button
                    key={t}
                    onClick={() => setSearchQuery(t)}
                    className="text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl hover:bg-purple-600 hover:text-white transition-all"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Main Magazine Stream */}
          <section className="lg:col-span-8 space-y-10">
            
            {/* Featured Article Card */}
            {selectedCategory === "All" && !searchQuery && featuredPost && (
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> 01 // FEATURED INSIGHT
                </span>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block rounded-3xl bg-[#0c0817]/90 border border-purple-500/30 overflow-hidden backdrop-blur-2xl hover:border-purple-500/60 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                >
                  <div className="relative h-[260px] sm:h-[340px] w-full overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0817] via-[#0c0817]/40 to-transparent" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                      {featuredPost.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 -mt-12 relative z-10">
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mb-3">
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

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 group-hover:text-purple-300 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} width={64} height={64} className="w-8 h-8 rounded-full object-cover border border-purple-400/40" />
                        <div>
                          <span className="text-xs font-bold text-white block">{featuredPost.author.name}</span>
                          <span className="text-[10px] text-purple-300 block">{featuredPost.author.role}</span>
                        </div>
                      </div>

                      <span className="px-4 py-2 rounded-full bg-purple-600/30 border border-purple-400/40 text-xs font-mono font-bold text-white group-hover:bg-purple-600 transition-all flex items-center gap-1.5">
                        Read Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2 font-mono uppercase">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>ARTICLE STREAM ({gridPosts.length})</span>
                </h3>
              </div>

              {gridPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gridPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 overflow-hidden backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 p-5 flex flex-col justify-between hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                      <div>
                        <div className="relative h-44 w-full overflow-hidden rounded-2xl mb-4">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                            {post.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono mb-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h4 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>

                        <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} className="w-6 h-6 rounded-full object-cover border border-purple-400/30" />
                          <span className="text-xs text-gray-300 font-medium">{post.author.name}</span>
                        </div>
                        <span className="text-xs font-mono text-purple-400 group-hover:text-purple-300 flex items-center gap-1 font-bold">
                          Read <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#0c0817]/60 border border-purple-500/20 rounded-3xl p-6">
                  <Compass className="w-10 h-10 text-purple-400/50 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1">No Matching Articles</h4>
                  <p className="text-gray-400 text-xs max-w-sm mx-auto mb-4">
                    No articles found matching "{searchQuery}". Try selecting another category or clear search filters.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="px-4 py-2 rounded-full bg-purple-600 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Sci-Fi Terminal Subscription Command Box */}
            <div className="rounded-3xl bg-[#090615] border border-purple-500/30 p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-purple-400 border-b border-white/10 pb-3">
                <Terminal className="w-4 h-4" />
                <span>TERMINAL // DEVOXA_DISPATCH_SUBSCRIBE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                Subscribe to Devoxa Dispatch
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Receive monthly architectural blueprints, AI research breakdowns, and high-scale full-stack engineering notes directly in your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl flex-1 font-mono text-xs text-white">
                  <span className="text-purple-400">$</span>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="devoxa-subscribe --email user@domain.com"
                    className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  EXECUTE
                </button>
              </form>
            </div>

          </section>
        </div>
      </main>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
