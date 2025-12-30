/**
 * @summary
 * In-memory store instance for Weight Goals entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/weightGoals/weightGoalsStore
 */

import { WeightGoalEntity } from '@/services/weightGoals';

/**
 * In-memory store for Weight Goal records
 */
class WeightGoalsStore {
  private records: Map<number, WeightGoalEntity> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): WeightGoalEntity[] {
    return Array.from(this.records.values());
  }

  /**
   * Get records by user ID
   */
  getByUser(idUsuario: number): WeightGoalEntity[] {
    return Array.from(this.records.values()).filter((r) => r.idUsuario === idUsuario);
  }

  /**
   * Get record by ID
   */
  getById(id: number): WeightGoalEntity | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: WeightGoalEntity): WeightGoalEntity {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<WeightGoalEntity>): WeightGoalEntity | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of WeightGoalsStore
 */
export const weightGoalsStore = new WeightGoalsStore();
