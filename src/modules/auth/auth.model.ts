import { z } from 'zod';

export const authModel = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Min. 6 caracteres'),
});
