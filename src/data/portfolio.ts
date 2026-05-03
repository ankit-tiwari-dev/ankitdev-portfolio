export type ModuleKey =
  | 'dashboard'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'why-hire'
  | 'contact';

export type ProjectRecord = {
  id: string;
  title: string;
  strapline: string;
  summary: string;
  description: string;
  impact: string;
  status: string;
  year: string;
  stack: string[];
  features: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
  };
  flow: string[];
  deep_specs?: {
    architecture: string;
    tech_rationale: string;
    challenges_solved: string[];
    ai_integration?: string;
  };
};

export type SkillRecord = {
  id: string;
  name: string;
  category: 'Interface' | 'Platform' | 'Data' | 'AI Systems' | 'Delivery' | 'Programming';
  related: string[];
  usedIn: string[];
  note: string;
};

export type AchievementRecord = {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'award' | 'milestone';
  description: string;
  outcome: string;
};

export type CertificationRecord = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  details: string;
};

export type ContactRecord = {
  label: string;
  value: string;
  href: string;
};

export const portfolioData = {
  identity: {
    name: 'Ankit Tiwari',
    role: 'Software Engineer',
    focus: 'AI Systems + Full-Stack Product Engineering',
    location: 'India',
    availability: 'Open to software engineering and AI product roles',
    summary:
      'Builds production-ready software systems where AI, backend reliability, and interface clarity work as one product surface.',
  },
  stats: [
    { label: 'REST APIs Built', value: '60+' },
    { label: 'Skill Nodes', value: '25+' },
    { label: 'Achievements', value: '05+' },
  ],
  commandCenter: {
    placeholder: 'Query the portfolio system. Example: /projects or "show AI work"',
    commands: [
      { id: '/projects', label: 'Projects', prompt: 'Show projects', module: 'projects' as ModuleKey },
      { id: '/skills', label: 'Skills', prompt: 'Show skill matrix', module: 'skills' as ModuleKey },
      { id: '/achievements', label: 'Achievements', prompt: 'Show achievements', module: 'achievements' as ModuleKey },
      { id: '/why-hire-me', label: 'Why Hire Me', prompt: 'Why hire Ankit?', module: 'why-hire' as ModuleKey },
      { id: '/contact', label: 'Contact', prompt: 'Show contact channels', module: 'contact' as ModuleKey },
      { id: '/explore', label: 'Explore Me', prompt: 'Guide me through the portfolio', module: 'dashboard' as ModuleKey },
    ],
  },
  projects: [
    {
      id: 'careerpath-ai',
      title: 'CareerPath AI',
      strapline: 'AI-guided career decision engine',
      summary: 'Assesses skills, maps gaps, and recommends learning paths with an AI-backed decision layer.',
      description:
        'A product-style career intelligence platform that combines assessment logic, adaptive recommendations, and admin visibility into user progress.',
      impact: 'Turns a generic guidance workflow into a measurable recommendation system.',
      status: 'Live system',
      year: '2025',
      stack: ['React 19', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Groq Llama', 'Razorpay', 'OAuth 2.0'],
      features: [
        'Dynamic skill assessment engine',
        'Personalized roadmap generation',
        'Admin analytics dashboard',
        'Payment and auth integration',
      ],
      highlights: [
        'Integrated AI into the product workflow rather than as a cosmetic add-on.',
        'Built dual-side visibility for both learner and administrator.',
        'Focused on decision quality, not just content generation.',
      ],
      links: {
        github: 'https://github.com/ankit-tiwari-dev/career_path_ai',
        live: 'https://career-path-aii.vercel.app',
      },
      flow: ['User input', 'Assessment engine', 'Recommendation logic', 'Progress dashboard'],
      deep_specs: {
        architecture: 'Modular Monolith with a clear separation between the Express API and the Reasoning Layer.',
        tech_rationale: 'React 19 was chosen for its improved concurrent rendering, which keeps the AI chat interface fluid during heavy data processing.',
        challenges_solved: [
          'Optimized Groq Llama inference latency by implementing prompt-caching strategies.',
          'Resolved state-desync issues in the multi-step assessment flow using a robust global state manager.',
        ],
        ai_integration: 'Utilizes Groq Llama 3 for real-time career path generation and Gemini API for multimodal document analysis.',
      },
    },
    {
      id: 'safespend',
      title: 'SafeSpend',
      strapline: 'Finance operating surface with insight loops',
      summary: 'Tracks spending, exposes patterns, and helps users act on financial behavior with clear analytics.',
      description:
        'A polished finance product built with strong security posture, realtime visual summaries, and AI-assisted trend interpretation.',
      impact: 'Converts raw transaction tracking into a more actionable financial control system.',
      status: 'Live system',
      year: '2025',
      stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OAuth 2.0', 'Recharts'],
      features: [
        'Goal and budget management',
        'Realtime analytics views',
        'Protected sessions and auth flows',
        'Dual visual themes',
      ],
      highlights: [
        'Balanced premium UI treatment with operational clarity.',
        'Added secure auth and session handling for trust-sensitive data.',
        'Used charting intentionally to aid decisions, not decorate screens.',
      ],
      links: {
        github: 'https://github.com/ankit-tiwari-dev/SafeSpend-Smart-Finance-Tracker',
        live: 'https://safespend-pro.vercel.app',
      },
      flow: ['Transaction input', 'Validation and auth', 'Analytics engine', 'User decisions'],
      deep_specs: {
        architecture: 'Client-Server architecture with JWT-based session management and MongoDB persistence.',
        tech_rationale: 'Node.js/Express was used for the backend to handle high-frequency transaction updates with minimal overhead.',
        challenges_solved: [
          'Implemented an atomic transaction update system to prevent double-spending errors.',
          'Engineered a responsive chart system that handles 1000+ data points without layout shift.',
        ],
      },
    },
    {
      id: 'medicine-resale',
      title: 'Medicine Resale Platform',
      strapline: 'Verification-heavy healthcare marketplace flow',
      summary: 'Uses AI-assisted OCR plus operational checks to validate medicine resale before listing.',
      description:
        'A multi-stage commerce workflow with verification gates, rider operations, admin approval, and wallet settlement logic.',
      impact: 'Introduces traceability and rule enforcement into a trust-sensitive resale scenario.',
      status: 'Live system',
      year: '2025',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq Vision', 'Tesseract.js', 'Razorpay'],
      features: [
        'OCR-assisted medicine extraction',
        'Rule-based resale validation',
        'Pickup and proof workflow',
        'Wallet credit and payment security',
      ],
      highlights: [
        'Mixed AI extraction with deterministic domain rules.',
        'Designed the system around operational risk reduction.',
        'Handled approval states explicitly across multiple roles.',
      ],
      links: {
        github: 'https://github.com/ankit-tiwari-dev/Medicine-Resale-Platform',
        live: 'https://medicine-resale-platform.vercel.app',
      },
      flow: ['Image upload', 'OCR and scoring', 'Admin and rider verification', 'Approved listing'],
      deep_specs: {
        architecture: 'Event-driven commerce flow with multi-role state management.',
        tech_rationale: 'Tesseract.js was integrated for client-side OCR to reduce server load for initial verification gates.',
        challenges_solved: [
          "Engineered a 'Verification Guard' system to prevent fraudulent medicine listings.",
          'Optimized rider routing logic for efficient medicine collection.',
        ],
        ai_integration: 'Uses Gemini Vision for prescription analysis and Tesseract for text extraction.',
      },
    },
    {
      id: 'email-job-scheduler',
      title: 'Email Job Scheduler',
      strapline: 'Reliable queue-first outbound delivery system',
      summary: 'Schedules and executes bulk email jobs with persistence, rate control, and worker concurrency.',
      description:
        'A backend-heavy system designed around job durability, queue throughput, and controlled dispatch behavior.',
      impact: 'Shows strong backend thinking around reliability, workers, and operational safety.',
      status: 'Live system',
      year: '2025',
      stack: ['Next.js 14', 'TypeScript', 'BullMQ', 'Redis', 'PostgreSQL', 'Prisma'],
      features: [
        'Producer-worker job architecture',
        'Persistent queue state',
        'Rate limiting and throttling',
        'Realtime job monitoring',
      ],
      highlights: [
        'Built for resilience rather than only feature completion.',
        'Used infrastructure choices that support scale and recoverability.',
        'Made backend status observable for operators.',
      ],
      links: {
        github: 'https://github.com/ankit-tiwari-dev/Email-Job-Scheduler',
        live: 'https://email-job-scheduler-chi.vercel.app/',
      },
      flow: ['Job creation', 'Queue persistence', 'Worker processing', 'Delivery tracking'],
      deep_specs: {
        architecture: 'Worker-pool architecture using BullMQ and Redis for high-reliability job scheduling.',
        tech_rationale: 'BullMQ was chosen for its robust retry logic and delayed job capabilities, essential for transactional emails.',
        challenges_solved: [
          'Implemented rate-limiting to comply with SMTP provider constraints.',
          'Built a Dead Letter Queue handler to manage failed delivery attempts gracefully.',
        ],
      },
    },
    {
      id: 'system-explorer',
      title: 'System Architecture Portfolio',
      strapline: 'High-Performance Portfolio with Live Viewport Architecture',
      summary: 'Redesigned as an immersive kinetic gallery with deep contrast aesthetics and automated live system previews.',
      description:
        'This version 2.0 overhaul integrates framer-motion for scroll-linked parallax, a premium midnight-black design system, and an automated iframe-based preview system for instant project interaction.',
      impact: 'Demonstrates high-end interface engineering, performance optimization, and interactive product storytelling.',
      status: 'Current build',
      year: '2026',
      stack: ['React 19', 'Framer Motion', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React'],
      features: [
        'Kinetic scroll-linked parallax animations',
        'Automated Live Project Viewports',
        'Deep contrast midnight-black aesthetic',
        'Responsive device-mockup framing',
      ],
      highlights: [
        'Engineered a dual-layer spring-physics cursor system.',
        'Implemented automated on-demand iframe loading for speed.',
        'Built a custom mechanical drawer interaction for project details.',
      ],
      links: {
        github: 'https://github.com/ankit-tiwari-dev/ankitdev-portfolio',
      },
      flow: ['Kinetic Gallery', 'Scroll-Linked Motion', 'Live Viewports', 'Automated Previews'],
    },
  ] satisfies ProjectRecord[],
  skills: [
    {
      id: 'react',
      name: 'React',
      category: 'Interface',
      related: ['vite', 'nextjs', 'tailwind'],
      usedIn: ['careerpath-ai', 'safespend', 'medicine-resale', 'system-explorer'],
      note: 'Primary UI layer for product-facing interfaces.',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Interface',
      related: ['react', 'typescript', 'postgres'],
      usedIn: ['email-job-scheduler'],
      note: 'Used when frontend and server capabilities need tighter integration.',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Interface',
      related: ['react', 'vite'],
      usedIn: ['careerpath-ai', 'safespend', 'medicine-resale', 'system-explorer'],
      note: 'Fast styling system for deliberate UI construction.',
    },
    {
      id: 'vite',
      name: 'Vite',
      category: 'Delivery',
      related: ['react', 'typescript'],
      usedIn: ['careerpath-ai', 'system-explorer'],
      note: 'Used for fast iteration in modern frontend systems.',
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'Platform',
      related: ['express', 'bullmq', 'redis'],
      usedIn: ['careerpath-ai', 'safespend', 'medicine-resale', 'email-job-scheduler'],
      note: 'Core runtime across backend and workflow systems.',
    },
    {
      id: 'express',
      name: 'Express',
      category: 'Platform',
      related: ['node', 'mongodb', 'jwt'],
      usedIn: ['careerpath-ai', 'safespend', 'medicine-resale'],
      note: 'Used to build API layers with clear business logic boundaries.',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Data',
      related: ['express', 'mongoose', 'razorpay'],
      usedIn: ['careerpath-ai', 'safespend', 'medicine-resale'],
      note: 'Flexible store for application and workflow data.',
    },
    {
      id: 'postgres',
      name: 'PostgreSQL',
      category: 'Data',
      related: ['prisma', 'bullmq', 'typescript'],
      usedIn: ['email-job-scheduler'],
      note: 'Structured persistence for queue-backed workloads.',
    },
    {
      id: 'prisma',
      name: 'Prisma',
      category: 'Data',
      related: ['postgres', 'typescript'],
      usedIn: ['email-job-scheduler'],
      note: 'Typed access layer for operational data models.',
    },
    {
      id: 'llama-3',
      name: 'Llama 3.3 (Groq)',
      category: 'AI Systems',
      related: ['gemini', 'python'],
      usedIn: ['careerpath-ai'],
      note: 'Applied for high-speed, dynamic reasoning and content generation.',
    },
    {
      id: 'gemini-api',
      name: 'Gemini API',
      category: 'AI Systems',
      related: ['llama-3', 'python'],
      usedIn: ['careerpath-ai', 'google-cloud-cert'],
      note: 'Used for multimodal AI features and Google Cloud integration.',
    },
    {
      id: 'prompt-eng',
      name: 'Prompt Engineering',
      category: 'AI Systems',
      related: ['llama-3', 'gemini'],
      usedIn: ['careerpath-ai'],
      note: 'Optimizing model outputs through structured persona and task design.',
    },
    {
      id: 'groq-vision',
      name: 'Groq Vision',
      category: 'AI Systems',
      related: ['tesseract', 'mongodb'],
      usedIn: ['medicine-resale'],
      note: 'Used for image-driven extraction within a constrained workflow.',
    },
    {
      id: 'tesseract',
      name: 'Tesseract.js',
      category: 'AI Systems',
      related: ['groq-vision', 'node'],
      usedIn: ['medicine-resale'],
      note: 'Complements model output with deterministic OCR processing.',
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      related: ['ai-ml', 'node'],
      usedIn: ['careerpath-ai'],
      note: 'Used for scripting and AI model integration.',
    },
    {
      id: 'c-lang',
      name: 'C',
      category: 'Programming',
      related: ['cpp', 'dsa'],
      usedIn: ['mindstorm'],
      note: 'Foundation for low-level system understanding.',
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Programming',
      related: ['dsa', 'cpp'],
      usedIn: ['hackerrank'],
      note: 'Core language for algorithmic problem solving.',
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Programming',
      related: ['dsa', 'java'],
      usedIn: ['mindstorm'],
      note: 'Used for high-performance computing and DSA.',
    },
    {
      id: 'rest-apis',
      name: 'REST APIs',
      category: 'Platform',
      related: ['node', 'express'],
      usedIn: ['careerpath-ai', 'safespend'],
      note: 'Engineered 60+ scalable endpoints with clean architecture.',
    },
    {
      id: 'angular',
      name: 'Angular (Basic)',
      category: 'Interface',
      related: ['react', 'typescript'],
      usedIn: ['system-explorer'],
      note: 'Explored for enterprise-scale frontend architecture.',
    },
    {
      id: 'figma',
      name: 'Figma',
      category: 'Interface',
      related: ['framer', 'tailwind'],
      usedIn: ['careerpath-ai', 'system-explorer'],
      note: 'Primary tool for interface design and prototyping.',
    },
    {
      id: 'framer',
      name: 'Framer',
      category: 'Interface',
      related: ['figma', 'framer-motion'],
      usedIn: ['system-explorer'],
      note: 'Used for high-fidelity interactive prototypes.',
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Delivery',
      related: ['git', 'docker'],
      usedIn: ['careerpath-ai', 'safespend'],
      note: 'Used for version control, CI/CD, and collaboration.',
    },
    {
      id: 'lighthouse',
      name: 'Lighthouse',
      category: 'Delivery',
      related: ['vite', 'nextjs'],
      usedIn: ['safespend', 'system-explorer'],
      note: 'Used for performance auditing and QA metrics.',
    },
    {
      id: 'gcp',
      name: 'GCP',
      category: 'Delivery',
      related: ['docker', 'git'],
      usedIn: ['google-cloud-cert'],
      note: 'Cloud infrastructure for AI application deployment.',
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Delivery',
      related: ['node', 'gcp'],
      usedIn: ['email-job-scheduler'],
      note: 'Containerization for consistent deployment environments.',
    },
    {
      id: 'dsa',
      name: 'DSA',
      category: 'Delivery',
      related: ['java', 'cpp'],
      usedIn: ['geeksforgeeks-cert'],
      note: 'Strong fundamentals in data structures and algorithms.',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Data',
      related: ['prisma', 'postgres'],
      usedIn: ['email-job-scheduler'],
      note: 'Relational database design and query optimization.',
    },
  ] satisfies SkillRecord[],
  certifications: [
    {
      id: 'google-vertex-ai',
      title: 'Prompt Design in Vertex AI',
      issuer: 'Google Cloud',
      date: '2025',
      url: 'https://www.skills.google/public_profiles/84a2de7d-80aa-45ef-885b-e3bc61fbfc83/badges/15371646',
      details: 'Mastered prompt engineering, multimodal generative techniques, and Gemini model optimization within Vertex AI.',
    },
    {
      id: 'google-cloud-ai-apps',
      title: 'Build Real World AI Applications with Gemini and Imagen',
      issuer: 'Google Cloud',
      date: '2025',
      url: 'https://www.skills.google/public_profiles/84a2de7d-80aa-45ef-885b-e3bc61fbfc83/badges/15444917',
      details: 'Validated proficiency in image recognition, NLP, and deploying generative AI applications on Vertex AI.',
    },
    {
      id: 'forage-tata-esg',
      title: 'ESG Virtual Experience Program',
      issuer: 'Tata (via Forage)',
      date: '2025',
      url: 'https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_696f1f2498c76d180df723ed_1768924775137_completion_certificate.pdf',
      details: 'Simulated real-world ESG (Environmental, Social, and Governance) data analysis and reporting for Tata.',
    },
    {
      id: 'hackerrank-js-basic',
      title: 'JavaScript (Basic) Certificate',
      issuer: 'HackerRank',
      date: '2024',
      url: 'https://www.hackerrank.com/certificates/fffbc268a7c3',
      details: 'Verified understanding of core JavaScript concepts, including functions, loops, and data manipulation.',
    },
    {
      id: 'udemy-html-css',
      title: 'Complete Guide in HTML & CSS - Build Responsive Website',
      issuer: 'Udemy',
      date: '2023',
      url: 'https://www.udemy.com/certificate/UC-daaee1e7-9a61-496e-8a55-2f2c8cdec134/',
      details: 'Mastery of semantic HTML, modern CSS layouts (Flexbox/Grid), and responsive design principles.',
    },
    {
      id: 'gfg-fullstack',
      title: 'Full Stack Developer Bootcamp - Master Frontend to Backend',
      issuer: 'GeeksforGeeks',
      date: '2024',
      url: 'https://media.geeksforgeeks.org/courses/certificates/f7ca4a953e05e905bf8bd683b307db6c.pdf',
      details: 'Intensive 6-week bootcamp covering end-to-end web development, from UI/UX design to scalable backend architecture.',
    },
    {
      id: 'hackerrank-java-basic',
      title: 'Java (Basic) Certificate',
      issuer: 'HackerRank',
      date: '2024',
      url: 'https://www.hackerrank.com/certificates/f8a50fdbf418',
      details: 'Validated mastery of core Java syntax, object-oriented programming, and basic data structures.',
    },
    {
      id: 'infosys-python',
      title: 'Basics of Python',
      issuer: 'Infosys Springboard',
      date: '2024',
      url: 'https://verify.onwingspan.com',
      details: 'Certified foundation in Python programming, covering data types, control structures, and scripting fundamentals.',
    },
    {
      id: 'infosys-java',
      title: 'Java Concepts',
      issuer: 'Infosys Springboard',
      date: '2024',
      url: 'https://verify.onwingspan.com',
      details: 'Deep dive into fundamental Java concepts, JVM architecture, and modular programming patterns.',
    },
    {
      id: 'gfg-dsa',
      title: 'DSA 160 – Data Structures & Algorithms',
      issuer: 'GeeksforGeeks',
      date: '2024',
      url: 'https://www.geeksforgeeks.org/certificate/25b05a101ce37ce5729b8730c37fabd2',
      details: 'Comprehensive mastery of complex algorithms and data structure optimization.',
    },
  ],
  achievements: [
    {
      id: 'design-thinking',
      title: '1st Place - Design Thinking Competition',
      organization: 'Bhagwan Mahavir University',
      date: 'November 2024',
      type: 'award',
      description: 'Built a technology-led solution focused on campus sustainability.',
      outcome: 'Demonstrated product framing and applied problem solving under evaluation.',
    },
    {
      id: 'innovate-hackathon',
      title: '2nd Place - Innovate Hackathon',
      organization: 'Bhagwan Mahavir College of Computer Application',
      date: 'March 2025',
      type: 'award',
      description: 'Developed an app concept connecting students to volunteer opportunities.',
      outcome: 'Showed speed, collaboration, and delivery under time pressure.',
    },
    {
      id: 'mindstorm',
      title: '3rd Place - Mindstorm Competition',
      organization: 'D.C. Patel College and J.N.M. Patel Science College',
      date: 'January 2025',
      type: 'award',
      description: 'Solved algorithmic and data structure challenges in a timed environment.',
      outcome: 'Validated strong problem-solving fundamentals.',
    },
    {
      id: 'deans-list',
      title: "Dean's List Scholar",
      organization: 'BCA Department',
      date: '2024 - 2025',
      type: 'milestone',
      description: 'Maintained strong academic performance across the academic year.',
      outcome: 'Signals consistency and discipline alongside project work.',
    },
    {
      id: 'open-source',
      title: 'Open Source Contributor',
      organization: 'GitHub',
      date: 'October 2022',
      type: 'milestone',
      description: 'Contributed fixes, enhancements, and documentation improvements to repositories.',
      outcome: 'Shows initiative and collaboration beyond coursework.',
    },
  ] satisfies AchievementRecord[],
  hireReasons: [
    {
      title: 'Architectural Hybrid',
      detail: 'I bridge the gap between static Figma high-fidelity design and scalable React/Node engineering, ensuring no signal is lost during implementation.',
    },
    {
      title: 'AI Native Development',
      detail: 'Experienced in integrating Llama and Gemini models into production workflows, optimizing for latency and user-centric reasoning.',
    },
    {
      title: 'Performance Audited',
      detail: 'I use Lighthouse and advanced database optimization (MongoDB/MySQL) to ensure systems are not just functional, but professionally performant.',
    },
    {
      title: 'Outcome Focused',
      detail: 'From 60+ REST APIs to automated KYCs, I focus on delivering systems that solve specific business problems with engineered precision.',
    },
  ],
  contact: [
    { label: 'github_access', value: 'ankit-tiwari-dev', href: 'https://github.com/ankit-tiwari-dev' },
    { label: 'linkedin_sync', value: 'ankit-tiwari-at23', href: 'https://www.linkedin.com/in/ankit-tiwari-at23/' },
    { label: 'leetcode_metrics', value: 'Ankit_Tiwari_2306', href: 'https://leetcode.com/u/Ankit_Tiwari_2306/' },
    { label: 'hackerrank_identity', value: 'ankit827691', href: 'https://www.hackerrank.com/profile/ankit827691' },
    { label: 'email_direct', value: 'ankit827691@gmail.com', href: 'mailto:ankit827691@gmail.com' },
  ],
  careerKnowledge: {
    bio: "I am Ankit Tiwari, an AI + Full-Stack Engineer focused on building products that feel 'engineered' but act 'intelligent.' I bridge the gap between creative UI and deep system logic.",
    mission: "My mission is to deploy AI layers into real-world products to automate complex decision-making and improve human efficiency.",
    strengths: "My core strength lies in 'Architectural Fluidity'—the ability to jump from high-fidelity UI design to deep backend logic without losing sight of the product's goal.",
    deadlines: "I treat deadlines as fixed system constraints. I prioritize 'Signal over Noise,' ensuring the most critical features are production-hardened first.",
    collaboration: "I communicate in 'Engineering Outcomes.' Instead of just saying what I built, I explain why it matters for the user and how it affects system performance.",
    ai_vision: "I believe AI should be a 'Silent Partner' in products—not just a chatbot, but a layer that makes the software smarter and more predictive.",
  },
} as const;

export const moduleLabels: Record<ModuleKey, string> = {
  dashboard: 'Overview',
  projects: 'Projects',
  skills: 'Skills',
  achievements: 'Achievements',
  'why-hire': 'Why Hire Me',
  contact: 'Contact',
};
