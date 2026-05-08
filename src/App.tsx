import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, BrainCircuit, Code, Download, FileText, Github, Globe, Layers, Layout, Linkedin, Mail, Monitor, Smartphone, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, type ReactNode, useState } from 'react';
import resumeFile from './assets/Ankittiwari_Resume.pdf';
import profileImage from './assets/Image.png';
import leetcodeIcon from './assets/icons8-leetcode-24.png';
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
                  <button className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider hover:text-amber-200 transition-colors" onClick={() => scrollToId('why-me')} type="button">
                    About
                  </button>
                  <a className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider hover:text-amber-200 transition-colors" href={resumeFile} target="_blank" rel="noreferrer">
                    Resume
                  </a>
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
                        <span className="block">{portfolioData.identity.name}</span>
                        <span className="hero-editorial-subline">Software Engineer</span>
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
                    className="hero-editorial-actions justify-center lg:justify-start mt-8 lg:mt-auto"
                  >
                    <ActionButton label="View Work" onClick={() => scrollToId('projects')} primary />
                    <a className="hero-button" href={resumeFile} target="_blank" rel="noreferrer">
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

        <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
          <SectionIntro
            eyebrow="Selected Work"
            title="Projects revealed one system at a time."
            body="Each project stays in focus as you move through the work. Open a card to inspect the build choices, then trigger the explainer when you want the distilled view."
          />

          <div className="mt-12 space-y-16 sm:mt-20 sm:space-y-32">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onExplain={() => setProjectExplain(explainProject(project))}
              />
            ))}
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
            title="Proof of delivery, recorded as nodes."
            body="Your career path isn't a straight line—it's a series of high-impact nodes. Scroll to trace the circuit of your professional achievements."
          />

          <div className="relative mt-24">
            {/* The Animated Circuit Trace */}
            <div className="absolute left-[16px] top-0 bottom-0 w-px bg-white/5 sm:left-[20px] md:left-1/2 md:-translate-x-1/2">
              <motion.div 
                style={{ scaleY: pathLength, originY: 0 }}
                className="h-full w-full bg-gradient-to-b from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
            </div>

            <div className="space-y-16 sm:space-y-32">
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

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-48 sm:pt-32 md:px-10">
          <SectionIntro
            eyebrow="Connectivity"
            title="Initiate professional sync."
            body="Direct endpoints for technical deep-dives, professional networking, and collaborative inquiries."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16">
            {/* CV Download Card */}
            <a 
              href={resumeFile} 
              target="_blank" 
              rel="noreferrer"
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-all hover:border-amber-400/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform duration-500">
                  <Download size={20} />
                </div>
                <ArrowRight size={18} className="-rotate-45 text-slate-700 group-hover:text-amber-400 transition-colors" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-medium text-white">Resume</h3>
              <p className="mt-2 text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest">Download Full CV</p>
            </a>

            {portfolioData.contact.map((item) => {
              const configMap: Record<string, { icon: any; color: string; bg: string; border: string }> = {
                'Resume': { icon: FileText, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/30' },
                'GitHub': { icon: Github, color: 'text-white', bg: 'bg-white/5', border: 'hover:border-white/30' },
                'LinkedIn': { icon: Linkedin, color: 'text-[#0077b5]', bg: 'bg-[#0077b5]/10', border: 'hover:border-[#0077b5]/30' },
                'LeetCode': { icon: LeetCodeLogo, color: 'text-[#ffa116]', bg: 'bg-[#ffa116]/10', border: 'hover:border-[#ffa116]/30' },
                'GeeksforGeeks': { icon: GFGLogo, color: 'text-[#2ec866]', bg: 'bg-[#2ec866]/10', border: 'hover:border-[#2ec866]/30' },
                'Email': { icon: Mail, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'hover:border-amber-400/30' }
              };
              
              const config = configMap[item.label] || { icon: Sparkles, color: 'text-slate-400', bg: 'bg-white/5', border: 'hover:border-white/20' };
              
              const Icon = config.icon;
              
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 transition-all ${config.border} hover:bg-white/[0.03]`}
                >
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${config.bg} ${config.color} group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={20} />
                    </div>
                    <ArrowRight size={18} className="-rotate-45 text-slate-800 group-hover:text-slate-400 transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-medium text-white group-hover:text-white transition-colors">{item.label}</h3>
                  <p className="mt-2 text-[10px] sm:text-xs text-slate-600 truncate">{item.value}</p>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <button
        className="floating-ai-trigger"
        onClick={() => setAskPanelOpen(true)}
        type="button"
      >
        <Bot size={16} className="text-amber-200" />
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
  const [isActivated, setIsActivated] = useState(false);
  
  const stats = [
    { label: "COGNITION", value: "98%" },
    { label: "SYSTEMS", value: "99%" },
    { label: "CRAFT", value: "95%" }
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.2,
        filter: "blur(20px)",
        transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020408] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff10 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <AnimatePresence>
        {!isActivated ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            className="relative flex flex-col items-center"
          >
            <motion.button
              onClick={() => setIsActivated(true)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative flex items-center justify-center w-24 h-24"
            >
              <div className="absolute inset-0 rounded-full border border-amber-500/20 group-hover:border-amber-500/50 transition-colors animate-ping" />
              <div className="absolute inset-2 rounded-full border border-amber-500/40 group-hover:border-amber-500/80 transition-colors" />
              <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,1)]" />
            </motion.button>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-[10px] uppercase tracking-[1em] text-amber-200/40 font-mono"
            >
              Initiate System
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center"
          >
            {/* Split Aperture Animation */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="overflow-hidden w-full flex flex-col items-center"
            >
              <div className="mb-2 w-px h-24 bg-gradient-to-t from-amber-500 to-transparent" />
              
              <motion.div
                initial={{ letterSpacing: "2em", opacity: 0, y: 20 }}
                animate={{ letterSpacing: "0.8em", opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="text-center"
              >
                <h1 className="font-heading text-4xl sm:text-7xl font-light text-white uppercase tracking-[1em]">
                  ANKIT <span className="text-amber-500">TIWARI</span>
                </h1>
                <p className="mt-6 text-xs text-slate-500 uppercase tracking-[1.5em] font-mono">Software Architect</p>
              </motion.div>

              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest mb-2 font-mono">{stat.label}</span>
                    <span className="text-2xl font-light text-amber-200 font-mono">{stat.value}</span>
                    <div className="mt-4 w-12 h-px bg-white/10" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-24"
              >
                <motion.button
                  whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEnter}
                  className="px-16 py-6 border border-white/10 rounded-full text-white text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-xl"
                >
                  Enter Environment
                </motion.button>
              </motion.div>

              <div className="mt-12 w-px h-24 bg-gradient-to-b from-amber-500 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full" 
        />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
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

function ProjectCard({ 
  project, 
  index, 
  onExplain 
}: { 
  project: ProjectRecord; 
  index: number; 
  onExplain: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <article
      ref={containerRef}
      data-project-section={project.id}
      className="relative min-h-[60vh] py-6 sm:min-h-[90vh] sm:py-12"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="project-shell group"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <div className="min-w-0 space-y-6 sm:space-y-10">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-px w-8 bg-white/10" />
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{project.year}</span>
            </div>
            
            <div>
              <p className="font-heading text-[11px] uppercase tracking-[0.3em] text-amber-200/60">
                {project.status}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-medium tracking-[-0.05em] text-white sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {project.title}
              </h2>
              <p className="mt-3 text-base font-light leading-relaxed text-slate-300 sm:mt-6 sm:text-xl">
                {project.impact}
              </p>
            </div>

            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm sm:rounded-xl sm:p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Architecture Summary</p>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                {project.summary}
              </p>
            </div>

            {/* Desktop Preview: Auto-loads when expanded */}
            <div className="hidden lg:block">
              <AnimatePresence>
                {isExpanded && project.links.live && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="pt-10"
                  >
                    <LiveViewport url={project.links.live} title={project.title} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="project-detail-shell min-w-0">
            <button
              className="flex w-full items-start justify-between gap-4 sm:gap-6 text-left"
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Core Strategy</p>
                <p className="mt-4 text-lg sm:text-xl font-medium leading-tight text-slate-200 break-words pr-2">{project.strapline}</p>
              </div>
              <div className={`mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
                <ArrowRight className="rotate-90" size={14} />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-6 border-t border-white/5 pt-6 sm:mt-10 sm:space-y-10 sm:pt-10">
                    <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
                      
                      {/* Top Row: Tags & Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Technology Stack</p>
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {project.stack.map((item) => (
                              <span key={item} className="chip">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Operational Flow</p>
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {project.flow.map((step) => (
                              <span key={step} className="flow-pill">
                                {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Key Achievements (Full Width) */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Key Achievements</p>
                        <div className="mt-4 space-y-4">
                          {project.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-start gap-3">
                              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber-400/50" />
                              <p className="text-sm leading-6 text-slate-400">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-white/5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                      {project.links.github && (
                        <a className="subtle-button" href={project.links.github} target="_blank" rel="noreferrer">
                          <Github size={16} />
                          Source
                        </a>
                      )}
                      {project.links.live && (
                        <a 
                          className="subtle-button accent" 
                          href={project.links.live} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <Globe size={16} />
                          Open Live Site
                        </a>
                      )}
                      <button
                        className="subtle-button accent"
                        onClick={onExplain}
                        type="button"
                      >
                        <Sparkles size={16} />
                        Explain Technicals
                      </button>
                    </div>

                    {/* Mobile Preview: Auto-loads when expanded */}
                    <AnimatePresence>
                      {isExpanded && project.links.live && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: 30 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: 30 }}
                          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                          className="pt-10 border-t border-white/5 mt-10 lg:hidden"
                        >
                          <div className="flex flex-col gap-4 mb-6">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/60 font-medium">Interactive System Preview</p>
                            <div className="h-px w-full bg-gradient-to-r from-amber-500/30 to-transparent" />
                          </div>
                          <LiveViewport url={project.links.live} title={project.title} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </article>
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

function LiveViewport({ url, title }: { url: string; title: string }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(true);

  return (
    <div className="viewport-shell mt-8">
      {/* Browser Bar */}
      <div className="viewport-bar">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        <div className="viewport-url group/url relative cursor-help">
          <Globe size={12} className="text-slate-500" />
          <span className="truncate text-[10px]">{url.replace(/^https?:\/\//, '')}</span>
          
          {/* Tooltip for blocked sites */}
          <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-lg border border-white/10 bg-black/90 p-2 text-[9px] leading-relaxed text-slate-400 backdrop-blur-md group-hover/url:block z-50">
            Some sites restrict embedding for security. Use the arrow icon to open directly.
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1 rounded-md transition ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1 rounded-md transition ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Smartphone size={14} />
          </button>
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="ml-1 flex items-center gap-2 rounded-md bg-amber-500/10 px-2 py-1 text-[10px] text-amber-200 hover:bg-amber-500/20 transition-all"
          >
            <span className="hidden sm:inline font-medium">Open Full</span>
            <ArrowRight size={14} className="-rotate-45" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className={`viewport-frame-container transition-all duration-500 ease-in-out ${device}`}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070b10] z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/20 border-t-amber-500" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-slate-500">Initializing Session</p>
          </div>
        )}
        
        <iframe
          src={url}
          title={`Preview of ${title}`}
          className="h-full w-full border-none bg-white rounded-b-xl origin-top"
          style={{ height: '100%', minHeight: '500px' }}
          onLoad={() => setLoading(false)}
        />
        
        {/* Overlay helper for potentially blocked sites */}
        {!loading && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/60 px-4 py-2 text-[9px] text-slate-400 backdrop-blur-md opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
            <span>External restricted? Use </span>
            <span className="text-amber-200">Open Full</span>
            <span> for secure access.</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between px-2 text-[10px] uppercase tracking-widest text-slate-600">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-green-500" />
          <p>System Connected</p>
        </div>
        <p>Virtual Environment</p>
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
      className={`bento-skill-card group ${cardClasses[index]}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-amber-200 group-hover:scale-110 group-hover:text-amber-300 transition-all duration-500">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-medium text-white">{band.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Module {index + 1}</p>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {band.skills.map((skill: any) => (
            <span key={skill.id} className="skill-chip">
              {skill.name}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600">
          <span>Validated Output</span>
          <span className="h-px flex-1 mx-4 bg-white/5" />
          <span>{band.skills.length} Nodes</span>
        </div>
      </div>
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
