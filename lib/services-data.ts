export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  introduction: string;
  features: { title: string; description: string }[];
  process: { phase: string; title: string; description: string }[];
}

export const servicesData: Service[] = [
  {
    id: "01",
    slug: "web-development",
    title: "Web Development",
    shortDescription: "Bespoke web experiences engineered for precision, speed, and editorial taste.",
    heroTagline: "Architecting the digital frontier.",
    introduction: "We build websites that transcend mere presence. By engineering bespoke architectures that prioritize millisecond load times and pixel-perfect rendering, we create digital flagships that command attention and drive conversion without compromise.",
    features: [
      { title: "Frontend Engineering", description: "React, Next.js, and modern ecosystems for fluid, app-like experiences." },
      { title: "Headless CMS", description: "Decoupled content management for ultimate editorial control and security." },
      { title: "Performance Optimization", description: "Sub-second load times achieved through edge rendering and asset optimization." },
      { title: "Creative Development", description: "WebGL and advanced CSS micro-animations that surprise and delight." }
    ],
    process: [
      { phase: "01", title: "Discovery & Architecture", description: "We map the technical requirements, selecting the optimal stack to support your specific business logic and scaling needs." },
      { phase: "02", title: "Prototyping", description: "Rapid, interactive prototypes ensure functional alignment before heavy engineering begins." },
      { phase: "03", title: "Execution", description: "Our senior engineers write clean, typed, and deeply documented code with rigorous test coverage." },
      { phase: "04", title: "Deployment", description: "Seamless CI/CD pipelines push your product to global edge networks for immediate worldwide access." }
    ]
  },
  {
    id: "02",
    slug: "mobile-applications",
    title: "Mobile Applications",
    shortDescription: "Native and cross-platform craft for products that live in the pocket.",
    heroTagline: "Elegance in the palm of your hand.",
    introduction: "We design and develop mobile applications that feel native to both the user and the device. Whether leveraging Swift, Kotlin, or React Native, our focus remains on creating intuitive, fast, and crash-free experiences.",
    features: [
      { title: "iOS Development", description: "Native Swift applications designed exclusively for the Apple ecosystem." },
      { title: "Android Craft", description: "Kotlin-based experiences built for maximum device compatibility." },
      { title: "Cross-Platform", description: "React Native solutions that share business logic while retaining native feel." },
      { title: "Backend Integration", description: "Seamless API connections for real-time data sync and offline capabilities." }
    ],
    process: [
      { phase: "01", title: "User Journeys", description: "Mapping out every tap, swipe, and gesture to ensure frictionless navigation." },
      { phase: "02", title: "Interface Design", description: "Translating brand identity into iOS Human Interface and Material Design standards." },
      { phase: "03", title: "Engineering", description: "Building robust architectures capable of handling complex device hardware APIs." },
      { phase: "04", title: "App Store Launch", description: "Managing the rigorous review processes for both Apple and Google storefronts." }
    ]
  },
  {
    id: "03",
    slug: "backend-systems",
    title: "Backend Systems",
    shortDescription: "Quiet infrastructure — scalable, observable, and uncompromisingly secure.",
    heroTagline: "The silent engine of your enterprise.",
    introduction: "Great digital products require unshakeable foundations. We engineer highly scalable, distributed backend architectures that process massive data loads securely, ensuring your product remains available when it matters most.",
    features: [
      { title: "API Development", description: "RESTful and GraphQL APIs designed for speed and flexibility." },
      { title: "Database Architecture", description: "Optimized relational (PostgreSQL) and NoSQL databases for complex queries." },
      { title: "Microservices", description: "Decoupled systems that allow teams to iterate and scale independently." },
      { title: "Security & Compliance", description: "Enterprise-grade encryption, zero-trust architectures, and compliance mapping." }
    ],
    process: [
      { phase: "01", title: "System Modeling", description: "Designing data schemas and service boundaries to prevent future bottlenecks." },
      { phase: "02", title: "Infrastructure Setup", description: "Provisioning resilient cloud environments using infrastructure-as-code." },
      { phase: "03", title: "Implementation", description: "Writing highly concurrent, memory-safe backend logic (Node.js, Go, Python)." },
      { phase: "04", title: "Load Testing", description: "Subjecting the system to extreme simulated traffic to guarantee stability." }
    ]
  },
  {
    id: "04",
    slug: "ui-ux-design",
    title: "UI / UX Design",
    shortDescription: "Interfaces designed in the negative space, with restraint as the principle.",
    heroTagline: "Beauty through radical simplicity.",
    introduction: "We believe that the best interfaces disappear. By stripping away the superfluous and focusing obsessively on typography, spacing, and interaction design, we create digital environments that feel inevitable.",
    features: [
      { title: "User Research", description: "Deep qualitative insights that drive empathetic product decisions." },
      { title: "Wireframing", description: "Low-fidelity structural planning to validate hierarchy and flow." },
      { title: "Visual Design", description: "High-fidelity interfaces that establish trust and elevate brand perception." },
      { title: "Design Systems", description: "Comprehensive component libraries ensuring consistency at scale." }
    ],
    process: [
      { phase: "01", title: "Empathy", description: "Understanding the psychological triggers and pain points of the end user." },
      { phase: "02", title: "Ideation", description: "Exploring multiple divergent visual directions before committing to a path." },
      { phase: "03", title: "Refinement", description: "Dialing in the micro-interactions, typographic scales, and color theory." },
      { phase: "04", title: "Handoff", description: "Providing engineers with deeply documented, production-ready assets." }
    ]
  },
  {
    id: "05",
    slug: "ai-solutions",
    title: "AI Solutions",
    shortDescription: "Generative and predictive models woven directly into the product surface.",
    heroTagline: "Intelligence, seamlessly integrated.",
    introduction: "We demystify artificial intelligence, moving beyond hype to implement practical, ROI-driven machine learning models. From intelligent automation to natural language processing, we give your software a cognitive edge.",
    features: [
      { title: "LLM Integration", description: "Customizing OpenAI, Anthropic, and open-source models for your specific data." },
      { title: "Predictive Analytics", description: "Forecasting trends and user behavior using historical datasets." },
      { title: "Computer Vision", description: "Implementing image recognition and processing pipelines." },
      { title: "RAG Systems", description: "Retrieval-Augmented Generation for highly accurate, domain-specific AI chatbots." }
    ],
    process: [
      { phase: "01", title: "Data Audit", description: "Assessing the quality, volume, and structure of your proprietary data." },
      { phase: "02", title: "Model Selection", description: "Choosing the right algorithmic approach balancing cost, speed, and accuracy." },
      { phase: "03", title: "Training & Tuning", description: "Fine-tuning models to understand the nuances of your industry." },
      { phase: "04", title: "Deployment", description: "Integrating the AI securely into your existing product architecture." }
    ]
  },
  {
    id: "06",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription: "Continuous delivery pipelines that disappear into the background.",
    heroTagline: "Shipping at the speed of thought.",
    introduction: "We build the invisible infrastructure that empowers engineering teams. By automating testing, deployment, and scaling, we eliminate friction and allow your organization to ship features faster and safer.",
    features: [
      { title: "CI/CD Pipelines", description: "Automated testing and deployment workflows to eliminate human error." },
      { title: "Infrastructure as Code", description: "Terraform and CloudFormation scripts for reproducible environments." },
      { title: "Containerization", description: "Docker and Kubernetes orchestrations for infinite scalability." },
      { title: "Observability", description: "Deep monitoring, logging, and alerting systems for proactive maintenance." }
    ],
    process: [
      { phase: "01", title: "Assessment", description: "Analyzing current deployment bottlenecks and infrastructure costs." },
      { phase: "02", title: "Architecture Design", description: "Drafting a modern, highly available cloud topology (AWS, GCP, or Azure)." },
      { phase: "03", title: "Migration", description: "Seamlessly moving legacy systems to the cloud with zero downtime." },
      { phase: "04", title: "Optimization", description: "Continuous refinement of resource allocation to maximize ROI." }
    ]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find(service => service.slug === slug);
}
