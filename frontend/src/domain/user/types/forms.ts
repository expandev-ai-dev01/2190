import { z } from 'zod';
import { registerSchema } from '../validations/register';

export type RegisterFormInput = z.input<typeof registerSchema>;
export type RegisterFormOutput = z.output<typeof registerSchema>;
