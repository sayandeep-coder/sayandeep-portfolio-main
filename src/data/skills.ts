import type { SkillCategory } from '../types/portfolio';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Backend & Systems',
    skills: [
      { name: 'Go', iconSlug: 'go' },
      { name: 'Node.js', iconSlug: 'nodedotjs' },
      { name: 'TypeScript', iconSlug: 'typescript' },
      { name: 'Python', iconSlug: 'python' },
      { name: 'FastAPI', iconSlug: 'fastapi' },
      { name: 'Express', iconSlug: 'express', iconColor: 'ffffff', invertOnLight: true },
      { name: 'NestJS', iconSlug: 'nestjs' },
      { name: 'Gin', iconSlug: 'gin' }
    ]
  },
  {
    category: 'AI & Agents',
    skills: [
      { name: 'LangChain', iconSlug: 'langchain', iconColor: 'ffffff', invertOnLight: true },
      { name: 'LangGraph', iconFallback: 'LG' },
      { name: 'Gemini', iconSlug: 'googlegemini' },
      { name: 'MCP', iconSlug: 'modelcontextprotocol', iconColor: 'ffffff', invertOnLight: true },
      { name: 'Hugging Face', iconSlug: 'huggingface' },
      { name: 'Pydantic', iconSlug: 'pydantic' },
      { name: 'RAG', iconFallback: 'RAG' },
      { name: 'Agentic AI', iconFallback: 'AI' }
    ]
  },
  {
    category: 'Data',
    skills: [
      { name: 'PostgreSQL', iconSlug: 'postgresql' },
      { name: 'Redis', iconSlug: 'redis' },
      { name: 'RabbitMQ', iconSlug: 'rabbitmq' },
      { name: 'MongoDB', iconSlug: 'mongodb' },
      { name: 'Firebase', iconSlug: 'firebase' },
      { name: 'Supabase', iconSlug: 'supabase' },
      { name: 'Prisma', iconSlug: 'prisma', iconColor: 'ffffff', invertOnLight: true },
      { name: 'SQLite', iconSlug: 'sqlite' }
    ]
  },
  {
    category: 'Cloud & Delivery',
    skills: [
      { name: 'AWS', iconSlug: 'amazonaws', iconColor: 'ff9900' },
      { name: 'Docker', iconSlug: 'docker' },
      { name: 'Kubernetes', iconSlug: 'kubernetes' },
      { name: 'Terraform', iconSlug: 'terraform' },
      { name: 'GitHub Actions', iconSlug: 'githubactions' },
      { name: 'Git', iconSlug: 'git' },
      { name: 'Turborepo', iconSlug: 'turborepo' }
    ]
  },
  {
    category: 'Clients & Automation',
    skills: [
      { name: 'Flutter', iconSlug: 'flutter' },
      { name: 'Dart', iconSlug: 'dart' },
      { name: 'React', iconSlug: 'react' },
      { name: 'Next.js', iconSlug: 'nextdotjs', iconColor: 'ffffff', invertOnLight: true },
      { name: 'Tailwind', iconSlug: 'tailwindcss' },
      { name: 'Playwright', iconSlug: 'playwright' },
      { name: 'Swift', iconSlug: 'swift' }
    ]
  },
  {
    category: 'Foundations',
    skills: [
      { name: 'C', iconSlug: 'c' },
      { name: 'C++', iconSlug: 'cplusplus' },
      { name: 'DSA', iconFallback: 'DS' },
      { name: 'Clean Arch.', iconFallback: 'CA' },
      { name: 'DDD', iconFallback: 'DDD' }
    ]
  }
];
