import type { WeightGoal } from '../../types/models';

export interface WeightGoalFormProps {
  idUsuario: number;
  onSuccess?: (goal: WeightGoal) => void;
  onCancel?: () => void;
}
