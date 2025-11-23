// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const post = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    author: z.string().optional(),
    authorTwitter: z.string().optional(),
    image: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { post };