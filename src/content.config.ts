import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    accent: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }),
});

const about = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    timeline: z.array(z.object({
      company: z.string(),
      role: z.string(),
      period: z.string(),
      description: z.string().optional(),
    })).optional(),
  }),
});

export const collections = {
  projects,
  about,
};
