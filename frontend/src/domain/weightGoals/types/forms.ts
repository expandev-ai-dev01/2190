import { z } from 'zod';
import {
  weightGoalSchema,
  objetivosSecundariosSchema,
  motivacoesSchema,
  marcosSchema,
  preferenciasAlertasSchema,
} from '../validations/weightGoal';

export type WeightGoalFormInput = z.input<typeof weightGoalSchema>;
export type WeightGoalFormOutput = z.output<typeof weightGoalSchema>;

export type ObjetivosSecundariosFormInput = z.input<typeof objetivosSecundariosSchema>;
export type ObjetivosSecundariosFormOutput = z.output<typeof objetivosSecundariosSchema>;

export type MotivacoesFormInput = z.input<typeof motivacoesSchema>;
export type MotivacoesFormOutput = z.output<typeof motivacoesSchema>;

export type MarcosFormInput = z.input<typeof marcosSchema>;
export type MarcosFormOutput = z.output<typeof marcosSchema>;

export type PreferenciasAlertasFormInput = z.input<typeof preferenciasAlertasSchema>;
export type PreferenciasAlertasFormOutput = z.output<typeof preferenciasAlertasSchema>;
