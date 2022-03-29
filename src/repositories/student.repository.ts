import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {StudentsDataSource} from '../datasources';
import {Course, Student, StudentRelations} from '../models';
import {CourseRepository} from './course.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
> {
  public readonly course: BelongsToAccessor<
    Course,
    typeof Student.prototype.id
  >;

  constructor(
    @inject('datasources.students') dataSource: StudentsDataSource,
    @repository.getter('CourseRepository')
    courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(Student, dataSource);
    this.course = this.createBelongsToAccessorFor(
      'course',
      courseRepositoryGetter,
    );
    this.registerInclusionResolver('course', this.course.inclusionResolver);
  }
}
