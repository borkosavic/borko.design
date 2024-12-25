export interface Project {
  title: string;
  description: string;
  slug: string;
  image: string;
  color: string;
  role: string;
  timeline: string;
  technologies: string[];
  content: {
    about: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

export const projects: Project[] = [
  {
    title: 'Belimo Assistant',
    description: 'AI-powered HVAC system assistant',
    slug: 'belimo-assistant',
    image: '/images/belimo.jpg',
    color: 'belimo',
    role: 'Lead UX Designer',
    timeline: 'Jan 2023 - Jun 2023',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'OpenAI'],
    content: {
      about: 'Belimo Assistant is an AI-powered tool that helps HVAC technicians diagnose and solve system issues more efficiently.',
      challenge: 'HVAC technicians needed a faster way to troubleshoot complex system issues in the field.',
      solution: 'We developed an AI assistant that combines Belimo's extensive knowledge base with natural language processing.',
      results: 'Reduced average troubleshooting time by 45% and improved first-time fix rate by 60%.',
    },
  },
  // Add other projects here...
];