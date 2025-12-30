import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weightGoalService } from '../../services/weightGoalService';
import type { WeightGoalListParams } from '../../types/models';
import type { WeightGoalFormOutput } from '../../types/forms';

export const useWeightGoalList = (params: WeightGoalListParams) => {
  const queryClient = useQueryClient();
  const queryKey = ['weight-goals', params.idUsuario];

  const { data, ...queryInfo } = useQuery({
    queryKey,
    queryFn: () => weightGoalService.list(params),
  });

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: (input: WeightGoalFormOutput) => weightGoalService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<WeightGoalFormOutput> }) =>
      weightGoalService.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutateAsync: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => weightGoalService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    goals: data,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
    ...queryInfo,
  };
};
