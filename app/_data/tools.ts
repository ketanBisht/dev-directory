import type { CategoryId } from './categories';

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: CategoryId;
  tags: string[];
  avatar: string;      // single character shown in the avatar circle
  isNew?: boolean;
  isFeatured?: boolean;
}

export const tools: Tool[] = [
  // ─────────────────────────────────────────────
  // 🚀 Deployment
  // ─────────────────────────────────────────────
  {
    id: 'vercel',
    name: 'Vercel',
    description:
      'Deploy frontend apps instantly with zero config. Best-in-class DX for Next.js, React, and SvelteKit.',
    url: 'https://vercel.com',
    category: 'deployment',
    tags: ['frontend', 'nextjs', 'serverless', 'cdn'],
    avatar: 'V',
    isFeatured: true,
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description:
      'Build, deploy, and scale modern web projects with Git-based workflows and continuous deployment.',
    url: 'https://netlify.com',
    category: 'deployment',
    tags: ['frontend', 'jamstack', 'forms', 'edge-functions'],
    avatar: 'N',
  },
  {
    id: 'railway',
    name: 'Railway',
    description:
      'Deploy anything — databases, backends, cron jobs — with zero config. Ships in seconds.',
    url: 'https://railway.app',
    category: 'deployment',
    tags: ['backend', 'database', 'containers', 'devops'],
    avatar: 'R',
    isNew: true,
  },
  {
    id: 'fly-io',
    name: 'Fly.io',
    description:
      'Deploy full-stack apps and databases close to users globally on Fly Machines.',
    url: 'https://fly.io',
    category: 'deployment',
    tags: ['backend', 'global', 'containers', 'edge'],
    avatar: 'F',
  },
  {
    id: 'render',
    name: 'Render',
    description:
      'A unified cloud to build and run all your apps, websites, and services with free SSL.',
    url: 'https://render.com',
    category: 'deployment',
    tags: ['backend', 'frontend', 'postgres', 'workers'],
    avatar: 'R',
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    description:
      'JAMstack platform for deploying static sites and full-stack apps on the edge.',
    url: 'https://pages.cloudflare.com',
    category: 'deployment',
    tags: ['frontend', 'edge', 'cdn', 'jamstack'],
    avatar: 'C',
  },
  {
    id: 'aws-amplify',
    name: 'AWS Amplify',
    description:
      'Deploy full-stack web and mobile apps backed by AWS infrastructure in minutes.',
    url: 'https://aws.amazon.com/amplify',
    category: 'deployment',
    tags: ['aws', 'fullstack', 'mobile', 'auth'],
    avatar: 'A',
  },

  // ─────────────────────────────────────────────
  // 🎨 UI Libraries
  // ─────────────────────────────────────────────
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    description:
      'Beautifully designed, accessible components built with Radix UI and Tailwind CSS. Copy-paste ready.',
    url: 'https://ui.shadcn.com',
    category: 'ui-libraries',
    tags: ['react', 'tailwind', 'accessible', 'copy-paste'],
    avatar: 'S',
    isFeatured: true,
  },
  {
    id: 'radix-ui',
    name: 'Radix UI',
    description:
      'Accessible, unstyled component primitives for building high-quality design systems.',
    url: 'https://radix-ui.com',
    category: 'ui-libraries',
    tags: ['react', 'accessible', 'headless', 'primitives'],
    avatar: 'R',
  },
  {
    id: 'headless-ui',
    name: 'Headless UI',
    description:
      'Completely unstyled, fully accessible UI components from the Tailwind CSS team.',
    url: 'https://headlessui.com',
    category: 'ui-libraries',
    tags: ['react', 'vue', 'tailwind', 'accessible'],
    avatar: 'H',
  },
  {
    id: 'material-ui',
    name: 'MUI',
    description:
      'React components implementing Material Design. The world\'s most popular React UI library.',
    url: 'https://mui.com',
    category: 'ui-libraries',
    tags: ['react', 'material-design', 'components', 'typescript'],
    avatar: 'M',
  },
  {
    id: 'chakra-ui',
    name: 'Chakra UI',
    description:
      'Simple, modular, and accessible component library with a great theming system.',
    url: 'https://chakra-ui.com',
    category: 'ui-libraries',
    tags: ['react', 'accessible', 'theming', 'dark-mode'],
    avatar: 'C',
  },
  {
    id: 'daisyui',
    name: 'DaisyUI',
    description:
      'The most popular Tailwind CSS component library with 50+ themes and pure CSS classes.',
    url: 'https://daisyui.com',
    category: 'ui-libraries',
    tags: ['tailwind', 'themes', 'css', 'html'],
    avatar: 'D',
  },
  {
    id: 'mantine',
    name: 'Mantine',
    description:
      'Full-featured React component library with 100+ components and 50+ hooks.',
    url: 'https://mantine.dev',
    category: 'ui-libraries',
    tags: ['react', 'hooks', 'forms', 'charts'],
    avatar: 'M',
  },
  {
    id: 'ant-design',
    name: 'Ant Design',
    description:
      'Enterprise-level UI design language and React component library from Alibaba.',
    url: 'https://ant.design',
    category: 'ui-libraries',
    tags: ['react', 'enterprise', 'design-system', 'typescript'],
    avatar: 'A',
  },

  // ─────────────────────────────────────────────
  // 🤖 AI Tools
  // ─────────────────────────────────────────────
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description:
      'Your AI pair programmer. Get code suggestions as you type directly in your editor.',
    url: 'https://github.com/features/copilot',
    category: 'ai-tools',
    tags: ['editor', 'autocomplete', 'pair-programming', 'github'],
    avatar: 'G',
    isFeatured: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description:
      'AI-first code editor built for pair programming with AI. Fork of VS Code with superpowers.',
    url: 'https://cursor.sh',
    category: 'ai-tools',
    tags: ['editor', 'ide', 'coding-agent', 'vscode'],
    avatar: 'C',
    isNew: true,
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description:
      'Generate polished UI components from text prompts using shadcn/ui and Tailwind.',
    url: 'https://v0.dev',
    category: 'ai-tools',
    tags: ['ui-generation', 'react', 'vercel', 'shadcn'],
    avatar: 'V',
    isNew: true,
  },
  {
    id: 'bolt',
    name: 'Bolt',
    description:
      'Build and deploy full-stack web apps from a single prompt, entirely in the browser.',
    url: 'https://bolt.new',
    category: 'ai-tools',
    tags: ['fullstack', 'agent', 'deployment', 'browser-ide'],
    avatar: 'B',
    isNew: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description:
      'OpenAI\'s flagship AI for coding help, debugging, explaining concepts, and code review.',
    url: 'https://chatgpt.com',
    category: 'ai-tools',
    tags: ['chat', 'debugging', 'code-review', 'openai'],
    avatar: 'C',
  },
  {
    id: 'claude',
    name: 'Claude',
    description:
      'Anthropic\'s AI with best-in-class long context. Excellent for architecture and complex refactors.',
    url: 'https://claude.ai',
    category: 'ai-tools',
    tags: ['chat', 'long-context', 'code-review', 'anthropic'],
    avatar: 'C',
    isFeatured: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description:
      'Google\'s multimodal AI. Ask about code, images, and complex reasoning tasks.',
    url: 'https://gemini.google.com',
    category: 'ai-tools',
    tags: ['chat', 'multimodal', 'google', 'coding'],
    avatar: 'G',
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description:
      'Free AI code completion and chat for 70+ programming languages. Works in any editor.',
    url: 'https://codeium.com',
    category: 'ai-tools',
    tags: ['autocomplete', 'free', 'multi-language', 'editor'],
    avatar: 'C',
  },

  // ─────────────────────────────────────────────
  // 📚 Documentation
  // ─────────────────────────────────────────────
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    description:
      'The definitive reference for HTML, CSS, and Web APIs. Maintained by Mozilla and the community.',
    url: 'https://developer.mozilla.org',
    category: 'documentation',
    tags: ['html', 'css', 'javascript', 'web-standards', 'reference'],
    avatar: 'M',
    isFeatured: true,
  },
  {
    id: 'devdocs',
    name: 'DevDocs',
    description:
      'Fast, searchable, offline-ready documentation for hundreds of APIs in one place.',
    url: 'https://devdocs.io',
    category: 'documentation',
    tags: ['reference', 'offline', 'search', 'multi-language'],
    avatar: 'D',
  },
  {
    id: 'caniuse',
    name: 'Can I Use',
    description:
      'Browser support tables for HTML5, CSS3, and JavaScript features across all browsers.',
    url: 'https://caniuse.com',
    category: 'documentation',
    tags: ['browser-support', 'css', 'html', 'compatibility'],
    avatar: 'C',
  },
  {
    id: 'docusaurus',
    name: 'Docusaurus',
    description:
      'Build optimized, beautiful documentation websites using React and MDX.',
    url: 'https://docusaurus.io',
    category: 'documentation',
    tags: ['docs', 'mdx', 'react', 'static-site'],
    avatar: 'D',
  },
  {
    id: 'roadmapsh',
    name: 'roadmap.sh',
    description:
      'Community-driven developer roadmaps for frontend, backend, DevOps, and more.',
    url: 'https://roadmap.sh',
    category: 'documentation',
    tags: ['learning', 'roadmap', 'career', 'frontend', 'backend'],
    avatar: 'R',
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    description:
      'Free, self-paced coding curriculum with certifications and a huge developer community.',
    url: 'https://freecodecamp.org',
    category: 'documentation',
    tags: ['learning', 'free', 'curriculum', 'certification'],
    avatar: 'F',
  },
  {
    id: 'css-tricks',
    name: 'CSS-Tricks',
    description:
      'In-depth tips, tricks, and techniques for front-end web design and CSS.',
    url: 'https://css-tricks.com',
    category: 'documentation',
    tags: ['css', 'frontend', 'tips', 'reference'],
    avatar: 'C',
  },

  // ─────────────────────────────────────────────
  // 🔌 APIs & Services
  // ─────────────────────────────────────────────
  {
    id: 'supabase',
    name: 'Supabase',
    description:
      'Open-source Firebase alternative. PostgreSQL, Auth, Realtime, Storage, and Edge Functions.',
    url: 'https://supabase.com',
    category: 'apis-services',
    tags: ['database', 'auth', 'postgres', 'realtime', 'storage'],
    avatar: 'S',
    isFeatured: true,
  },
  {
    id: 'neon',
    name: 'Neon',
    description:
      'Serverless PostgreSQL with database branching, autoscaling, and instant DB copies.',
    url: 'https://neon.tech',
    category: 'apis-services',
    tags: ['database', 'postgres', 'serverless', 'branching'],
    avatar: 'N',
    isNew: true,
  },
  {
    id: 'upstash',
    name: 'Upstash',
    description:
      'Serverless Redis and Kafka with per-request pricing. Zero maintenance, instant scaling.',
    url: 'https://upstash.com',
    category: 'apis-services',
    tags: ['redis', 'kafka', 'serverless', 'caching', 'rate-limiting'],
    avatar: 'U',
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description:
      'Identity and authentication platform. SSO, MFA, social login, and enterprise connections.',
    url: 'https://auth0.com',
    category: 'apis-services',
    tags: ['auth', 'sso', 'identity', 'oauth', 'security'],
    avatar: 'A',
  },
  {
    id: 'clerk',
    name: 'Clerk',
    description:
      'Drop-in authentication and user management for Next.js and React. Beautiful UI included.',
    url: 'https://clerk.com',
    category: 'apis-services',
    tags: ['auth', 'nextjs', 'react', 'user-management'],
    avatar: 'C',
    isNew: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description:
      'The payments infrastructure for the internet. APIs, subscriptions, billing, and invoicing.',
    url: 'https://stripe.com',
    category: 'apis-services',
    tags: ['payments', 'billing', 'subscriptions', 'api'],
    avatar: 'S',
  },
  {
    id: 'resend',
    name: 'Resend',
    description:
      'Email API built for developers. Send transactional emails with React Email templates.',
    url: 'https://resend.com',
    category: 'apis-services',
    tags: ['email', 'transactional', 'api', 'react-email'],
    avatar: 'R',
    isNew: true,
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description:
      'Cloud communications APIs for SMS, voice, video, and WhatsApp messaging.',
    url: 'https://twilio.com',
    category: 'apis-services',
    tags: ['sms', 'voice', 'video', 'communications', 'api'],
    avatar: 'T',
  },

  // ─────────────────────────────────────────────
  // 🧪 Playgrounds
  // ─────────────────────────────────────────────
  {
    id: 'codesandbox',
    name: 'CodeSandbox',
    description:
      'Instant cloud development environments. Create, share, and collaborate on projects.',
    url: 'https://codesandbox.io',
    category: 'playgrounds',
    tags: ['cloud-ide', 'react', 'collaboration', 'devbox'],
    avatar: 'C',
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    description:
      'Instant full-stack web IDE running Node.js natively in the browser at native speed.',
    url: 'https://stackblitz.com',
    category: 'playgrounds',
    tags: ['browser-ide', 'nodejs', 'react', 'vite', 'fast'],
    avatar: 'S',
    isFeatured: true,
  },
  {
    id: 'codepen',
    name: 'CodePen',
    description:
      'Social front-end development playground for HTML, CSS, and JS experiments.',
    url: 'https://codepen.io',
    category: 'playgrounds',
    tags: ['frontend', 'html', 'css', 'javascript', 'social'],
    avatar: 'C',
  },
  {
    id: 'jsfiddle',
    name: 'JSFiddle',
    description:
      'Online JavaScript, HTML, and CSS code editor. Great for quick demos and bug repros.',
    url: 'https://jsfiddle.net',
    category: 'playgrounds',
    tags: ['javascript', 'html', 'css', 'quick-test'],
    avatar: 'J',
  },
  {
    id: 'replit',
    name: 'Replit',
    description:
      'Collaborative, browser-based IDE supporting 50+ languages with built-in hosting.',
    url: 'https://replit.com',
    category: 'playgrounds',
    tags: ['collaboration', 'multi-language', 'hosting', 'education'],
    avatar: 'R',
  },
  {
    id: 'ts-playground',
    name: 'TypeScript Playground',
    description:
      'Official TypeScript playground. Try TS features, share snippets, explore types.',
    url: 'https://www.typescriptlang.org/play',
    category: 'playgrounds',
    tags: ['typescript', 'official', 'compiler', 'types'],
    avatar: 'T',
  },
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description:
      'Collaborative virtual whiteboard for sketching architecture diagrams and wireframes.',
    url: 'https://excalidraw.com',
    category: 'playgrounds',
    tags: ['diagrams', 'whiteboard', 'architecture', 'collaboration'],
    avatar: 'E',
  },

  // ─────────────────────────────────────────────
  // 🎭 Design
  // ─────────────────────────────────────────────
  {
    id: 'figma',
    name: 'Figma',
    description:
      'The collaborative design tool used by top teams worldwide for UI, prototyping, and handoff.',
    url: 'https://figma.com',
    category: 'design',
    tags: ['design', 'prototyping', 'collaboration', 'ui'],
    avatar: 'F',
    isFeatured: true,
  },
  {
    id: 'framer',
    name: 'Framer',
    description:
      'Design and publish production-ready websites with components and animations.',
    url: 'https://framer.com',
    category: 'design',
    tags: ['design', 'website', 'animation', 'no-code'],
    avatar: 'F',
  },
  {
    id: 'coolors',
    name: 'Coolors',
    description:
      'The super fast color palette generator. Create, explore, save, and share beautiful palettes.',
    url: 'https://coolors.co',
    category: 'design',
    tags: ['colors', 'palette', 'generator', 'design'],
    avatar: 'C',
  },
  {
    id: 'google-fonts',
    name: 'Google Fonts',
    description:
      'Free, open-source fonts optimized for the web. Browse 1,500+ typefaces instantly.',
    url: 'https://fonts.google.com',
    category: 'design',
    tags: ['fonts', 'typography', 'free', 'web'],
    avatar: 'G',
  },
  {
    id: 'heroicons',
    name: 'Heroicons',
    description:
      'Beautiful hand-crafted SVG icons in outline and solid styles by the Tailwind CSS team.',
    url: 'https://heroicons.com',
    category: 'design',
    tags: ['icons', 'svg', 'tailwind', 'react'],
    avatar: 'H',
  },
  {
    id: 'lucide',
    name: 'Lucide Icons',
    description:
      'Beautiful and consistent open-source icon toolkit with 1,400+ icons for React and more.',
    url: 'https://lucide.dev',
    category: 'design',
    tags: ['icons', 'svg', 'react', 'open-source'],
    avatar: 'L',
  },
  {
    id: 'phosphor',
    name: 'Phosphor Icons',
    description:
      'Flexible icon family with 6 weights for interfaces, diagrams, and presentations.',
    url: 'https://phosphoricons.com',
    category: 'design',
    tags: ['icons', 'svg', 'react', 'flexible'],
    avatar: 'P',
  },
  {
    id: 'css-gradient',
    name: 'CSS Gradient',
    description:
      'Free, user-friendly CSS gradient generator tool with real-time preview.',
    url: 'https://cssgradient.io',
    category: 'design',
    tags: ['css', 'gradients', 'generator', 'free'],
    avatar: 'G',
  },

  // ─────────────────────────────────────────────
  // 🔧 Debugging
  // ─────────────────────────────────────────────
  {
    id: 'sentry',
    name: 'Sentry',
    description:
      'Application monitoring and error tracking. Catch, triage, and fix issues in real time.',
    url: 'https://sentry.io',
    category: 'debugging',
    tags: ['error-tracking', 'monitoring', 'performance', 'apm'],
    avatar: 'S',
    isFeatured: true,
  },
  {
    id: 'logrocket',
    name: 'LogRocket',
    description:
      'Frontend application monitoring with session replay, performance tracking, and AI insights.',
    url: 'https://logrocket.com',
    category: 'debugging',
    tags: ['session-replay', 'monitoring', 'frontend', 'ux'],
    avatar: 'L',
  },
  {
    id: 'postman',
    name: 'Postman',
    description:
      'API platform for building, testing, and documenting REST, GraphQL, and gRPC APIs.',
    url: 'https://postman.com',
    category: 'debugging',
    tags: ['api-testing', 'rest', 'graphql', 'documentation'],
    avatar: 'P',
  },
  {
    id: 'hoppscotch',
    name: 'Hoppscotch',
    description:
      'Open-source API development ecosystem. Lightweight, fast alternative to Postman.',
    url: 'https://hoppscotch.io',
    category: 'debugging',
    tags: ['api-testing', 'open-source', 'rest', 'websocket'],
    avatar: 'H',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description:
      'Format, validate, minify, and diff JSON data instantly in the browser.',
    url: 'https://jsonformatter.curiousconcept.com',
    category: 'debugging',
    tags: ['json', 'format', 'validate', 'utility'],
    avatar: 'J',
  },
  {
    id: 'browserstack',
    name: 'BrowserStack',
    description:
      'Cross-browser testing on 3,000+ real browsers and devices. Instant, no setup.',
    url: 'https://browserstack.com',
    category: 'debugging',
    tags: ['testing', 'cross-browser', 'devices', 'automation'],
    avatar: 'B',
  },
  {
    id: 'wappalyzer',
    name: 'Wappalyzer',
    description:
      'Identify technologies, frameworks, and libraries used on any website instantly.',
    url: 'https://wappalyzer.com',
    category: 'debugging',
    tags: ['analysis', 'tech-stack', 'browser-extension', 'spy'],
    avatar: 'W',
  },

  // ─────────────────────────────────────────────
  // 📦 Packages
  // ─────────────────────────────────────────────
  {
    id: 'npm',
    name: 'npm',
    description:
      'The world\'s largest software registry. Discover, share, and reuse JavaScript packages.',
    url: 'https://npmjs.com',
    category: 'packages',
    tags: ['registry', 'javascript', 'node', 'packages'],
    avatar: 'N',
    isFeatured: true,
  },
  {
    id: 'jsr',
    name: 'JSR',
    description:
      'Modern JavaScript/TypeScript registry from the Deno team. ESM-native, type-safe.',
    url: 'https://jsr.io',
    category: 'packages',
    tags: ['registry', 'typescript', 'deno', 'esm'],
    avatar: 'J',
    isNew: true,
  },
  {
    id: 'bundlephobia',
    name: 'Bundlephobia',
    description:
      'Find the cost of adding any npm package to your bundle. Size, composition, and tree-shaking.',
    url: 'https://bundlephobia.com',
    category: 'packages',
    tags: ['bundle-size', 'analysis', 'npm', 'performance'],
    avatar: 'B',
  },
  {
    id: 'pkg-size',
    name: 'pkg-size',
    description:
      'Visualize and analyze npm package sizes and their dependencies interactively.',
    url: 'https://pkg-size.dev',
    category: 'packages',
    tags: ['bundle-size', 'visualization', 'npm', 'performance'],
    avatar: 'P',
  },
  {
    id: 'snyk',
    name: 'Snyk',
    description:
      'Find and automatically fix security vulnerabilities in your code, containers, and dependencies.',
    url: 'https://snyk.io',
    category: 'packages',
    tags: ['security', 'vulnerabilities', 'devops', 'scanning'],
    avatar: 'S',
  },
  {
    id: 'socket-dev',
    name: 'Socket.dev',
    description:
      'Detect and block supply chain attacks in npm, PyPI, and Go packages proactively.',
    url: 'https://socket.dev',
    category: 'packages',
    tags: ['security', 'supply-chain', 'npm', 'monitoring'],
    avatar: 'S',
    isNew: true,
  },
  {
    id: 'openbase',
    name: 'Openbase',
    description:
      'Compare open-source packages with user reviews, download stats, and quality scores.',
    url: 'https://openbase.com',
    category: 'packages',
    tags: ['discovery', 'comparison', 'npm', 'insights'],
    avatar: 'O',
  },

  // ─────────────────────────────────────────────
  // 🌐 Hosting
  // ─────────────────────────────────────────────
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    description:
      'Host static websites directly from your GitHub repository. Free with custom domain support.',
    url: 'https://pages.github.com',
    category: 'hosting',
    tags: ['static', 'free', 'github', 'jekyll'],
    avatar: 'G',
  },
  {
    id: 'surge',
    name: 'Surge',
    description:
      'Static web publishing for frontend developers. Deploy any folder in seconds via CLI.',
    url: 'https://surge.sh',
    category: 'hosting',
    tags: ['static', 'cli', 'free', 'simple'],
    avatar: 'S',
  },
  {
    id: 'deno-deploy',
    name: 'Deno Deploy',
    description:
      'Run JavaScript and TypeScript at the edge using the Deno runtime globally.',
    url: 'https://deno.com/deploy',
    category: 'hosting',
    tags: ['serverless', 'deno', 'edge', 'typescript'],
    avatar: 'D',
    isNew: true,
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers',
    description:
      'Serverless computing across 300+ global locations. Zero cold starts, unlimited scale.',
    url: 'https://workers.cloudflare.com',
    category: 'hosting',
    tags: ['edge', 'serverless', 'workers', 'kv'],
    avatar: 'C',
  },
  {
    id: 'firebase-hosting',
    name: 'Firebase Hosting',
    description:
      'Fast, secure web hosting backed by Google\'s global CDN with one-command deploys.',
    url: 'https://firebase.google.com/products/hosting',
    category: 'hosting',
    tags: ['google', 'cdn', 'static', 'ssl'],
    avatar: 'F',
  },
  {
    id: 'heroku',
    name: 'Heroku',
    description:
      'Cloud platform-as-a-service for deploying and scaling web apps with add-ons ecosystem.',
    url: 'https://heroku.com',
    category: 'hosting',
    tags: ['backend', 'paas', 'postgres', 'add-ons'],
    avatar: 'H',
  },
  {
    id: 'do-app-platform',
    name: 'DigitalOcean Apps',
    description:
      'Managed app hosting that builds, deploys, and scales automatically as you grow.',
    url: 'https://www.digitalocean.com/products/app-platform',
    category: 'hosting',
    tags: ['backend', 'managed', 'containers', 'scaling'],
    avatar: 'D',
  },
];
