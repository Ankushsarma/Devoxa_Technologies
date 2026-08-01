import { notFound } from "next/navigation";
import { getBlogPostBySlug, BLOG_POSTS } from "@/lib/blogs-data";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Tag, 
  BookOpen, 
  ArrowRight,
  UserCheck,
  CheckCircle2
} from "lucide-react";
import Particles from "@/components/Particles";

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050408] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      
      {/* Fixed Top Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050408]/80 backdrop-blur-xl border-b border-purple-500/10">
        <nav className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex justify-between items-center w-full">
          <Link href="/blog" className="flex items-center gap-2.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to All Articles</span>
          </Link>

          <Link href="/" className="font-serif text-lg font-bold tracking-tight text-white">
            Devoxa Technologies
          </Link>

          <Link 
            href="/#contact" 
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-[11px] uppercase tracking-wider font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            Work with Us
          </Link>
        </nav>
      </header>

      {/* Hero Header */}
      <section className="relative pt-32 md:pt-40 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0e0a1f] via-[#080514] to-[#050408] overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400 text-xs font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {post.date}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-xs font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0817]/80 border border-purple-500/20 backdrop-blur-xl">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/40" />
            <div>
              <span className="text-sm font-bold text-white block">{post.author.name}</span>
              <span className="text-xs text-purple-300 block">{post.author.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Image */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-6 relative z-20">
        <div className="rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-[300px] sm:h-[450px] w-full">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article Body Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <article 
          className="prose prose-invert prose-purple max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-purple-200 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-purple-300 [&_blockquote]:my-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-gray-400 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-purple-400" /> Tags:
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-purple-950/60 to-indigo-950/40 border border-purple-500/30 flex items-start gap-4">
          <img src={post.author.avatar} alt={post.author.name} className="w-14 h-14 rounded-full object-cover border-2 border-purple-400/40 shrink-0" />
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">WRITTEN BY</span>
            <h4 className="text-base font-bold text-white">{post.author.name}</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light mt-1">{post.author.bio}</p>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span>Related Insights</span>
          </h3>
          <Link href="/blog" className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map(rel => (
            <Link 
              key={rel.id} 
              href={`/blog/${rel.slug}`}
              className="group rounded-3xl bg-[#0c0817]/80 border border-purple-500/20 overflow-hidden backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                <img src={rel.image} alt={rel.title} className="w-full h-40 object-cover rounded-2xl mb-4 transform group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block mb-2">{rel.category}</span>
                <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2 leading-snug">{rel.title}</h4>
              </div>
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1 mt-4">
                Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
