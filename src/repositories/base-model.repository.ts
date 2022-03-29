import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentsDataSource} from '../datasources';
import {BaseModel, BaseModelRelations} from '../models';

export class BaseModelRepository extends DefaultCrudRepository<
  BaseModel,
  typeof BaseModel.prototype.id,
  BaseModelRelations
> {
  constructor(
    @inject('datasources.students') dataSource: StudentsDataSource,
  ) {
    super(BaseModel, dataSource);
  }
}
