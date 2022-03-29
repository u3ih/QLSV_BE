import {Model} from '@loopback/repository';

/**
 * An interface to allow finding notes by title
 */
export interface FindByIdClass<M extends Model> {
  findByidClass(idClass: string): Promise<M[]>;
}
