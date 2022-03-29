import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentsDataSource} from '../datasources';
import {Class, ClassRelations} from '../models';

export class ClassRepository extends DefaultCrudRepository<
  Class,
  typeof Class.prototype.id,
  ClassRelations
> {
  constructor(
    @inject('datasources.students') dataSource: StudentsDataSource,
  ) {
    super(Class, dataSource);
  }
}
