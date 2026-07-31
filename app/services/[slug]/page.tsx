import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services-data";
import Link from "next/link";
import { Footer } from "@/components/ui/footer-section";
import { FooterMobile } from "@/components/ui/footer-section-mobile";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#fafafa] text-studio-black font-sans selection:bg-black selection:text-white min-h-screen flex flex-col">
      {/* Minimal Navigation */}
      <nav className="w-full bg-transparent px-8 md:px-16 py-8 flex justify-between items-center fixed top-0 z-50 mix-blend-difference text-white">
        <div className="font-serif text-2xl font-medium tracking-tight italic flex items-center gap-4">
          <Link href="/">Devoxa Technologies</Link>
        </div>
        <div>
          <Link href="/#disciplines" className="label-mono hover:opacity-70 transition-opacity">
            Close ✕
          </Link>
        </div>
      </nav>

      <div className="flex-grow pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="px-8 md:px-16 pb-20 max-w-7xl mx-auto border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500 mb-8">Service N° {service.id} — {service.title}</p>
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-tight leading-[1] italic">
                {service.heroTagline}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 border-l border-black/10 pl-6">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="px-8 md:px-16 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4 lg:col-span-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500 pt-2 md:pt-3">Overview</h2>
            </div>
            <div className="md:col-span-8 lg:col-span-9 max-w-4xl">
              <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.3] text-black">
                {service.introduction}
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid (Cards) */}
        <section className="px-8 md:px-16 py-24 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-16">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="group p-10 md:p-12 bg-[#fafafa] border border-black/5 rounded-2xl hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                  <div className="w-10 h-[1px] bg-black/20 mb-8 group-hover:w-16 group-hover:bg-black transition-all duration-500"></div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-4 text-black group-hover:italic transition-all duration-300">{feature.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-base md:text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-8 md:px-16 pt-16 md:pt-20 pb-24 md:pb-32 bg-studio-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-20 gap-8">
              <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500">Methodology</h2>
              <p className="font-serif text-4xl md:text-5xl italic text-neutral-300">Our structured approach.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 border-t border-white/10 pt-16">
              {service.process.map((step, idx) => (
                <div key={idx} className="group flex flex-col">
                  <span className="font-mono text-[10px] text-neutral-500 mb-6 tracking-widest border border-white/10 px-3 py-1 rounded-full self-start group-hover:border-white/30 transition-colors">PHASE {step.phase}</span>
                  <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-neutral-300 transition-colors">{step.title}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <footer className="px-8 md:px-16 py-32 text-center bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-5xl md:text-7xl mb-12 italic tracking-tight text-black">Ready to elevate your digital presence?</h2>
          <a href="/#contact" className="bg-black text-white px-10 py-5 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-neutral-800 hover:scale-105 transition-all duration-300 inline-block shadow-lg shadow-black/10">
            Start a project —
          </a>
        </div>
      </footer>

      {/* Desktop Footer */}
      <div className="hidden lg:block w-full">
        <Footer style={{ paddingTop: '0px' }} middleSectionStyle={{ paddingTop: '50px', paddingBottom: '30px' }} />
      </div>

      {/* Mobile Footer */}
      <div className="block lg:hidden w-full">
        <FooterMobile />
      </div>
    </main>
  );
}
