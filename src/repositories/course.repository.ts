import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {StudentsDataSource} from '../datasources';
import {Course, CourseRelations, Student} from '../models';
import { StudentRepository } from './student.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {
  public readonly students: HasManyRepositoryFactory<
    Student,
    typeof Course.prototype.id
  >;
  constructor(
    @inject('datasources.students') dataSource: StudentsDataSource,
    @repository.getter('StudentRepository')
    studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Course, dataSource);
    this.students = this.createHasManyRepositoryFactoryFor(
      'students',
      studentRepositoryGetter
    )

    this.registerInclusionResolver('students', this.students.inclusionResolver);
  }
}
