import { z } from 'zod';
import { projectModel } from './project.model';

export type ProjectDTO = z.infer<typeof projectModel>;
