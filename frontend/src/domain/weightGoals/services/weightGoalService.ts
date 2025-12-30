/**
 * @service WeightGoalService
 * @domain weightGoals
 * @type REST
 */

import { authenticatedClient } from '@/core/lib/api';
import type { WeightGoal, WeightGoalListParams, ReviseWeightGoalInput } from '../types/models';
import type { WeightGoalFormOutput } from '../types/forms';

export const weightGoalService = {
  async list(params: WeightGoalListParams): Promise<WeightGoal[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: WeightGoal[] }>(
      '/weight-goals',
      { params }
    );
    return data.data;
  },

  async getById(id: number): Promise<WeightGoal> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: WeightGoal }>(
      `/weight-goals/${id}`
    );
    return data.data;
  },

  async create(input: WeightGoalFormOutput): Promise<WeightGoal> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: WeightGoal }>(
      '/weight-goals',
      input
    );
    return data.data;
  },

  async update(id: number, input: Partial<WeightGoalFormOutput>): Promise<WeightGoal> {
    const { data } = await authenticatedClient.put<{ success: boolean; data: WeightGoal }>(
      `/weight-goals/${id}`,
      input
    );
    return data.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const { data } = await authenticatedClient.delete<{
      success: boolean;
      data: { message: string };
    }>(`/weight-goals/${id}`);
    return data.data;
  },

  async revise(id: number, input: ReviseWeightGoalInput): Promise<WeightGoal> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: WeightGoal }>(
      `/weight-goals/${id}/revise`,
      input
    );
    return data.data;
  },
};
