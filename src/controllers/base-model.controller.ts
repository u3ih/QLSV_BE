import {MixinTarget} from '@loopback/core';
import {
  Count,
  CountSchema, DefaultCrudRepository, Entity, Filter,
  FilterExcludingWhere, InclusionFilter, Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';


export interface BaseControllerMixinOptions {
  /**
   * Base path for the controller
   */
  basePath: string;
  /**
   * Model class for CRUD
   */
  modelClass: typeof Entity | any;
}

export function ControllerMixin<
  E extends Entity,
  T extends MixinTarget<object>,
  R extends DefaultCrudRepository<E, string, object>,
  >(superClass: T, options: BaseControllerMixinOptions) {

  class BaseModelController extends superClass {
    public repository: R;
    // public includeDefault: InclusionFilter[];

    @post(`/${options.basePath}`)
    @response(200, {
      description: 'model instance',
      content: {'application/json': {schema: getModelSchemaRef(options.modelClass)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(options.modelClass),
          },
        },
      })

      postData: any,
    ): Promise<E> {
      return this.repository.create(postData);
    }

    @get(`/${options.basePath}/count`)
    @response(200, {
      description: 'model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(options.modelClass) where?: Where<E>,
    ): Promise<Count> {
      return this.repository.count(where);
    }

    @get(`/${options.basePath}`)
    @response(200, {
      description: 'Array of model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(options.modelClass, {includeRelations: true}),
          },
        },
      },
    })
    async find(
      @param.filter(options.modelClass) filter?: Filter<E>,
    ): Promise<E[]> {
      return this.repository.find(filter);
    }

    @patch(`/${options.basePath}`)
    @response(200, {
      description: 'PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(options.modelClass, {partial: true}),
          },
        },
      })
      model: E,
      @param.where(options.modelClass) where?: Where<E>,
    ): Promise<Count> {
      return this.repository.updateAll(model, where);
    }

    @get(`/${options.basePath}/{id}`)
    @response(200, {
      description: 'model instance',
      content: {
        'application/json': {
          schema: getModelSchemaRef(options.modelClass, {includeRelations: true}),
        },
      },
    })
    async findById(
      @param.path.string('id') id: string,
      @param.filter(options.modelClass, {exclude: 'where'}) filter?: FilterExcludingWhere<E>
    ): Promise<E> {
      return this.repository.findById(id, filter);
    }


    @patch(`/${options.basePath}/{id}`)
    @response(204, {
      description: 'PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(options.modelClass, {partial: true}),
            // schema: options.schemaWithPartial,
          },
        },
      })
      obj: any,
    ): Promise<void> {
      await this.repository.updateById(id, obj);
    }

    @put(`/${options.basePath}/{id}`)
    @response(204, {
      description: 'PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() model: E,
    ): Promise<void> {
      await this.repository.replaceById(id, model);
    }

    @del(`/${options.basePath}/{id}`)
    @response(204, {
      description: 'DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.repository.deleteById(id);
    }

    // addIncludeDefault(filter: Filter<E>) {
    //   filter.include = [
    //     ...this.includeDefault || [],
    //     ...filter.include || []
    //   ]
    // }
  }
  return BaseModelController;
}
