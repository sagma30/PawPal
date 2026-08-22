/**
 * Generic in-memory repository with ACID-like semantics.
 * Data lives in a Map<id, T>. Swap `store` with a DB adapter
 * without changing any Service or Controller code.
 */
export class BaseRepository<T extends { id: string }> {
  protected store: Map<string, T> = new Map();

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  findById(id: string): T | undefined {
    return this.store.get(id);
  }

  findWhere(predicate: (item: T) => boolean): T[] {
    return this.findAll().filter(predicate);
  }

  findOneWhere(predicate: (item: T) => boolean): T | undefined {
    return this.findAll().find(predicate);
  }

  save(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  update(id: string, partial: Partial<T>): T | undefined {
    const existing = this.store.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...partial, id } as T;
    this.store.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }

  count(): number {
    return this.store.size;
  }

  seed(entities: T[]): void {
    for (const entity of entities) {
      this.store.set(entity.id, entity);
    }
  }
}
