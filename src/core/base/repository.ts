import { DomainModel } from './domain-model';

export abstract class Repository<TEntity extends DomainModel> {
  abstract create(data: Partial<TEntity>): Promise<TEntity> | TEntity;
  abstract findAll(filter?: Partial<TEntity>): Promise<TEntity[]> | TEntity[];
  abstract findById(id: number): Promise<TEntity | null> | TEntity | null;
  abstract update(
    id: number,
    data: Partial<TEntity>,
  ): Promise<TEntity | null> | TEntity | null;
  abstract remove(id: number): Promise<void> | void;
  abstract removeAll(): Promise<void> | void;
}
