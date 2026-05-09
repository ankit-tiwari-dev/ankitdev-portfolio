import { 
  AnimatePresence, 
  motion, 
  useMotionValue, 
  useSpring, 
  useScroll, 
  useTransform 
} from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bot, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight, 
  Code, 
  Download, 
  ExternalLink, 
  FileText, 
  Filter, 
  Github, 
  Globe, 
  Layers, 
  Layout, 
  Linkedin, 
  Mail, 
  Maximize2, 
  Monitor, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  Smartphone, 
  Sparkles, 
  X,
  Map,
  Calendar,
  MessageSquare,
  Send,
  Database,
  Lock,
  Zap,
  Activity,
  Award,
  BookOpen
} from 'lucide-react';
import { useEffect, useRef, type ReactNode, useState } from 'react';
import resumeFile from './assets/Ankittiwari_Resume.pdf';
import profileImage from './assets/Image.png';
import leetcodeIcon from './assets/icons8-leetcode-24.png';
import careerPathThumbnail from './assets/careerpath_ai.png';
import careerPathThumbnail2 from './assets/careerpath_ai_2.png';

// CareerPath AI Real Assets
import cpDash from './assets/CareerPathAI_Assets/UserDashboard.png';
import cpProfileDark from './assets/CareerPathAI_Assets/UserProfile_DarkTheme.png';
import cpProfileLight from './assets/CareerPathAI_Assets/UserProfile_LightTheme.png';
import cpRoadmap from './assets/CareerPathAI_Assets/UserRoadMap.png';

// SafeSpend Real Assets
import ssInflow from './assets/ss_inflow.png';
import ssTargets from './assets/ss_targets.png';
import ssBudgeting from './assets/ss_budgeting.png';
import ssAnalytics from './assets/ss_analytics.png';
import ssTransactions from './assets/ss_transactions.png';
import ssTargetsDark from './assets/ss_targets_dark.png';

// MedAIMart Real Assets
import medLedger from './assets/med_ledger.png';
import medUsers from './assets/med_users.png';
import medCart from './assets/med_cart.png';
import medOrders from './assets/med_orders.png';
import medPayment from './assets/med_payment.png';
import medInventory from './assets/med_inventory.png';
import medAdmin from './assets/med_admin.png';
import portfolioHero from './assets/portfolio_hero.png';

// Email Scheduler Real Assets
import emailDash from './assets/email_dash.png';
import emailHistory from './assets/email_history.png';
import emailLogs from './assets/email_logs.png';
import emailView from './assets/email_view.png';
import emailSummary from './assets/email_summary.png';

import safeSpendThumbnail from './assets/safespend.png';
import medicineThumbnail from './assets/medicine_resale.png';
import emailSchedulerThumbnail from './assets/email_scheduler.png';
import systemExplorerThumbnail from './assets/system_explorer.png';
import { portfolioData, type ProjectRecord, type SkillRecord } from './data/portfolio';
import './index.css';

const LeetCodeLogo = (props: any) => (
  <img src={leetcodeIcon} alt="LeetCode" className={props.className} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);

const GFGLogo = (props: any) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#43a047" d="M29.035,24C29.014,23.671,29,23.339,29,23c0-6.08,2.86-10,7-10c3.411,0,6.33,2.662,7,7l2,0l0.001-9	L43,11c0,0-0.533,1.506-1,1.16c-1.899-1.066-3.723-1.132-6.024-1.132C30.176,11.028,25,16.26,25,22.92	c0,0.364,0.021,0.723,0.049,1.08h-2.099C22.979,23.643,23,23.284,23,22.92c0-6.66-5.176-11.892-10.976-11.892	c-2.301,0-4.125,0.065-6.024,1.132C5.533,12.506,5,11,5,11l-2.001,0L3,20l2,0c0.67-4.338,3.589-7,7-7c4.14,0,7,3.92,7,10	c0,0.339-0.014,0.671-0.035,1H0v2h1.009c1.083,0,1.977,0.861,1.999,1.943C3.046,29.789,3.224,32.006,4,33c1.269,1.625,3,3,8,3	c5.022,0,9.92-4.527,11-10h2c1.08,5.473,5.978,10,11,10c5,0,6.731-1.375,8-3c0.776-0.994,0.954-3.211,0.992-5.057	C45.014,26.861,45.909,26,46.991,26H48v-2H29.035z M11.477,33.73C9.872,33.73,7.322,33.724,7,32	c-0.109-0.583-0.091-2.527-0.057-4.046C6.968,26.867,7.855,26,8.943,26H19C18.206,30.781,15.015,33.73,11.477,33.73z M41,32	c-0.322,1.724-2.872,1.73-4.477,1.73c-3.537,0-6.729-2.949-7.523-7.73h10.057c1.088,0,1.975,0.867,2,1.954	C41.091,29.473,41.109,31.417,41,32z"></path>
  </svg>
);

type ProjectExplainState = {
  title: string;
  summary: string;
  details: Array<{ label: string; value: string }>;
};

type AskPanelState = {
  title: string;
  points: string[];
};

