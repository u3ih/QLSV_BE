import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  Model,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
// import {createDefaultBaseOptions} from '../../controllers/test';
import {MixinTarget} from "@loopback/core";
import { generateDocumentEndpoint } from "./generateDocumentEndpoint";


export interface BaseControllerMixinOptions {
  modelClass: any | typeof Model;
  basePath?: string;
  CREATE_PERMISSIONS?: string[],
  DELETE_PERMISSIONS?: string[],
  UPDATE_PERMISSIONS?: string[],
}

export function createDefaultBaseOptions(model: any, basePath?: string, options?: {
  CREATE_PERMISSIONS: [],
  DELETE_PERMISSIONS: [],
  UPDATE_PERMISSIONS: [],
}) {
  return {
    modelClass: model,
    basePath: basePath,
    CREATE_PERMISSIONS: options?.CREATE_PERMISSIONS || [],
    DELETE_PERMISSIONS: options?.DELETE_PERMISSIONS || [],
    UPDATE_PERMISSIONS: options?.UPDATE_PERMISSIONS || [],
  }
}

export function BaseModelControllerMixin<M extends Model, T extends MixinTarget<object>>(superClass: T,options: BaseControllerMixinOptions) {
  class MixedController extends superClass{
    // constructor(
    //   @repository(BaseModelRepository)
    //   public baseModelRepository : any,
    // ) {}

    @patch(`${generateDocumentEndpoint(options)}/{id}`)
    @response(204, {
      description: 'BaseModel PATCH success',
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
      await (this as any).updateById(id, obj);
    }
  }

  return MixedController;
}
