import { z } from 'zod';
import { authModel } from './auth.model';

export type AuthDto = z.infer<typeof authModel>;
