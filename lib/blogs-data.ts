export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "AI & Automation" | "Cloud & DevOps" | "Web Architecture" | "UI/UX & Mobile";
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  image: string;
  featured?: boolean;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-cloud-infrastructure-2026",
    title: "Architecting Ultra-Scalable Micro-Frontends with Next.js 16 & Server Actions",
    excerpt: "Discover how Devoxa Technologies engineers zero-downtime, high-performance web systems capable of serving millions of concurrent requests effortlessly.",
    category: "Web Architecture",
    date: "August 1, 2026",
    readTime: "6 min read",
    featured: true,
    author: {
      name: "Nikhil Raj",
      role: "Co-Founder & Technical Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Nikhil specializes in cloud-native microservices, WebGL performance tuning, and enterprise Next.js system architecture."
    },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Architecture", "Performance", "React"],
    content: `
      <h2>The Shift Toward Modular Web Systems</h2>
      <p>As modern web applications grow in complexity, monolithic architectures often slow down team velocity and introduce single points of failure. In this deep dive, we explore how Devoxa Technologies leverages Next.js App Router, Turbopack, and edge caching to build resilient digital platforms.</p>

      <h3>1. Edge Caching & Incremental Static Regeneration</h3>
      <p>By shifting dynamic content rendering to the edge, latency drops significantly for global users. Stale-while-revalidate strategies ensure near-instant initial page loads without compromising fresh database content.</p>

      <h3>2. Isolated Component Sandboxing</h3>
      <p>Splitting complex UIs into decoupled micro-frontend modules prevents regression bugs and allows parallel development workflows across specialized engineering squads.</p>

      <blockquote>"Performance is not just a feature — it's the foundation of modern user retention and conversion velocity."</blockquote>

      <h3>3. Continuous Automated Performance Budgets</h3>
      <p>Implementing CI/CD bundle size checks and Core Web Vitals telemetry guarantees that no code change degrades the smooth 60fps user experience.</p>
    `
  },
  {
    id: "2",
    slug: "ai-driven-automation-for-enterprise",
    title: "Harnessing LLM Agents & Custom Workflows for Business Process Automation",
    excerpt: "How autonomous AI agents are reshaping backend workflows, reducing operational friction, and driving 4x efficiency gains for scaling enterprises.",
    category: "AI & Automation",
    date: "July 28, 2026",
    readTime: "8 min read",
    featured: false,
    author: {
      name: "Nayab Gauhar",
      role: "Co-Founder & Lead AI Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Nayab focuses on enterprise AI integrations, multi-agent systems, and generative user interfaces."
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "LLM", "Automation", "Workflow"],
    content: `
      <h2>The New Wave of Enterprise Automation</h2>
      <p>Artificial Intelligence has evolved beyond simple chatbots. Modern enterprise workflows demand autonomous agents capable of reasoning, calling APIs, and updating database state securely.</p>

      <h3>Key Architecture Patterns</h3>
      <p>We combine Retrieval-Augmented Generation (RAG) with vector databases to allow AI agents to parse thousands of internal compliance documents accurately within milliseconds.</p>
    `
  },
  {
    id: "3",
    slug: "cloud-native-devops-best-practices",
    title: "Mastering Zero-Trust AWS Cloud Security & Automated Kubernetes Pipelines",
    excerpt: "A comprehensive guide to locking down infrastructure, automating container deployments, and achieving 99.99% uptime SLAs.",
    category: "Cloud & DevOps",
    date: "July 20, 2026",
    readTime: "5 min read",
    featured: false,
    author: {
      name: "Nikhil Raj",
      role: "Co-Founder & Technical Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Nikhil specializes in cloud-native microservices, WebGL performance tuning, and enterprise Next.js system architecture."
    },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    tags: ["DevOps", "AWS", "Docker", "Security"],
    content: `
      <h2>Zero-Trust Architecture Principles</h2>
      <p>In cloud-native environments, internal network trust can be a vulnerability. Enforcing IAM least-privilege policies and automated secret rotation ensures bulletproof security.</p>
    `
  },
  {
    id: "4",
    slug: "futuristic-ui-ux-design-trends-2026",
    title: "Designing Spatial & Glassmorphism UIs That Engage and Convert",
    excerpt: "Explore visual trends in modern web design: glassmorphism, micro-animations, HSL color balance, and dynamic dark mode aesthetics.",
    category: "UI/UX & Mobile",
    date: "July 15, 2026",
    readTime: "4 min read",
    featured: false,
    author: {
      name: "Nayab Gauhar",
      role: "Co-Founder & Lead Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Nayab focuses on enterprise AI integrations, multi-agent systems, and generative user interfaces."
    },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    tags: ["UI/UX", "Design", "CSS", "Glassmorphism"],
    content: `
      <h2>The Art of Modern Visual Design</h2>
      <p>First impressions matter. Combining subtle motion, balanced contrast, and hardware-accelerated CSS transitions makes web applications feel premium and alive.</p>
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
