import { defineCollection, z } from 'astro:content';

// 共享的博客文章模式
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.string().transform((str) => new Date(str)),
  updatedDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  heroImage: z.string().optional(),
  author: z.string(),
  readingTime: z.string().optional(),
});

// 中文博客集合
const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema.extend({
    author: z.string().default('Terminal Agent 团队'),
  }),
});

// 英文博客集合
const blogEnCollection = defineCollection({
  type: 'content',
  schema: blogSchema.extend({
    author: z.string().default('Terminal Agent Team'),
  }),
});

export const collections = {
  'blog': blogCollection,
  'blog-en': blogEnCollection,
};
