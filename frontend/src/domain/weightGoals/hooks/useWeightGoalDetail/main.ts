import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weightGoalService } from '../../services/weightGoalService';
import type { ReviseWeightGoalInput } from '../../types/models';

export const useWeightGoalDetail = (id: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['weight-goal', id];

  const { data, ...queryInfo } = useQuery({
    queryKey,
    queryFn: () => weightGoalService.getById(id),
    enabled: !!id,
  });

  const { mutateAsync: revise, isPending: isRevising } = useMutation({
    mutationFn: (input: ReviseWeightGoalInput) => weightGoalService.revise(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['weight-goals'] });
    },
  });

  return {
    goal: data,
    revise,
    isRevising,
    ...queryInfo,
  };
};
