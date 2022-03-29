import {MixinTarget} from '@loopback/core';
import {Model, CrudRepository, Where} from '@loopback/repository';
import {FindByIdClass} from './find-by-idclass-interface';

/*
 * This function adds a new method 'findByTitle' to a repository class
 * where 'M' is a model which extends Model
 *
 * @param superClass - Base class
 *
 * @typeParam M - Model class which extends Model
 * @typeParam R - Repository class
 */
export function FindByIdClassRepositoryMixin<
  M extends Model & {idClass: string},
  R extends MixinTarget<CrudRepository<M>>,
>(superClass: R) {
  class MixedRepository extends superClass implements FindByIdClass<M> {
    async findByidClass(idClass: string): Promise<M[]> {
      const where = {idClass} as Where<M>;
      const idClassFilter = {where};
      return this.find(idClassFilter);
    }
  }
  return MixedRepository;
}
