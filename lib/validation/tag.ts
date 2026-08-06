import { z } from 'zod';

export const toolTagFieldsSchema = z.object({
  namePt: z.string().min(1, 'Obrigatório'),
  nameEn: z.string().min(1, 'Obrigatório'),
});

export type ToolTagFields = z.infer<typeof toolTagFieldsSchema>;
