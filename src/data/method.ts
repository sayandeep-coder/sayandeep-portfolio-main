import type { ArchitectureLayer, MethodRule } from '../types/portfolio';

export const METHOD_RULES: MethodRule[] = [
  {
    number: '01',
    title: 'Boundaries before frameworks',
    description: 'Domain and application logic never import the web framework, the ORM or the LLM vendor. Those are adapters at the edge, so they stay replaceable.',
    highlightLayers: ['app', 'domain', 'adapters'],
  },
  {
    number: '02',
    title: 'Durable state is the source of truth',
    description: 'PostgreSQL holds what happened. Redis and queues move work around, but losing a cache is never the same as losing the record.',
    highlightLayers: ['store'],
  },
  {
    number: '03',
    title: 'Separate accepting work from doing it',
    description: 'HTTP validates and persists. Queues and workers execute, scale, retry and shut down gracefully on their own terms.',
    highlightLayers: ['edge', 'exec'],
  },
  {
    number: '04',
    title: 'Observable by default',
    description: 'Request, worker, agent and task identifiers travel together. Typed errors, health and readiness exist before the first feature does.',
    highlightLayers: ['edge', 'app', 'domain', 'exec', 'adapters', 'store'],
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  { id: 'edge', title: 'Clients & API', subtitle: 'REST /v1 · validation', isExternal: true },
  { id: 'app', title: 'Application services', subtitle: 'use cases · transactions' },
  { id: 'domain', title: 'Domain', subtitle: 'entities · repository contracts' },
  { id: 'exec', title: 'Queue & workers', subtitle: 'claim · retry · schedule' },
  { id: 'adapters', title: 'Adapters', subtitle: 'LLM · tools · ORM · cache', isExternal: true },
  { id: 'store', title: 'PostgreSQL', subtitle: 'source of truth' },
];
