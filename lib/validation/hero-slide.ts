import { z } from 'zod';

export const heroSlideFieldsSchema = z.object({
  mediaType: z.enum(['image', 'video']),
  titlePt: z.string().min(1, 'Obrigatório'),
  titleEn: z.string().min(1, 'Obrigatório'),
  descriptionPt: z.string().optional().default(''),
  descriptionEn: z.string().optional().default(''),
  projectId: z.number().int().nullable().optional(),
  published: z.boolean(),
});

export type HeroSlideFields = z.infer<typeof heroSlideFieldsSchema>;
