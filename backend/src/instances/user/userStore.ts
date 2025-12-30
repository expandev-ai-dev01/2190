/**
 * @summary
 * In-memory store instance for User entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/user/userStore
 */

import { UserEntity } from '@/services/user/userTypes';

/**
 * In-memory store for User records
 */
class UserStore {
  private records: Map<number, UserEntity> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Add new record
   */
  add(record: UserEntity): UserEntity {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Find user by email
   */
  findByEmail(email: string): UserEntity | undefined {
    return Array.from(this.records.values()).find((u) => u.email === email);
  }

  /**
   * Get record by ID
   */
  getById(id: number): UserEntity | undefined {
    return this.records.get(id);
  }

  /**
   * Check if email exists
   */
  emailExists(email: string): boolean {
    return !!this.findByEmail(email);
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
 * Singleton instance of UserStore
 */
export const userStore = new UserStore();
