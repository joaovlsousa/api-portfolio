import { z } from 'zod';

export const projectModel = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  githubUrl: z.string().url(),
  deployUrl: z.string().optional(),
  pinned: z.boolean().optional(),
});
