import { z } from 'zod';
import { authModel } from './auth.model';

export type AuthDTO = z.infer<typeof authModel>;
