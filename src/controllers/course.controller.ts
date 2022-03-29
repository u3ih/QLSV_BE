import {Constructor} from '@loopback/core';
import {
  Filter, repository
} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {Course, Student} from '../models';
import {CourseRepository} from '../repositories';
import {BaseControllerMixinOptions, ControllerMixin} from './base-model.controller';

const options: BaseControllerMixinOptions = {
  basePath: '/courses',
  modelClass: Course,
};

export class CourseController extends ControllerMixin<
  Course,
  Constructor<Object>,
  CourseRepository
>(Object, options) {
  constructor(
    @repository(CourseRepository)
    public courseRepository: CourseRepository,
  ) {
    super();
    this.repository = this.courseRepository;
    // this.includeDefault = ['students']
  }

  @get(`/courses/with/{relation}`)
  @response(200, {
    description: 'Array of model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Course, {includeRelations: true}),
        },
      },
    },
  })
  async findCourseWithRelation(
    @param.path.string('relation') relation: string,
    @param.filter(Course) filter?: Filter<Course>,
  ): Promise<Course[]> {
    filter = {
      include: [relation]
    }
    return this.repository.find(filter);
  }

  @get(`/courses/{id}/{relation}`)
  @response(200, {
    description: 'model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(options.modelClass, {includeRelations: true}),
      },
    },
  })
  async findCourseByIdWithRelation(
    @param.path.string('id') id: string,
    @param.filter(options.modelClass, {exclude: 'where'}) filter: Filter<Course>,
    @param.path.string('relation') relation: string
  ): Promise<Course> {
    // this.addIncludeDefault(filter)

    filter = {
      include: [relation]
    }
    return this.repository.findById(id, filter);
  }


  // @get('/courses/{id}/student')
  // async getStudent(
  //   @param.path.string('id') courseId: typeof Course.prototype.id,
  // ): Promise<Student[]> {
  //   return this.courseRepository.students(courseId);
  // }


  @post('/courses/{id}/student')
  async createStudent(
    @param.path.number('id') courseId: typeof Course.prototype.id,
    @requestBody() studentData: Student,
  ): Promise<Student> {
    return this.courseRepository.students(courseId).create(studentData);
  }
}
