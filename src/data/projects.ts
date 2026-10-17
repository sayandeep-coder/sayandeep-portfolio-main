import type { CaseStudy } from '../types/portfolio';

export const CASE_STUDIES: Record<string, CaseStudy> = {
  mads: {
    id: 'mads',
    n: '01',
    name: 'Mads',
    title: 'A Personal AI Operating System',
    cat: 'AI Systems',
    yr: '2026',
    rt: '12 min',
    group: 'sys',
    card: 'A project-aware AI Chief of Staff: one reasoning engine, modular tools, durable memory and human-approved learning.',
    lede: 'A project-aware AI Chief of Staff. One reasoning engine, modular tools, durable memory, and learning that never happens silently.',
    role: 'Design & implementation',
    status: 'Open source',
    repo: 'https://github.com/sayandeep-coder/mads',
    site: null,
    stack: ['Python', 'Gemini 2.5', 'MCP', 'Pydantic', 'SQLite', 'OAuth', 'Tool calling'],
    pages: [
      {
        k: 'two',
        l: 'Overview',
        h: 'An assistant that <mark>remembers the work</mark>.',
        p: [
          'Mads keeps track of your active project, tasks, earlier decisions, repository state, files and preferred workflows, and runs real tools from one conversational interface.',
          'The target experience is simple: say <strong>"Continue working on Mads"</strong> and get a useful next action.'
        ]
      },
      {
        k: 'two',
        l: 'The problem',
        h: 'Every context switch <mark>costs context</mark>.',
        p: [
          'Knowledge work is spread across GitHub, local files, Google Workspace, search, media, maps, terminals and several AI tools. Each switch costs time and context.',
          'Standard chat sessions make it worse: every one starts from zero.'
        ],
        chips: ['GitHub', 'Local files', 'Google Workspace', 'Search', 'Media', 'Maps', 'Terminal', 'AI chats']
      },
      {
        k: 'steps',
        l: 'Architecture',
        h: 'A single <mark>reasoning loop</mark>.',
        steps: [['User'], ['Gemini'], ['Reason'], ['Select'], ['Execute'], ['Respond']],
        p: [
          'No keyword routing and no multi-agent system. Gemini receives natural-language tool descriptions, selects the capabilities it needs, runs independent calls concurrently when suitable, and produces one response.',
          'An MCP manager maps each requested tool to a provider exposing the same small interface. Behind it can be a stdio MCP server, a REST API, SQLite or a native system command, and the reasoning layer cannot tell the difference.'
        ]
      },
      {
        k: 'chips',
        l: 'Providers',
        h: 'Thirteen providers, <mark>one contract</mark>.',
        chips: [
          'Filesystem', 'GitHub', 'Google Workspace', 'Spotify', 'YouTube', 'Maps',
          'Search', 'Memory', 'Planner', 'Adaptive Learning', 'Documents', 'System Tools', 'Project Awareness'
        ],
        p: ['New integrations implement the same contract without changing the engine. The repository counts 80+ tools across them.']
      },
      {
        k: 'cards',
        cols: 2,
        l: 'Context',
        h: 'Context first, <mark>before it answers</mark>.',
        items: [
          {
            t: 'Project awareness',
            d: 'On startup Mads searches upward from the working directory for a Git repo, package manifest or language config. Known workspaces activate automatically; new ones register with name and GitHub remote detected. Filesystem access, tasks, prompts, dashboard and planning are scoped to the active project, and switching rebuilds the tool session.'
          },
          {
            t: 'Advanced Planner',
            d: 'Project awareness, task management, a reusable prompt library and deterministic prioritisation. Tasks rank by overdue status, due date, priority and recency, and a next task is recommended without an extra model call. A live dashboard adds branch, recent commits, documents and progress.'
          }
        ]
      },
      {
        k: 'steps',
        l: 'Adaptive Intelligence',
        h: 'Learning that <mark>asks permission</mark>.',
        steps: [
          ['Extract', 'find and cluster durable signals'],
          ['Approve', 'candidates stay pending'],
          ['Remember', 'only approved knowledge']
        ],
        p: [
          'Imported history runs an incremental pipeline: read, deduplicate, gate, classify, compress, extract, score, enqueue. It surfaces durable preferences, decisions, workflows, constraints and identity facts without loading raw history into every session.',
          'A content ledger skips repeated imports, and atomic file writes prevent corruption from concurrent approvals.'
        ]
      },
      {
        k: 'cards',
        cols: 4,
        l: 'Principles',
        h: 'Four design <mark>principles</mark>.',
        items: [
          { n: '01', t: 'One Brain', d: 'A single Gemini session handles reasoning and tool choice.' },
          { n: '02', t: 'Modular Providers', d: 'New integrations implement the same contract without changing the engine.' },
          { n: '03', t: 'Context First', d: 'Workspace, repo, project records, tasks and relevant history are gathered before responding.' },
          { n: '04', t: 'Human Approval', d: 'Personalisation never happens silently.' }
        ]
      },
      {
        k: 'two',
        l: 'Safety',
        h: 'Safety is part of the <mark>tool contract</mark>.',
        list: [
          'Filesystem and document operations are limited to configured roots.',
          'Destructive system actions need a second, confirmed tool call.',
          'OAuth tokens are encrypted at rest.',
          'Imported conversations are discarded after candidate extraction.',
          'Controls live in the normal tool contract, not as special cases inside the agent loop, which keeps the system testable.'
        ]
      },
      {
        k: 'outcome',
        l: 'Outcome',
        h: 'From isolated chats to a <mark>persistent operating layer</mark>.',
        p: 'Mads combines project context, planning, memory, adaptive learning and many tool integrations behind one interface.',
        stats: [
          ['80+', 'Tools behind one provider interface'],
          ['4', 'Client surfaces: CLI, web, browser, Excel'],
          ['0', 'Keyword routers or hardcoded intents']
        ]
      }
    ]
  },

  agentforge: {
    id: 'agentforge',
    n: '02',
    name: 'AgentForge',
    title: 'Infrastructure for Autonomous AI',
    cat: 'AI Infrastructure',
    yr: '2026',
    rt: '11 min',
    group: 'sys',
    card: 'A cloud-native Go runtime for durable agent execution, workflow orchestration, scheduling, tools, memory and observable workers.',
    lede: 'The infrastructure layer for autonomous AI: a backend execution system, not a chatbot and not a prompting framework.',
    role: 'Architecture & implementation',
    status: 'Open source · Go',
    repo: 'https://github.com/sayandeep-coder/agentforge',
    site: null,
    stack: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Redis', 'Clean Architecture', 'DDD'],
    pages: [
      {
        k: 'two',
        l: 'Overview',
        h: 'A runtime for <mark>production agent workloads</mark>.',
        p: [
          'AgentForge is a cloud-native runtime for defining, executing, orchestrating, observing and scheduling agents.',
          'Product teams define agents, tools and workflow behaviour. AgentForge handles persistence, dispatch, scheduling, worker execution and operational state.'
        ]
      },
      {
        k: 'two',
        l: 'The problem',
        h: 'Teams keep <mark>rebuilding the same runtime</mark>.',
        p: [
          'Execution loops, task queues, worker management, scheduling, memory, tool integration, retries and long-running operations get rebuilt for every agent product.',
          'The goal: modularity, high-concurrency execution, an extensible tool ecosystem, long-running task support, workflow orchestration and clean domain boundaries.'
        ]
      },
      {
        k: 'chips',
        l: 'Modules',
        h: 'Eight platform <mark>modules</mark>.',
        chips: ['Agent Runtime', 'Workflow Engine', 'Task Queue', 'Worker Pool', 'Scheduler', 'Tool Registry', 'Memory Layer', 'LLM Ports'],
        p: ['Each sits behind interfaces, so the pieces evolve independently.']
      },
      {
        k: 'steps',
        l: 'Request lifecycle',
        h: 'Accept fast. <mark>Execute elsewhere.</mark>',
        steps: [['Client'], ['REST API'], ['Service'], ['Queue'], ['Worker'], ['LLM / Tools'], ['PostgreSQL']],
        p: [
          'HTTP accepts the work and returns quickly. Workers run the slow, failure-prone execution. Cron schedules can also create work independently of any client.'
        ]
      },
      {
        k: 'cards',
        cols: 3,
        l: 'Architecture',
        h: 'Clean Architecture, <mark>three layers</mark>.',
        items: [
          { n: 'DOMAIN', t: 'The rules', d: 'Agents, workflows, tasks, schedules and execution rules.' },
          { n: 'APPLICATION', t: 'The use cases', d: 'Services, validation and orchestration.' },
          { n: 'INFRASTRUCTURE', t: 'The adapters', d: 'HTTP, databases, queues, providers and deployment.' }
        ],
        note: 'Domain and application code do not depend on Gin, GORM, PostgreSQL, Redis or any model vendor.'
      },
      {
        k: 'cards',
        cols: 2,
        l: 'Decisions',
        h: 'Four technical <mark>decisions</mark>.',
        items: [
          { n: '01', t: 'Go for the execution plane', d: 'Goroutines, low overhead and predictable deployment suit a high-concurrency worker runtime.' },
          { n: '02', t: 'PostgreSQL as system of record', d: 'Durable state lives in one place that workers and clients agree on.' },
          { n: '03', t: 'Queues behind interfaces', d: 'Redis today, another broker later, without touching the domain.' },
          { n: '04', t: 'Ports for everything volatile', d: 'LLM vendors, tools, repositories, queues and memory stores all sit behind ports.' }
        ]
      },
      {
        k: 'list',
        l: 'Trade-offs',
        h: 'Honest <mark>trade-offs</mark>.',
        list: [
          'Support ordered steps and retries now, while leaving room for branching and parallelism.',
          'Build real production boundaries without prematurely implementing a distributed control plane.',
          'Treat stable interfaces as migration seams, so a later version can replace an implementation without a rewrite.'
        ]
      },
      {
        k: 'ticks',
        l: 'Today',
        h: 'What <mark>exists today</mark>.',
        items: [
          'Typed configuration and structured logging',
          'PostgreSQL / GORM access and migrations',
          'Repositories and services',
          'Execution queue and worker runtime',
          'Tool and LLM ports',
          'Cron-based scheduling',
          'Middleware and versioned REST endpoints',
          'Liveness and readiness checks',
          'Correlated logs',
          'Graceful shutdown and durable state'
        ]
      },
      {
        k: 'two',
        l: 'Roadmap',
        h: 'Where it is <mark>heading</mark>.',
        chips: [
          'Distributed worker clusters', 'Kubernetes-native deployment', 'Event-driven execution',
          'Multi-agent collaboration', 'Vector memory', 'Human approval workflows',
          'Real-time observability', 'MCP-native tools', 'Enterprise authentication', 'Plugin marketplace'
        ],
        p: ['Natural fits: AI research agents, coding assistants, support agents, autonomous commerce, DevOps automation, enterprise copilots and business workflows.']
      },
      {
        k: 'outcome',
        l: 'Outcome',
        h: 'A reusable <mark>execution layer</mark>.',
        p: 'Teams build, deploy and operate autonomous workloads without rebuilding the runtime for each product.',
        stats: [
          ['1', 'Source of truth for state'],
          ['8', 'Platform modules'],
          ['10', 'Roadmap items']
        ]
      }
    ]
  },

  vero: {
    id: 'vero',
    n: '03',
    name: 'VERO2026',
    title: 'AI-Native UPI Sandbox Platform',
    cat: 'Fintech',
    yr: '2026',
    rt: '11 min',
    group: 'sys',
    card: 'A sandbox UPI network with virtual accounts, double-entry ledger accounting, event-driven services and AI financial intelligence.',
    lede: 'Rethinking UPI for the age of artificial intelligence: payments that produce understanding, not just records.',
    role: 'Architecture & implementation',
    status: 'Foundation built',
    repo: 'https://github.com/sayandeep-coder/intelligent-payments',
    site: null,
    stack: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Turborepo'],
    pages: [
      {
        k: 'two',
        l: 'Introduction',
        h: 'Frictionless, but <mark>not yet intelligent</mark>.',
        p: [
          'India\'s digital payments have become nearly frictionless. Payment experiences have not become intelligent.',
          'Most financial products optimise for transactions rather than understanding. Users can see <strong>what</strong> happened but not <strong>why</strong>.'
        ]
      },
      {
        k: 'two',
        l: 'The gap',
        h: 'The <mark>financial awareness gap</mark>.',
        p: [
          'Many small daily transactions add up to spending patterns that users do not notice until the balance is lower than expected.',
          'The core question moves from "what happened?" to "what does it mean, and what should I do?"'
        ]
      },
      {
        k: 'steps',
        l: 'Evolution',
        h: 'Four generations of <mark>financial product</mark>.',
        steps: [
          ['Physical banking'],
          ['Internet banking'],
          ['Mobile payments', 'UPI'],
          ['Financial intelligence', 'VERO2026']
        ],
        p: [
          'The core hypothesis: financial data should produce financial intelligence. Transactions are signals to analyse, not just records to store.'
        ]
      },
      {
        k: 'steps',
        l: 'Context',
        h: 'A payment, <mark>understood</mark>.',
        steps: [
          ['₹399 payment', 'Netflix'],
          ['Subscription', 'category'],
          ['Recurring', 'pattern'],
          ['Annual cost', 'projection']
        ],
        p: [
          'Traditional payment systems see transactions. VERO2026 sees context: the same ₹399 becomes a category, a recurrence and a yearly cost the user can act on.'
        ]
      },
      {
        k: 'stats',
        l: 'Example',
        h: 'Thirty days, <mark>one profile</mark>.',
        p: 'Eleven transactions over 30 days are grouped into a behavioural profile. Trends such as rising food delivery spend and accumulating subscriptions surface on their own.',
        stats: [
          ['11', 'Transactions analysed'],
          ['6', 'Behavioural categories'],
          ['₹25,700', 'Total in the illustration']
        ]
      },
      {
        k: 'list',
        l: 'Decisions',
        h: 'From transactions to <mark>decisions</mark>.',
        list: [
          'Forecast month-end balances.',
          'Flag categories that are growing.',
          'Identify subscriptions worth cancelling.',
          'Assess whether a savings goal is feasible.'
        ]
      },
      {
        k: 'two',
        l: 'Trust',
        h: 'Trust through <mark>transparency</mark>.',
        p: [
          'Insights must be explainable, traceable and tied to observable behaviour. Users stay in control.',
          'The AI learns from transaction history, merchant interactions, category trends, payment frequency, goal progress, spending behaviour and income patterns, and shows its reasoning.'
        ]
      },
      {
        k: 'chips',
        l: 'Foundation',
        h: 'Ten services, <mark>eleven shared packages</mark>.',
        chips: [
          'api-gateway', 'auth', 'user', 'bank', 'ledger', 'payment',
          'transaction', 'analytics', 'notification', 'ai-service'
        ],
        p: [
          'Every service uses the same four layers: api, application, domain, infrastructure. Shared packages cover auth, config, database, errors, events, HTTP, logger, RabbitMQ, Redis, types and validation. The Neon schema pre-exists, so the repo holds Prisma models and query layers only.'
        ]
      },
      {
        k: 'outcome',
        l: 'Status',
        h: 'A financial copilot, <mark>built layer by layer</mark>.',
        p: 'The public repository currently implements the identity slice end to end: sessions, token refresh, logout and profile read, on top of a shared HTTP bootstrap with health checks, request IDs and an error envelope. Ledger and payment logic are not yet part of it.',
        stats: [
          ['10', 'Services behind a gateway'],
          ['11', 'Shared packages'],
          ['4', 'Layers per service']
        ]
      }
    ]
  },

  dsa: {
    id: 'dsa',
    n: '04',
    name: 'Beyond LeetCode',
    title: 'A pattern-first DSA repository',
    cat: 'Algorithms',
    yr: 'Repository',
    rt: '8 min',
    group: 'sys',
    card: 'A structured, pattern-first approach to data structures and algorithms: understanding, intuition and trade-offs over memorisation.',
    lede: 'Fifty carefully chosen problems in C++, organised by pattern, built for understanding rather than acceptance.',
    role: 'Author',
    status: 'Open source · C++17',
    repo: 'https://github.com/sayandeep-coder/DSA',
    site: null,
    stack: ['C++17', 'STL', 'Patterns', 'Complexity analysis'],
    pages: [
      {
        k: 'two',
        l: 'The problem',
        h: 'Solve, accept, move on. <mark>Learn nothing.</mark>',
        p: [
          'Most DSA repositories hold many solutions, minimal explanation, little on why a solution works and little on recognising patterns.',
          'The usual loop can feel like progress without building intuition.'
        ]
      },
      {
        k: 'two',
        l: 'Design',
        h: 'Ask <mark>which pattern applies</mark>.',
        p: [
          'Problems are grouped by primary technique, so the guiding question becomes "which pattern applies here?" rather than "have I seen this exact question?"',
          'Fifty high-leverage problems, because many problems are variations of a small set of core patterns.'
        ]
      },
      {
        k: 'cards',
        cols: 3,
        l: 'Examples',
        h: 'Why <mark>fifty</mark> is enough.',
        items: [
          { t: 'Two Sum', d: 'Hash maps, lookup optimisation, time-space trade-offs.' },
          { t: 'Longest Substring Without Repeating Characters', d: 'Sliding window, dynamic expansion, frequency tracking.' },
          { t: 'Course Schedule', d: 'Graph traversal, cycle detection, topological sorting.' }
        ]
      },
      {
        k: 'two',
        l: 'Architecture',
        h: 'One template, <mark>every solution</mark>.',
        chips: ['Arrays', 'Sliding_Window', 'Two_Pointers', 'Stack', 'Binary_Search', 'Linked_List', 'Trees', 'Graphs', 'Dynamic_Programming', 'Advanced'],
        p: ['Each file follows the same template: problem statement, difficulty, pattern, intuition, approach, complexity analysis, implementation and example execution. Modern C++17 for performance and expressive STL containers.']
      },
      {
        k: 'cards',
        cols: 3,
        l: 'Patterns',
        h: 'Five core <mark>pattern groups</mark>.',
        items: [
          { t: 'Arrays & Hashing', d: 'Two Sum, Contains Duplicate, Product of Array Except Self.' },
          { t: 'Sliding Window', d: 'Minimum Window Substring, Longest Substring Without Repeating Characters.' },
          { t: 'Trees', d: 'Validate BST, Maximum Depth, Level Order Traversal.' },
          { t: 'Graphs', d: 'Number of Islands, Course Schedule, Clone Graph.' },
          { t: 'Dynamic Programming', d: 'Coin Change, House Robber, Longest Increasing Subsequence.' }
        ]
      },
      {
        k: 'outcome',
        l: 'Lessons',
        h: 'Learn <mark>how to think</mark>.',
        p: 'Success is identifying patterns quickly, understanding trade-offs, building solutions step by step and explaining the reasoning clearly, not maximising problem count.',
        stats: [
          ['50', 'Problems, chosen for leverage'],
          ['10', 'Pattern folders'],
          ['8', 'Fields in every solution']
        ]
      }
    ]
  },

  agents: {
    id: 'agents',
    n: '05',
    name: 'Designing AI Agents',
    title: 'Beyond Prompts and Chat Interfaces',
    cat: 'AI Systems',
    yr: 'Field notes',
    rt: '12 min',
    group: 'wr',
    card: 'A practical view of agent boundaries, planning loops, memory and evaluation in production.',
    lede: 'A chatbot produces information. An agent produces outcomes. The difference is architecture, not prompting.',
    role: 'Author',
    status: 'Field notes',
    repo: null,
    site: null,
    stack: ['Agents', 'Planning', 'Memory', 'Validation', 'Observability'],
    pages: [
      {
        k: 'two',
        l: 'Thesis',
        h: 'A chatbot informs. An agent <mark>delivers</mark>.',
        p: [
          'Many AI products fail because they treat an agent as a chatbot with a text box.',
          'A user who wants the cheapest basket of milk, bread, eggs and coffee does not need recommendations or a comparison table. They need <strong>a finished basket</strong>.'
        ]
      },
      {
        k: 'two',
        l: 'Execution gap',
        h: 'Understanding is not <mark>finishing</mark>.',
        p: [
          'Many systems understand intent and never complete the task. Models reason well but need external systems to act.'
        ],
        chips: ['Inventory', 'Databases', 'Search', 'Payments', 'Commerce APIs', 'Notifications']
      },
      {
        k: 'steps',
        l: 'Evolution',
        h: 'Three levels of <mark>AI systems</mark>.',
        steps: [
          ['Information retrieval', 'answers questions'],
          ['Assisted decisions', 'user still acts'],
          ['Autonomous execution', 'plan, act, recover, deliver']
        ],
        p: ['Level three: the user states a goal, and the agent plans, executes, observes, recovers from failures and delivers the result. Price comparison across grocery apps, building a basket, booking a hotel, generating a financial report.']
      },
      {
        k: 'cards',
        cols: 4,
        l: 'Anatomy',
        h: 'Anatomy of a <mark>production agent</mark>.',
        items: [
          { n: '01', t: 'Intent understanding', d: 'Ambiguous language into structured data.' },
          { n: '02', t: 'Planning layer', d: 'Goals into workflows.' },
          { n: '03', t: 'Tool layer', d: 'External services for facts and actions; tool selection is a core responsibility.' },
          { n: '04', t: 'Execution layer', d: 'Invoke tools, track state, manage retries and failures.' }
        ],
        note: 'Prompts shape communication. They cannot access databases, validate inventory, send payments, retry workflows or track state.'
      },
      {
        k: 'steps',
        l: 'Loop & memory',
        h: 'The <mark>planning loop</mark>.',
        steps: [['Observe'], ['Plan'], ['Execute'], ['Verify'], ['Refine']],
        p: ['Recovery from failure separates reliable agents from demos. Three kinds of memory support the loop: session memory (temporary context), user memory (long-term preferences) and operational memory (workflow history).']
      },
      {
        k: 'outcome',
        l: 'Lessons',
        h: 'Models give intelligence. <mark>Systems give reliability.</mark>',
        p: 'Model confidence does not guarantee correctness, so verify inventory, pricing, workflow completion, payment status and data consistency. The model is rarely the bottleneck.',
        stats: [
          ['3', 'Levels of AI systems'],
          ['5', 'Steps in the planning loop'],
          ['3', 'Kinds of memory']
        ]
      }
    ]
  },

  events: {
    id: 'events',
    n: '06',
    name: 'Event-Driven Architectures',
    title: 'Decoupled services, async workflows',
    cat: 'Distributed Systems',
    yr: 'Field notes',
    rt: '10 min',
    group: 'wr',
    card: 'A blueprint for decoupled services, async workflows and operational clarity across teams.',
    lede: 'Model systems around business events, facts that already happened, rather than service calls, requests for action.',
    role: 'Author',
    status: 'Field notes',
    repo: null,
    site: null,
    stack: ['Events', 'Message brokers', 'Idempotency', 'Replay', 'Observability'],
    pages: [
      {
        k: 'two',
        l: 'Thesis',
        h: 'Complexity shifts from features to <mark>coordination</mark>.',
        p: [
          'As systems scale, the challenge stops being how to build features and becomes how to coordinate growth.',
          'The core idea: model systems around <strong>business events</strong>, facts that have already happened, instead of service calls that request action.'
        ]
      },
      {
        k: 'two',
        l: 'The problem',
        h: 'One order, <mark>many synchronous dependencies</mark>.',
        p: [
          'A single order triggers payments, inventory, notifications and analytics. With direct calls, one failing service can block the whole workflow.'
        ]
      },
      {
        k: 'vs',
        l: 'Commands vs facts',
        h: 'A command couples. A fact <mark>liberates</mark>.',
        a: {
          s: 'Command',
          t: 'Charge this card',
          p: 'Creates coupling. The sender must know the receiver, wait for it, and handle its failure.'
        },
        b: {
          s: 'Fact',
          t: 'Order was placed',
          p: 'Published once. Every consumer reacts on its own terms, at its own pace.'
        }
      },
      {
        k: 'steps',
        l: 'Components',
        h: 'Producer, broker, <mark>consumers</mark>.',
        steps: [
          ['Producer', 'publishes facts'],
          ['Message broker', 'decouples'],
          ['Consumers', 'react independently']
        ],
        p: ['One event can drive many workflows, failures stay isolated, consumers scale separately, and retained events support replay and business-level observability.']
      },
      {
        k: 'cards',
        cols: 4,
        l: 'Pitfalls',
        h: 'Four ways it <mark>goes wrong</mark>.',
        items: [
          { n: '01', t: 'Too many events', d: 'Publishing everything creates noise nobody can follow.' },
          { n: '02', t: 'Commands as events', d: 'Naming an event like a command rebuilds the coupling.' },
          { n: '03', t: 'Non-idempotent consumers', d: 'Redelivery then double-processes work.' },
          { n: '04', t: 'No monitoring', d: 'Asynchronous failures stay invisible.' }
        ]
      },
      {
        k: 'outcome',
        l: 'Conclusion',
        h: 'Manage complexity, <mark>do not pretend it is gone</mark>.',
        p: 'Event boundaries let teams move faster with fewer direct dependencies. Systems that reflect business reality tend to scale better, across commerce, AI, logistics and inventory platforms.',
        stats: [
          ['1', 'Event, many workflows'],
          ['4', 'Common pitfalls to avoid'],
          ['∞', 'Replays from retained events']
        ]
      }
    ]
  },

  startup: {
    id: 'startup',
    n: '07',
    name: 'Building Startup Infrastructure',
    title: 'Scaling without slowing down',
    cat: 'Leadership',
    yr: 'Field notes',
    rt: '9 min',
    group: 'wr',
    card: 'Infrastructure decisions that keep early teams fast without creating avoidable future drag.',
    lede: 'Infrastructure should accelerate product development, not become the product. Progressive infrastructure grows with the business.',
    role: 'Author',
    status: 'Field notes',
    repo: null,
    site: null,
    stack: ['PostgreSQL', 'Redis', 'Queues', 'Observability', 'Domain separation'],
    pages: [
      {
        k: 'vs',
        l: 'The trap',
        h: 'Two ways to <mark>get infrastructure wrong</mark>.',
        a: {
          s: 'Over-engineering',
          t: 'Day one, 20 services',
          p: 'Kubernetes, a service mesh, event streaming, multi-region and 20 microservices before the first 100 users.'
        },
        b: {
          s: 'Under-investing',
          t: 'Frontend → Backend → DB',
          p: 'No monitoring, backups, queues or observability. Fast at first, fragile as soon as it matters.'
        },
        note: 'The answer is progressive infrastructure.'
      },
      {
        k: 'cards',
        cols: 3,
        l: 'Stages',
        h: 'Follow the <mark>business growth</mark>.',
        items: [
          { n: 'STAGE 1', t: 'Product validation', d: 'Client → Backend API → PostgreSQL → Object storage. Fast iteration, low cost, simple debugging, thousands of users. No premature microservices.' },
          { n: 'STAGE 2', t: 'Operational growth', d: 'Add Redis to cut latency, queues to move email, images and reports off the request path (API → Queue → Worker), and monitoring from the start.' },
          { n: 'STAGE 3', t: 'Scaling operations', d: 'Separate domains (Auth, User, Payment, Notification, Analytics) for ownership, then replace service calls with events such as Order Created.' }
        ]
      },
      {
        k: 'list',
        l: 'AI & automation',
        h: 'Infrastructure for <mark>AI and automation</mark> products.',
        list: [
          'AI: Client → API Gateway → AI Orchestrator → Vector search → LLM layer → Business services. The AI layer is a component of the platform, not the platform.',
          'Automation: API → Queue → Worker pool → Browser cluster → External platforms. The queue is the foundation of execution.'
        ]
      },
      {
        k: 'cards',
        cols: 3,
        l: 'Observability',
        h: 'Measure at <mark>three layers</mark>.',
        items: [
          { n: '01', t: 'Infrastructure', d: 'CPU, memory, network.' },
          { n: '02', t: 'Application', d: 'API latency, error rates, request volume.' },
          { n: '03', t: 'Business', d: 'Orders, revenue, conversion, retention. Often the most valuable signal.' }
        ],
        note: 'A system that reliably handles 10,000 requests is worth more than one theoretically capable of 10 million.'
      },
      {
        k: 'list',
        l: 'Mistakes & principles',
        h: 'Avoid the classics. <mark>Hold five principles.</mark>',
        list: [
          'Microservices too early. A monolith is often the right first step.',
          'Ignoring backups, monitoring and queues.',
          'Over-optimising without traffic.',
          'Principles: optimise for delivery, build incrementally, measure everything, automate repetitive work, prioritise reliability.'
        ]
      }
    ]
  }
};

export const CASE_ORDER = ['mads', 'agentforge', 'vero', 'dsa', 'agents', 'events', 'startup'];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_ORDER.map((id) => CASE_STUDIES[id]).filter(Boolean);
}

export function getSystemCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((c) => c.group === 'sys');
}

export function getWritingCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((c) => c.group === 'wr');
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES[id];
}

export function getNextCaseStudy(id: string): CaseStudy {
  const idx = CASE_ORDER.indexOf(id);
  const nextId = CASE_ORDER[(idx + 1) % CASE_ORDER.length];
  return CASE_STUDIES[nextId];
}
