import {MixinTarget} from '@loopback/core';
import {Model} from '@loopback/repository';
import {FindByIdClass} from './find-by-idclass-interface';
import {param, get, getModelSchemaRef} from '@loopback/rest';

/**
 * Options to mix in findByTitle
 */
export interface FindByIdClassControllerMixinOptions {
  /**
   * Base path for the controller
   */
  basePath: string;
  /**
   * Model class for CRUD
   */
  modelClass: typeof Model;
}

/**
 * A mixin factory for controllers to be extended by `FindByTitle`
 * @param superClass - Base class
 * @param options - Options for the controller
 *
 * @typeParam M - Model class
 * @typeParam T - Base class
 */
export function FindByTitleControllerMixin<
  M extends Model,
  T extends MixinTarget<object>,
>(superClass: T, options: FindByIdClassControllerMixinOptions) {
  class MixedController extends superClass implements FindByIdClass<M> {
    // Value will be provided by the subclassed controller class
    repository: FindByIdClass<M>;

    @get(`${options.basePath}/findByIdClass/{idClass}`, {
      responses: {
        '200': {
          description: `Array of ${options.modelClass.modelName} model instances`,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(options.modelClass, {
                  includeRelations: true,
                }),
              },
            },
          },
        },
      },
    })
    async findByidClass(@param.path.string('idClass') idClass: string): Promise<M[]> {
      return this.repository.findByidClass(idClass);
    }
  }

  return MixedController;
}
