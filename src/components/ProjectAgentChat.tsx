import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { Bot, Send, Sparkles, UserRound } from 'lucide-react';
import remarkGfm from 'remark-gfm';

const ReactMarkdown = lazy(() => import('react-markdown'));

const projectSkillFiles = import.meta.glob<string>(
  '../knowledge/project-skills/*.md',
  { eager: true, query: '?raw', import: 'default' },
);

type SkillSection = {
  title: string;
  content: string;
};

type ProjectAgent = {
  name: string;
  aliases: string[];
  document: string;
  sections: SkillSection[];
};

type ChatMessage = {
  id: string;
  role: 'assistant' | 'visitor';
  text: string;
  sources?: string[];
};

const ignoredTerms = new Set([
  'about', 'after', 'also', 'and', 'are', 'can', 'could', 'does', 'explain', 'for',
  'from', 'give', 'have', 'help', 'his', 'how', 'into', 'make', 'me', 'more', 'project',
  'projects', 'tell', 'that', 'the', 'their', 'them', 'there', 'this', 'what', 'when',
  'where', 'which', 'who', 'why', 'with', 'would', 'you', 'your', 'use', 'used', 'uses',
]);

const projectAgents: ProjectAgent[] = Object.values(projectSkillFiles).map((document) => {
  const name = document.match(/^#\s+(.+)$/m)?.[1] ?? 'Project agent';
  const headings = [...document.matchAll(/^##\s+(.+)$/gm)];
  const aliases: Record<string, string[]> = {
    'CareerPath AI': ['careerpath ai', 'career path ai'],
    SafeSpend: ['safespend', 'safe spend'],
    'Medicine Marketplace': ['medaimart', 'medicine marketplace', 'medicine resale platform'],
    'Bulk Email Scheduler': ['bulk email scheduler', 'email job scheduler', 'email scheduler'],
    'Modern Portfolio': ['modern portfolio', 'system explorer portfolio'],
  };

  return {
    name,
    aliases: aliases[name] ?? [name.toLowerCase()],
    document,
    sections: headings.map((heading, index) => {
      const start = (heading.index ?? 0) + heading[0].length;
      const end = headings[index + 1]?.index ?? document.length;

      return {
        title: heading[1].trim(),
        content: document.slice(start, end).trim(),
      };
    }),
  };
});

const exampleQuestions = [
  'How does CareerPath AI generate career roadmaps?',
  'Why did the email scheduler use BullMQ and Redis?',
  'How does the medicine marketplace verify listings?',
];

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/\bcareer path\b/g, 'careerpath')
    .replace(/\bmedaimart\b/g, 'medicine marketplace')
    .replace(/\b(bulk email|email job)\b/g, 'email scheduler')
    .match(/[a-z0-9+#.]+/g)
    ?.filter((term) => term.length > 1 && !ignoredTerms.has(term)) ?? [];

const scoreText = (terms: string[], text: string) => {
  const searchableText = ` ${tokenize(text).join(' ')} `;
  return terms.reduce((score, term) => score + (searchableText.includes(` ${term} `) ? 1 : 0), 0);
};

function getExplicitProjectAgents(question: string) {
  return projectAgents.filter((agent) =>
    agent.aliases.some((alias) => question.toLowerCase().includes(alias)),
  );
}

function findProjectAnswer(question: string) {
  const terms = [...new Set(tokenize(question))];
  const rankedAgents = projectAgents
    .map((agent) => ({
      agent,
      score: scoreText(terms, `${agent.name} ${agent.sections.map((section) => section.content).join(' ')}`),
    }))
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score);

  const explicitAgents = getExplicitProjectAgents(question);
  const candidates = explicitAgents.length > 0
    ? explicitAgents.map((agent) => ({ agent, score: 1 }))
    : rankedAgents;

  if (candidates.length === 0) {
    return {
      text: `I couldn't find that detail in the project skill files. Try asking about ${projectAgents.map((agent) => agent.name).join(', ')}.`,
      sources: [],
    };
  }

  const bestScore = candidates[0].score;
  const minimumScore = Math.max(1, Math.ceil(bestScore * 0.65));
  const relevantAgents = candidates.filter((result) => result.score >= minimumScore).slice(0, 2);
  const answers = relevantAgents.map(({ agent }) => {
    const relevantSections = agent.sections
      .map((section) => ({ section, score: scoreText(terms, `${section.title} ${section.content}`) }))
      .filter((result) => result.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 2);
    const selectedSections = relevantSections.length > 0
      ? relevantSections
      : agent.sections.slice(0, 1).map((section) => ({ section, score: 0 }));

    return {
      name: agent.name,
      text: selectedSections.map(({ section }) => `${section.title}\n${section.content}`).join('\n\n'),
    };
  });

  return {
    text: answers.map((answer) => `${answer.name}\n${answer.text}`).join('\n\n'),
    sources: answers.map((answer) => answer.name),
  };
}

const createMessage = (role: ChatMessage['role'], text: string, sources?: string[]): ChatMessage => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  text,
  sources,
});

export default function ProjectAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      'assistant',
      'Ask a technical question about a portfolio project. When configured, Groq reads the project skill files and generates a grounded answer. Matching source notes are available as a fallback.',
    ),
  ]);
  const [question, setQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const skillCount = projectAgents.reduce((count, agent) => count + agent.sections.length, 0);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const ask = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isSearching) return;

    setQuestion('');
    setIsSearching(true);
    setMessages((current) => [...current, createMessage('visitor', trimmedPrompt)]);
    const history = messages
      .filter((message) => message.role === 'visitor')
      .slice(-2)
      .map((message) => ({
        role: 'user' as const,
        content: message.text,
      }));
    const lastVisitorQuestion = history[history.length - 1]?.content ?? '';
    const retrievalQuestion = getExplicitProjectAgents(trimmedPrompt).length > 0
      ? trimmedPrompt
      : [lastVisitorQuestion, trimmedPrompt].filter(Boolean).join('\n');
    const retrieval = findProjectAnswer(retrievalQuestion);
    const relevantAgents = projectAgents.filter((agent) => retrieval.sources.includes(agent.name));
    const projectSkills = (relevantAgents.length > 0 ? relevantAgents : projectAgents)
      .map((agent) => agent.document)
      .join('\n\n---\n\n');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedPrompt, history, projectSkills }),
      });
      let result: { answer?: string; error?: string };
      try {
        result = await response.json() as { answer?: string; error?: string };
      } catch {
        throw new Error('The Groq endpoint is unavailable in this Vite session. Run with Vercel dev to use AI answers.');
      }

      if (!response.ok || !result.answer) {
        throw new Error(result.error || 'The AI project assistant is not available.');
      }

      setMessages((current) => [...current, createMessage('assistant', result.answer!, retrieval.sources)]);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'The AI project assistant is not available.';
      const fallback = retrieval.sources.length > 0
        ? `${reason}\n\nMatching notes from the project skill files (not an AI-generated answer):\n\n${retrieval.text}`
        : reason;
      setMessages((current) => [...current, createMessage('assistant', fallback, retrieval.sources)]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <section className="flex min-h-[55vh] flex-col gap-5" aria-label="Project agent chat">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Groq AI · grounded in project skills
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
          {projectAgents.length} agents · {skillCount} project skills
        </span>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Available project agents">
        {projectAgents.map((agent) => (
          <span key={agent.name} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400">
            {agent.name}
          </span>
        ))}
      </div>

      <div className="max-h-[42vh] min-h-52 flex-1 space-y-4 overflow-y-auto pr-1" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`flex gap-3 ${message.role === 'visitor' ? 'flex-row-reverse' : ''}`}>
            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${message.role === 'assistant' ? 'border-amber-200/20 bg-amber-200/10 text-amber-100' : 'border-white/10 bg-white/5 text-slate-300'}`}>
              {message.role === 'assistant' ? <Bot size={15} /> : <UserRound size={15} />}
            </span>
            <div className={`min-w-0 max-w-[88%] rounded-lg border px-4 py-3 ${message.role === 'assistant' ? 'border-white/10 bg-white/[0.035]' : 'border-amber-200/15 bg-amber-200/[0.06]'}`}>
              {message.role === 'assistant' ? (
                <div className="project-agent-markdown">
                  <Suspense fallback={<p className="text-sm text-slate-500">Formatting response...</p>}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                  </Suspense>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{message.text}</p>
              )}
              {message.sources && message.sources.length > 0 && (
                <p className="mt-3 border-t border-white/10 pt-2 text-[10px] uppercase tracking-[0.16em] text-amber-100/60">
                  Source: {message.sources.join(', ')} project skill
                </p>
              )}
            </div>
          </article>
        ))}
        {isSearching && <p className="pl-11 text-xs text-slate-500">Reading project skills and composing an answer...</p>}
        <div ref={conversationEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((example) => (
            <button
              key={example}
              className="rounded-md border border-white/10 px-3 py-2 text-left text-xs text-slate-400 transition hover:border-amber-200/30 hover:text-amber-100"
              onClick={() => ask(example)}
              type="button"
            >
              <Sparkles className="mr-1.5 inline-block" size={12} />
              {example}
            </button>
          ))}
        </div>
      )}

      <form className="flex items-end gap-2 border-t border-white/10 pt-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="project-agent-question">Ask about a project</label>
        <textarea
          id="project-agent-question"
          className="min-h-11 max-h-28 flex-1 resize-y rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-200/40"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about architecture, trade-offs, challenges..."
          rows={1}
          value={question}
        />
        <button
          aria-label="Send question"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-amber-200/30 bg-amber-200 text-stone-950 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!question.trim() || isSearching}
          type="submit"
        >
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}