const capabilityBands: Array<{
  title: string;
  skills: SkillRecord[];
}> = [
  {
    title: 'Core Systems',
    skills: portfolioData.skills.filter((skill) => skill.category === 'Programming' || skill.category === 'Platform'),
  },
  {
    title: 'Product Surface',
    skills: portfolioData.skills.filter((skill) => skill.category === 'Interface'),
  },
  {
    title: 'Intelligence Layer',
    skills: portfolioData.skills.filter((skill) => skill.category === 'AI Systems'),
  },
  {
    title: 'Data & Delivery',
    skills: portfolioData.skills.filter((skill) => skill.category === 'Data' || skill.category === 'Delivery'),
  },
];

const askSuggestions = [
  'Explain a project',
  'What are his strengths?',
  'What technologies does he use?',
] as const;

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const explainProject = (project: ProjectRecord): ProjectExplainState => ({
  title: `Technical Deep-Dive: ${project.title}`,
  summary: project.summary,
  details: [
    { label: 'Architectural Pattern', value: project.deep_specs?.architecture || 'Micro-services inspired flow' },
    { label: 'Technical Rationale', value: project.deep_specs?.tech_rationale || 'Built for high performance and scalability.' },
    { label: 'Key Implementation Challenge', value: project.deep_specs?.challenges_solved?.[0] || 'Optimizing complex data flows.' },
    { label: 'Intelligence Layer', value: project.deep_specs?.ai_integration || 'Standard algorithmic logic.' },
  ],
});

const getAskPanelContent = (suggestion: (typeof askSuggestions)[number]): AskPanelState => {
  if (suggestion === 'Explain a project') {
    const project = portfolioData.projects[0];

    return {
      title: `Agent Report: ${project.title}`,
      points: [
        `Architecture: ${project.deep_specs?.architecture}`,
        `Reasoning: ${project.deep_specs?.tech_rationale}`,
        `Challenge Solved: ${project.deep_specs?.challenges_solved?.[0]}`,
        `AI Implementation: ${project.deep_specs?.ai_integration || 'N/A'}`,
      ],
    };
  }

  if (suggestion === 'What are his strengths?') {
    const k = (portfolioData as any).careerKnowledge;
    return {
      title: 'Expert Interpretation',
      points: [
        `Primary Strength: ${k.strengths}`,
        `AI Vision: ${k.ai_vision}`,
        `Execution Style: ${k.deadlines}`,
      ],
    };
  }

  return {
    title: 'Technology Core',
    points: capabilityBands.map(
      (band) => `${band.title}: ${band.skills.map((skill) => skill.name).join(', ')}`,
    ),
  };
};

function App() {
  const [projectExplain, setProjectExplain] = useState<ProjectExplainState | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI/ML', 'Full Stack', 'Backend', 'FinTech', 'HealthTech'];

  const filteredProjects = portfolioData.projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || (p.category && p.category.includes(activeFilter));
    
    return matchesSearch && matchesFilter;
  });

  const featuredProjects = portfolioData.projects.filter(p => p.featured);
  const [askPanelOpen, setAskPanelOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [askPanelContent, setAskPanelContent] = useState<AskPanelState>(
    getAskPanelContent('Explain a project'),
  );
  const [isHovering, setIsHovering] = useState(false);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);

  const handleSuggestionClick = (suggestion: (typeof askSuggestions)[number]) => {
    setAskPanelContent(getAskPanelContent(suggestion));
  };

  useEffect(() => {
    fetch('https://api.github.com/users/ankit-tiwari-dev/repos?sort=updated&per_page=5')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setGithubRepos(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  const achievementsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: achievementsProgress } = useScroll({
    target: achievementsRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(achievementsProgress, { stiffness: 400, damping: 90 });


  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .skill-pill, .ask-suggestion-card, .hero-nav-link');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#020408] text-slate-100">
      <CustomCursor isHovering={isHovering} />
      <BackgroundScene isPaused={false} />



      <AnimatePresence>
        {showWelcome ? (
          <WelcomeScreen onEnter={() => setShowWelcome(false)} />
        ) : null}
      </AnimatePresence>

      <main className="relative z-10">
        <section
          id="hero"
          className="mx-auto max-w-7xl px-4 pt-[28px] sm:px-5 sm:pt-[34px] md:px-8 md:pt-[42px] lg:px-10 lg:pt-[49px]"
        >
          <div className="w-full">
            <div className="hero-editorial-shell">
              {/* Header Navigation */}
              <nav className="flex items-center justify-between mb-12 lg:mb-20">
                <div>
                  <p className="font-heading text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-amber-200/80">
                    {portfolioData.identity.name}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                  <button className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider hover:text-amber-200 transition-colors" onClick={() => scrollToId('projects')} type="button">
                    Work
                  </button>
                  <button className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider hover:text-amber-200 transition-colors" onClick={() => scrollToId('skills')} type="button">
                    Skills
                  </button>
                  <button className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider hover:text-amber-200 transition-colors" onClick={() => scrollToId('bio')} type="button">
                    About
                  </button>
                  <div className="h-3 w-px bg-white/10 mx-2" />
                  <div className="flex items-center gap-3">
                    <a href={portfolioData.contact.find(c => c.label === 'GitHub')?.href} target="_blank" className="text-slate-500 hover:text-white transition-colors">
                      <Github size={14} />
                    </a>
                    <a href={portfolioData.contact.find(c => c.label === 'LinkedIn')?.href} target="_blank" className="text-slate-500 hover:text-white transition-colors">
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </nav>

              <div className="flex-grow lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-end">
                <div className="flex flex-col lg:pb-20">
                  <div className="hero-headline-block">
                    {/* Title Area - Shared but responsive */}
                    <div className="min-w-0">
                      <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.08 }}
                        className="hero-editorial-title text-center lg:text-left"
                      >
                        <span className="block tracking-tight">{portfolioData.identity.name}</span>
                        <span className="hero-editorial-subline flex flex-col lg:flex-row lg:items-center gap-2">
                          <span className="text-white">Full Stack Developer</span>
                          <span className="hidden lg:block h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span className="text-amber-500/80">AI Enthusiast</span>
                        </span>
                      </motion.h1>
                    </div>

                    {/* Mobile Only: Large Photo in center */}
                    <div className="lg:hidden my-8 flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <HeroPhotoSection profileImage={profileImage} name={portfolioData.identity.name} />
                      </motion.div>
                    </div>

                    {/* Description Area */}
                    <div className="min-w-0">
                      <motion.p
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.16 }}
                        className="hero-editorial-lead text-center lg:text-left"
                      >
                        I design and build intelligent digital products with strong backend systems.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.24 }}
                        className="hero-editorial-copy text-center lg:text-left"
                      >
                        {portfolioData.identity.summary}
                      </motion.p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.32 }}
                    className="hero-editorial-actions flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 lg:mt-auto"
                  >
                    <ActionButton label="Explore Work" onClick={() => scrollToId('projects')} primary />
                    <ActionButton label="Contact Me" onClick={() => scrollToId('contact')} />
                    <a className="hero-button border border-white/5 bg-white/5 hover:bg-white/10" href={resumeFile} target="_blank" rel="noreferrer">
                      Resume
                      <Download size={16} />
                    </a>
                  </motion.div>
                </div>

                {/* Desktop Photo: Anchored to bottom on right */}
                <div className="hidden lg:block">
                  <HeroPhotoSection profileImage={profileImage} name={portfolioData.identity.name} />
                </div>
              </div>

              <div className="hero-foot-row">
                <div className="hero-foot-note">
                  <p className="font-heading text-[11px] uppercase tracking-[0.28em] text-stone-500 sm:text-xs">
                    Focus
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    Building product experiences where intelligence, system design, and frontend clarity work together.
                  </p>
                </div>

                <div className="hero-foot-stats">
                  {portfolioData.stats.map((stat) => (
                    <div key={stat.label} className="hero-stat-inline group">
                      <p className="text-xl font-light text-white sm:text-2xl">
                        {stat.value.replace('+', '')}
                        {stat.value.includes('+') && (
                          <span className="text-amber-500/80 font-normal ml-0.5 group-hover:text-amber-400 transition-colors">+</span>
                        )}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bio" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 blur-[80px]" />
              <SectionIntro
                eyebrow="Engineering Profile"
                title="Full Stack Engineer + AI Enthusiast"
                body={portfolioData.careerKnowledge.bio}
              />
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono italic">Background</p>
                  <p className="text-sm text-slate-300 font-medium">BCA Graduate</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono italic">Stack</p>
                  <p className="text-sm text-slate-300 font-medium">MERN + AI Systems</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Terminal Mockup for Engineering Artifact */}
              <div className="relative rounded-2xl border border-white/10 bg-[#05070a] shadow-2xl overflow-hidden group">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500/50 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500/50 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/50 transition-colors" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">profile.sh — 80x24</div>
                  <div className="w-8" />
                </div>
                <div className="p-6 font-mono text-xs sm:text-sm">
                  <div className="flex gap-3 mb-2">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~/ankit</span>
                    <span className="text-slate-500">cat skills.json</span>
                  </div>
                  <div className="pl-6 text-slate-300 space-y-1">
                    <p>{"{"}</p>
                    <p className="pl-4">"role": <span className="text-amber-300">"Full Stack Engineer"</span>,</p>
                    <p className="pl-4">"focus": <span className="text-amber-300">"AI + Scalable Systems"</span>,</p>
                    <p className="pl-4">"status": <span className="text-emerald-400">"building_production_apps"</span>,</p>
                    <p className="pl-4">"location": <span className="text-slate-400">"India"</span></p>
                    <p>{"}"}</p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-blue-400">~/ankit</span>
                    <span className="animate-pulse inline-block w-2 h-4 bg-amber-500/80 align-middle" />
                  </div>
                </div>
                
                {/* Decorative circuit lines overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>
              </div>

              {/* Float-over strategic focus card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-10 -right-4 sm:-right-10 w-64 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white">Strategic Intent</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  "I don't just write code; I design systems that solve human problems through intelligent automation."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="expertise" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10 bg-white/[0.01] rounded-[40px] border border-white/5">
          <SectionIntro
            eyebrow="Technical Expertise"
            title="Production engineering highlights."
            body="I specialize in building hardened systems that solve specific architectural and security challenges."
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.expertise.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-amber-500/20 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="p-3 rounded-xl bg-amber-500/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                    {i === 0 && <Layers size={20} />}
                    {i === 1 && <Lock size={20} />}
                    {i === 2 && <Database size={20} />}
                    {i === 3 && <BrainCircuit size={20} />}
                    {i === 4 && <Zap size={20} />}
                    {i === 5 && <Monitor size={20} />}
                  </div>
                  <div className="flex gap-1">
                    {[1,2].map(dot => <div key={dot} className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-amber-500/30 transition-colors" />)}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-amber-200 transition-colors relative z-10">{exp.title}</h4>
                <p className="text-xs leading-relaxed text-slate-500 mb-8 group-hover:text-slate-400 transition-colors relative z-10">{exp.description}</p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {exp.skills.map(s => (
                    <span key={s} className="text-[8px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5 text-slate-500 group-hover:text-amber-200/60 group-hover:border-amber-500/10 transition-all">{s}</span>
                  ))}
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-amber-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionIntro
              eyebrow="System Showcase"
              title="Project Infrastructure"
              body="High-precision builds focusing on AI integration, financial logic, and architectural reliability."
            />
          </div>
          
          {/* Projects Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <ProjectShowcaseCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <SectionIntro
            eyebrow="Capabilities"
            title="Skills grouped as operating bands."
            body="These bands are meant to read like real delivery surfaces, not a scorecard. Hover any skill to see where it has been applied."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {capabilityBands.map((band, index) => (
              <SkillCard 
                key={band.title} 
                band={band} 
                index={index} 
              />
            ))}
          </div>
        </section>

        <section id="achievements" ref={achievementsRef} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-32 md:px-10 overflow-hidden">
          <SectionIntro
            eyebrow="Chronicle"
            title="Professional Journey & Milestones"
            body="A timeline of growth, from BCA foundations to architecting production-grade AI systems."
          />

          <div className="relative mt-24">
            <div className="absolute left-[16px] top-0 bottom-0 w-px bg-white/5 sm:left-[20px] md:left-1/2 md:-translate-x-1/2">
              <motion.div 
                style={{ scaleY: pathLength, originY: 0 }}
                className="h-full w-full bg-gradient-to-b from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
            </div>

            <div className="space-y-16 sm:space-y-32">
              {portfolioData.journey.map((item, index) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-[16px] sm:left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-amber-500 z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="absolute inset-0 rounded-full bg-amber-500 animate-pulse" 
                    />
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 pl-12 md:pl-0"
                  >
                    <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-3xl font-bold text-amber-500/20 font-mono mb-2 block">{item.year}</span>
                      <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-32">
            <h4 className="text-center text-[10px] uppercase tracking-[0.4em] text-slate-600 mb-16">Key Records & Awards</h4>
            <div className="space-y-16">
              {portfolioData.achievements.map((item, index) => (
                <AchievementNode 
                  key={item.id} 
                  item={item} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>

        <section id="github" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <div className="rounded-[40px] bg-gradient-to-br from-amber-500/10 to-transparent border border-white/5 p-8 sm:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionIntro
                  eyebrow="Open Source"
                  title="GitHub Engineering Pulse"
                  body="Continuous contribution to the developer ecosystem. My workflow is transparent and documented through commit history."
                />
                <div className="mt-10 flex flex-wrap gap-8">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">500+</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Contributions</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">40+</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Repositories</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">Top 5%</span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Active User</span>
                  </div>
                </div>
                <a 
                  href="https://github.com/ankit-tiwari-dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all"
                >
                  <Github size={16} /> Explore Repositories
                </a>
              </div>
              
              <div className="relative">
                {/* Visual Mock of GitHub Contribution Graph */}
                <div className="p-8 rounded-3xl bg-[#05070a] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <Activity size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-white font-bold block">Activity Heatmap</span>
                        <span className="text-[9px] text-slate-600 font-mono">ankit-tiwari-dev / engineering_pulse</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-white/10" />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 relative z-10">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.005, ease: "backOut" }}
                        className={`aspect-square rounded-[2px] transition-colors duration-500 ${
                          i % 7 === 0 ? 'bg-amber-500' : 
                          i % 3 === 0 ? 'bg-amber-500/60' : 
                          i % 5 === 0 ? 'bg-amber-500/20' : 'bg-white/5 group-hover:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-4 relative z-10">
                    {[
                      { label: 'Longest Streak', val: '45 Days' },
                      { label: 'PRs Merged', val: '120+' },
                      { label: 'Commit Frequency', val: 'High' }
                    ].map((stat, i) => (
                      <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                        <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                        <p className="text-xs text-white font-bold font-mono">{stat.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-white font-bold uppercase tracking-widest">System Status: Active</span>
                        <span className="text-[8px] text-slate-600 font-mono italic">Processing v2.0 updates...</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                      <BookOpen size={10} className="text-slate-500" />
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Documentation: 98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <SectionIntro
            eyebrow="Credentials"
            title="Professional Certifications"
            body="Validated expertise across cloud systems, algorithmic logic, and language proficiency."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-3">
            {portfolioData.certifications.map((cert, index) => (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.01] p-5 transition-all duration-500 hover:border-amber-400/30 hover:bg-white/[0.03] sm:rounded-xl sm:p-8"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{cert.issuer}</p>
                    <div className="rounded-full bg-amber-500/10 p-2 text-amber-200 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowRight size={14} className="-rotate-45" />
                    </div>
                  </div>
                  
                  <h3 className="mt-6 font-heading text-lg font-medium leading-tight text-white group-hover:text-amber-200 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {cert.details}
                  </p>
                  
                  <div className="mt-auto pt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    <span>{cert.date}</span>
                    <span className="font-medium text-amber-400/50">View Credential</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="why-me" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <SectionIntro
            eyebrow="Why Me"
            title="Clear reasons to bring me into product work."
            body="Concise, outcome-driven, and grounded in the kinds of systems I already build."
          />

          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2">
            {portfolioData.hireReasons.map((reason) => (
              <div key={reason.title} className="reason-card">
                <p className="font-heading text-lg font-medium tracking-[-0.03em] text-white sm:text-xl">{reason.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-400 sm:mt-3 sm:text-base sm:leading-8">{reason.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-32 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <SectionIntro
                eyebrow="Connectivity"
                title="Initiate professional sync."
                body="Direct endpoints for technical deep-dives, professional networking, and collaborative inquiries. My inbox is open for high-impact engineering roles."
              />
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <Map size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-1">Location</p>
                    <p className="text-white font-medium">Surat, Gujarat, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-1">Availability</p>
                    <p className="text-white font-medium">Immediate Start for Engineering Roles</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-16">
                {portfolioData.contact.slice(0, 4).map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors text-slate-400 hover:text-amber-400">
                    <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-12 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold ml-1">Identity</label>
                  <input type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold ml-1">Endpoint</label>
                  <input type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold ml-1">Payload</label>
                  <textarea rows={4} placeholder="Your message here..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-700 resize-none" />
                </div>
                <button type="submit" className="w-full py-5 bg-amber-500 text-black font-bold text-[11px] uppercase tracking-[0.4em] rounded-xl hover:bg-amber-400 transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3">
                  <Send size={14} /> Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <footer className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start">
              <p className="font-heading text-lg font-bold text-white mb-2 tracking-tight">ANKIT TIWARI</p>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-mono italic">Built with React + TypeScript + Framer Motion</p>
            </div>
            
            <div className="flex items-center gap-8">
              {['GitHub', 'LinkedIn', 'LeetCode'].map(label => (
                <a key={label} href="#" className="text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-amber-400 transition-colors">{label}</a>
              ))}
            </div>

            <div className="text-[10px] uppercase tracking-[0.3em] text-slate-700 font-mono">
              © {new Date().getFullYear()} INDIA_NODE_01
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <button
        className="floating-ai-trigger"
        onClick={() => setAskPanelOpen(true)}
        type="button"
      >
        <Sparkles size={16} className="text-amber-200" />
        Ask about me
      </button>

      <AnimatePresence>
        {projectExplain ? (
          <OverlayShell onClose={() => setProjectExplain(null)} title={projectExplain.title}>
            <div className="space-y-6">
              <p className="text-base leading-8 text-slate-300">{projectExplain.summary}</p>
              <div className="grid gap-4">
                {projectExplain.details.map((detail) => (
                  <div key={detail.label} className="rounded-xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{detail.label}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </OverlayShell>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {askPanelOpen ? (
          <OverlayShell onClose={() => setAskPanelOpen(false)} title="Ask about me" eyebrow="Intelligence Layer">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Full RAG-based AI integration is currently under development. For now, please select a predefined insight:
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                  {askSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="ask-suggestion-card text-left sm:text-center flex-1 min-w-[200px]"
                      onClick={() => handleSuggestionClick(suggestion)}
                      type="button"
                    >
                      <BrainCircuit size={16} className="text-amber-200 shrink-0" />
                      <span className="leading-snug mt-3">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="overlay-brief-card">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Agent Response</p>
                <p className="mt-3 font-heading text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">
                  {askPanelContent.title}
                </p>
                <div className="mt-5 space-y-4">
                  {askPanelContent.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      <p className="text-sm leading-7 text-slate-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Live GitHub Signal in AI Response */}
                {githubRepos.length > 0 && (
                  <div className="mt-10 border-t border-white/5 pt-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-slate-600 mb-4">Live GitHub Repository Stream</p>
                    <div className="space-y-3">
                      {githubRepos.map(repo => (
                        <div key={repo.id} className="flex items-center justify-between group/repo">
                          <div className="flex items-center gap-3">
                            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono text-slate-400 group-hover/repo:text-amber-200 transition-colors">{repo.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] text-slate-600">
                            <span>{repo.language || 'JS'}</span>
                            <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </OverlayShell>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  primary = false,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      className={primary ? 'hero-button hero-button-primary' : 'hero-button'}
      onClick={onClick}
      type="button"
    >
      {label}
      <ArrowRight size={16} />
    </button>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.34em] text-amber-200/70">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-2xl font-medium tracking-[-0.04em] text-white sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-8 md:text-lg">{body}</p>
    </div>
  );
}

function OverlayShell({
  children,
  eyebrow = 'Portfolio AI',
  onClose,
  title,
}: {
  children: ReactNode;
  eyebrow?: string;
  onClose: () => void;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070c]/88 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="overlay-shell w-full max-w-3xl p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-6 flex items-start justify-between gap-4 sticky top-0 bg-[#17130f] z-20 pb-3 border-b border-white/5 sm:mb-8 sm:gap-6 sm:pb-4">
          <div className="min-w-0">
            <p className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.34em] text-amber-200/70">{eyebrow}</p>
            <h3 className="mt-2 font-heading text-xl font-medium tracking-[-0.04em] text-white sm:mt-4 sm:text-2xl md:text-3xl truncate">{title}</h3>
          </div>
          <button
            className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-white/20 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function BackgroundScene({ isPaused }: { isPaused: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.6),transparent_50%),linear-gradient(180deg,#050505_0%,#080808_50%,#020408_100%)]" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      {!isPaused && (
        <>
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[12%] top-[12%] h-64 w-64 rounded-full bg-amber-300/10 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -36, 18, 0], y: [0, 24, -18, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-orange-300/8 blur-[140px]"
          />
        </>
      )}
    </div>
  );
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'reveal'>('idle');
  const [lineIndex, setLineIndex] = useState(0);

  const terminalLines = [
    '> Initializing system environment...',
    '> Loading project manifests...  ✓',
    '> Compiling skill nodes...  ✓',
    '> Establishing identity layer...  ✓',
    '> System ready.',
  ];

  useEffect(() => {
    if (phase !== 'reveal') return;
    if (lineIndex >= terminalLines.length) return;
    const t = setTimeout(() => setLineIndex(i => i + 1), 420);
    return () => clearTimeout(t);
  }, [phase, lineIndex, terminalLines.length]);

  const nameChars = 'ANKIT TIWARI'.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(24px)',
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#050709] overflow-hidden"
    >
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,158,11,0.07),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/10 tracking-[0.5em] uppercase">SYS · EXPLORER · V2</div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/10 tracking-[0.5em] uppercase">EST · 2024 · INDIA</div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' ? (
          /* ─── IDLE: Minimal pulse ─── */
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(12px)', transition: { duration: 0.5 } }}
            className="flex flex-col items-center gap-10"
          >
            <motion.button
              onClick={() => setPhase('reveal')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center justify-center w-28 h-28 group"
              aria-label="Enter portfolio"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-amber-500/10"
              />
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute inset-3 rounded-full bg-amber-500/15 border border-amber-500/20"
              />
              <div className="relative z-10 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:border-amber-500/60 transition-all duration-500">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.8)]" />
              </div>
            </motion.button>

            <motion.div
              className="flex flex-col items-center gap-3"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.6em] text-amber-200/50">Tap to Initialize</p>
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-amber-500/40"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ─── REVEAL: Full identity ─── */
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-4xl px-6 sm:px-10 flex flex-col items-center"
          >
            {/* Vertical line top */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 64, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-px bg-gradient-to-b from-transparent to-amber-500 mb-10"
            />

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm"
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-amber-400">Software Engineer · Full Stack · AI</p>
            </motion.div>

            {/* Main name — staggered characters */}
            <div className="flex flex-wrap justify-center gap-x-[0.06em] overflow-hidden mb-6">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-heading font-bold uppercase leading-none select-none
                    text-[10vw] sm:text-[7vw] md:text-[6vw] lg:text-[5rem]
                    ${char === ' ' ? 'w-[0.3em]' : ''}
                    ${i >= 6 ? 'text-amber-400' : 'text-white'}`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"
            />

            {/* Terminal block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-10 font-mono"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 text-[9px] text-slate-600 uppercase tracking-widest">portfolio.sh</span>
              </div>
              <div className="space-y-1.5 min-h-[80px]">
                {terminalLines.slice(0, lineIndex).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[10px] leading-relaxed ${
                      line.includes('✓') ? 'text-emerald-400/80' :
                      line.includes('ready') ? 'text-amber-400' :
                      'text-slate-500'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
                {lineIndex < terminalLines.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-3 bg-amber-400/70 align-middle"
                  />
                )}
              </div>
            </motion.div>

            {/* CTA — only appears after terminal completes */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: lineIndex >= terminalLines.length ? 1 : 0, y: lineIndex >= terminalLines.length ? 0 : 12 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(245,158,11,0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnter}
                className="group relative px-14 py-4 bg-amber-500 text-black font-bold text-[11px] uppercase tracking-[0.4em] rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_8px_32px_rgba(245,158,11,0.25)]"
              >
                Enter Portfolio
                <motion.span
                  className="ml-3 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* Social mini-links */}
              <div className="flex items-center gap-6">
                <a href="https://github.com/ankit-tiwari-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">
                  <Github size={12} /> GitHub
                </a>
                <div className="w-px h-3 bg-white/10" />
                <a href="https://linkedin.com/in/ankit-tiwari-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">
                  <Linkedin size={12} /> LinkedIn
                </a>
                <div className="w-px h-3 bg-white/10" />
                <a href="mailto:oliver827691@gmail.com" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">
                  <Mail size={12} /> Contact
                </a>
              </div>
            </motion.div>

            {/* Vertical line bottom */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 48, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="w-px bg-gradient-to-t from-transparent to-amber-500/40 mt-10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CustomCursor({ isHovering }: { isHovering: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-amber-200 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-amber-200/50 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          backgroundColor: isHovering ? 'rgba(252, 211, 77, 0.1)' : 'rgba(252, 211, 77, 0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

const thumbnailMap: Record<string, string> = {
  'careerpath_ai_thumbnail': cpDash,
  'cp_dash': cpDash,
  'cp_profile_dark': cpProfileDark,
  'cp_profile_light': cpProfileLight,
  'cp_roadmap': cpRoadmap,
  
  'safespend_thumbnail': ssInflow,
  'ss_inflow': ssInflow,
  'ss_targets': ssTargets,
  'ss_budgeting': ssBudgeting,
  'ss_analytics': ssAnalytics,
  'ss_transactions': ssTransactions,
  'ss_targets_dark': ssTargetsDark,

  'medicine_resale_thumbnail': medInventory,
  'med_ledger': medLedger,
  'med_users': medUsers,
  'med_cart': medCart,
  'med_orders': medOrders,
  'med_payment': medPayment,
  'med_inventory': medInventory,
  'med_admin': medAdmin,
  'email_scheduler_thumbnail': emailDash,
  'email_dash': emailDash,
  'email_history': emailHistory,
  'email_logs': emailLogs,
  'email_view': emailView,
  'email_summary': emailSummary,
  'system_explorer_thumbnail': portfolioHero
};

function ProjectCarousel({ 
  images, 
  title, 
  autoPlay = true,
  className = "" 
}: { 
  images: string[]; 
  title: string; 
  autoPlay?: boolean;
  className?: string;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered || !autoPlay) return;
    
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length, isHovered, autoPlay]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div 
      className={`relative overflow-hidden group/carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <img
            src={thumbnailMap[images[imgIndex]] || careerPathThumbnail}
            alt={`${title} - screenshot ${imgIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Overlays */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
        <button 
          onClick={handlePrev}
          className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-500 hover:text-black transition-all pointer-events-auto shadow-2xl"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={handleNext}
          className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-500 hover:text-black transition-all pointer-events-auto shadow-2xl"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === imgIndex ? 'bg-amber-500 w-6' : 'bg-white/20 w-2'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}


function FeaturedProjectCard({ project, index, onClick }: { project: ProjectRecord; index: number; onClick: () => void }) {
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.thumbnail || 'careerpath_ai_thumbnail'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onClick={onClick}
      className="group relative h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] cursor-pointer"
    >
      <ProjectCarousel 
        images={images} 
        title={project.title} 
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] uppercase tracking-widest font-bold rounded">Featured Build</span>
          <div className="h-px w-8 bg-white/20" />
        </div>
        <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter uppercase">{project.title}</h3>
        <p className="text-sm text-slate-300 max-w-md line-clamp-2 mb-6 font-light">{project.summary}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map(s => (
            <span key={s} className="text-[9px] text-slate-400 uppercase font-mono tracking-wider bg-white/5 px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectShowcaseCard({ project, index, onClick }: { project: ProjectRecord; index: number; onClick: () => void }) {
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.thumbnail || 'careerpath_ai_thumbnail'];
    
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] hover:border-amber-500/30 transition-all duration-500 cursor-pointer"
    >
      <ProjectCarousel 
        images={images} 
        title={project.title} 
        className="aspect-[16/10]" 
      />

      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[7px] uppercase tracking-widest font-bold rounded">Featured</span>
            )}
            <div className="flex gap-1.5">
              {project.category.slice(0, 2).map(c => (
                <span key={c} className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">{c}</span>
              ))}
            </div>
          </div>
          <span className="text-[8px] font-mono text-slate-600 tracking-tighter uppercase">{project.year}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">{project.title}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-6">{project.summary}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.slice(0, 3).map(s => (
            <span key={s} className="text-[8px] text-slate-400 border border-white/5 bg-white/[0.03] px-2 py-0.5 rounded lowercase font-mono">
              {s}
            </span>
          ))}
          {project.category.includes('AI/ML') && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[7px] uppercase tracking-widest font-bold rounded">
              <BrainCircuit size={8} /> AI Powered
            </span>
          )}
          {project.category.includes('Full Stack') && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[7px] uppercase tracking-widest font-bold rounded">
              <Zap size={8} /> Full Stack
            </span>
          )}
          {(project.id === 'safespend' || project.id === 'medaimart') && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[7px] uppercase tracking-widest font-bold rounded">
              <Lock size={8} /> Secure
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <button className="text-[9px] uppercase tracking-widest font-bold text-amber-500 hover:text-amber-400 transition-colors">Case Study</button>
            <div className="h-1 w-1 rounded-full bg-white/10" />
            <a href={project.links.github} target="_blank" onClick={(e) => e.stopPropagation()} className="text-[9px] uppercase tracking-widest font-bold text-slate-600 hover:text-white transition-colors flex items-center gap-1.5">
              <Github size={10} /> Repo
            </a>
            {project.links.live && (
              <>
                <div className="h-1 w-1 rounded-full bg-white/10" />
                <a href={project.links.live} target="_blank" onClick={(e) => e.stopPropagation()} className="text-[9px] uppercase tracking-widest font-bold text-slate-600 hover:text-white transition-colors flex items-center gap-1.5">
                  <Globe size={10} /> Live
                </a>
              </>
            )}
          </div>
          <ArrowRight size={14} className="text-slate-800 group-hover:text-amber-500 transition-all duration-500 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyModal({ project, onClose }: { project: ProjectRecord; onClose: () => void }) {
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.thumbnail || 'careerpath_ai_thumbnail'];

  return (
    <OverlayShell onClose={onClose} title={project.title} eyebrow="System Deep Dive">
      <div className="space-y-12">
        <ProjectCarousel 
          images={images} 
          title={project.title} 
          className="aspect-video rounded-2xl border border-white/10 shadow-2xl" 
        />

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">Problem & Solution</h4>
              <p className="text-lg text-white leading-relaxed font-light">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-[9px] uppercase tracking-widest text-slate-500 mb-4 font-mono">Key Features</h5>
                <ul className="space-y-3">
                  {project.features.map(f => (
                    <li key={f} className="text-xs text-slate-300 flex items-start gap-2">
                      <div className="h-1 w-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-[9px] uppercase tracking-widest text-slate-500 mb-4 font-mono">Outcomes</h5>
                <ul className="space-y-3">
                  {project.highlights.map(h => (
                    <li key={h} className="text-xs text-slate-300 flex items-start gap-2">
                      <div className="h-1 w-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.deep_specs?.challenges_solved && (
              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Engineering Challenges</h4>
                <div className="space-y-4">
                  {project.deep_specs.challenges_solved.map((c, i) => (
                    <div key={i} className="p-4 rounded-lg border border-amber-500/10 bg-amber-500/5 flex gap-4">
                      <span className="text-amber-500 font-mono text-xs">0{i+1}</span>
                      <p className="text-xs text-slate-400 italic leading-relaxed">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white font-mono">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">System Flow</h4>
              <div className="space-y-3">
                {project.flow.map((f, i) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-slate-600">{String(i+1).padStart(2, '0')}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              {project.links.live && (
                <a href={project.links.live} target="_blank" className="w-full py-4 bg-amber-500 text-black font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl text-center hover:bg-amber-400 transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" className="w-full py-4 border border-white/10 text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl text-center hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                  <Github size={14} /> Repository
                </a>
              )}
            </div>
          </div>
        </div>


      </div>
    </OverlayShell>
  );
}




function HeroPhotoSection({ profileImage, name }: { profileImage: string; name: string }) {
  return (
    <div className="group relative lg:max-w-[440px]">
      <div className="relative mx-auto flex items-center justify-center h-[380px] w-[250px] sm:h-[450px] sm:w-[300px] lg:h-[650px] lg:w-[420px]">
        
        {/* Engineering Grid Background - Very subtle */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="url(#smallGrid)"/>
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Photo Container - Clean Rectangle, Increased Height */}
        <div className="relative z-10 w-full h-full overflow-hidden bg-[#050505] transition-all duration-700 border border-white/5 group-hover:border-white/10">
          <img
            src={profileImage}
            alt={`${name} portrait`}
            className="h-full w-full object-cover grayscale brightness-[0.8] scale-[0.9] transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:brightness-100"
          />
          
          {/* Subtle Corner Accents - Minimal "Engineered" feel only on hover */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
}



function SkillCard({ band, index }: { band: any; index: number }) {
  const icons = [Code, Layout, BrainCircuit, Layers];
  const Icon = icons[index % icons.length];
  
  // Specific layouts for bento effect
  const cardClasses = [
    'lg:col-span-2 lg:row-span-1', // Programming
    'lg:col-span-2 lg:row-span-1', // Web
    'lg:col-span-2 lg:row-span-1', // AI
    'lg:col-span-2 lg:row-span-1', // Tools
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group ${cardClasses[index]}`}
    >
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-xl">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white tracking-tight">{band.title}</h3>
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-600 font-mono italic">Module_0{index + 1}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {band.skills.map((skill: any) => (
            <span key={skill.id} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-amber-200 hover:border-amber-500/30 transition-all cursor-default">
              {skill.name}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-slate-600 font-bold">Verification Status</span>
            <span className="text-[10px] text-emerald-500/80 font-mono">Live_Pulse_Active</span>
          </div>
          <div className="h-10 w-px bg-white/5" />
          <div className="flex flex-col items-end">
            <span className="text-[8px] uppercase tracking-widest text-slate-600 font-bold">Network Density</span>
            <span className="text-[10px] text-white font-mono">{band.skills.length} Nodes</span>
          </div>
        </div>
      </div>
      
      {/* Subtle glow background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

function AchievementNode({ item, index }: { item: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col items-start gap-6 sm:gap-8 md:gap-12 md:flex-row md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Node Dot */}
      <div className="absolute left-[8px] sm:left-[12px] md:left-1/2 md:-translate-x-1/2 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#020408] border border-white/10 z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
        />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`w-full md:w-[45%] pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}
      >
        <div className="achievement-log-card group">
          <div className={`flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-3 sm:gap-3 sm:text-[10px] sm:tracking-[0.3em] sm:mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-amber-500/60 font-mono">[ {item.type === 'award' ? 'RECOGNITION' : 'MILESTONE'} ]</span>
            <span>•</span>
            <span>{item.date}</span>
          </div>
          
          <h3 className="font-heading text-xl font-medium tracking-tight text-white group-hover:text-amber-200 transition-colors sm:text-2xl">
            {item.title}
          </h3>
          
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-slate-400">
            {item.organization}
          </p>
          
          <div className={`mt-4 p-3 rounded-md border border-white/5 bg-white/[0.02] text-xs leading-relaxed text-slate-400 group-hover:bg-white/[0.04] transition-all sm:mt-6 sm:p-4 sm:rounded-lg sm:text-sm ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
            {item.description}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-[9px] uppercase tracking-widest text-slate-600 sm:mt-4 sm:pt-4 sm:gap-3 sm:text-[10px]">
              <Sparkles size={12} className="text-amber-500/40" />
              <span>Outcome: {item.outcome}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invisible spacer for the other side of the zig-zag */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
}

export default App;
