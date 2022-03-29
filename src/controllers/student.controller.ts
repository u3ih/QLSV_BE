import {Constructor, intercept} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {get, param} from '@loopback/rest';
// import {ValidateStudentAgeInterceptor} from '../interceptors';
import {Course, Student} from '../models';
import {StudentRepository} from '../repositories';
import {BaseControllerMixinOptions, ControllerMixin} from './base-model.controller';

const options: BaseControllerMixinOptions = {
  basePath: '/students',
  modelClass: Student,
};

// @intercept(ValidateStudentAgeInterceptor.BINDING_KEY)
export class StudentController extends ControllerMixin<
  Student,
  Constructor<Object>,
  StudentRepository
>(Object, options) {

  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
  ) {
    super();
    this.repository = this.studentRepository;
  }

  @get('/students/{id}/course')
  async getCourse(
    @param.path.string('id') studentId: typeof Student.prototype.id,
  ): Promise<Course> {
    return this.studentRepository.course(studentId);
  }

  @get('/students/with/{relation}')
  async getStudentCourse(
    @param.path.string('relation') relation: string,
    @param.filter(options.modelClass) filter?: Filter<Student>,
  ): Promise<Student[]> {
    filter = {
      include: [relation]
    }
    return this.studentRepository.find(filter);
  }

  // @post('/students')
  // @response(200, {
  //   description: 'Student model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Student)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Student, {
  //           title: 'NewStudent',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   student: Omit<Student, 'id'>,
  // ): Promise<Student> {
  //   return this.studentRepository.create(student);
  // }

  // @get('/students/count')
  // @response(200, {
  //   description: 'Student model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Student) where?: Where<Student>,
  // ): Promise<Count> {
  //   return this.studentRepository.count(where);
  // }

  // @get('/students')
  // @response(200, {
  //   description: 'Array of Student model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(Student, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(Student) filter?: Filter<Student>,
  // ): Promise<Student[]> {
  //   return this.studentRepository.find(filter);
  // }

  // @patch('/students')
  // @response(200, {
  //   description: 'Student PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Student, {partial: true}),
  //       },
  //     },
  //   })
  //   student: Student,
  //   @param.where(Student) where?: Where<Student>,
  // ): Promise<Count> {
  //   return this.studentRepository.updateAll(student, where);
  // }

  // @get('/students/{id}')
  // @response(200, {
  //   description: 'Student model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Student, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(Student, {exclude: 'where'}) filter?: FilterExcludingWhere<Student>
  // ): Promise<Student> {
  //   return this.studentRepository.findById(id, filter);
  // }

  // @patch('/students/{id}')
  // @response(204, {
  //   description: 'Student PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Student, {partial: true}),
  //       },
  //     },
  //   })
  //   student: Student,
  // ): Promise<void> {
  //   await this.studentRepository.updateById(id, student);
  // }

  // @put('/students/{id}')
  // @response(204, {
  //   description: 'Student PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() student: Student,
  // ): Promise<void> {
  //   await this.studentRepository.replaceById(id, student);
  // }

  // @del('/students/{id}')
  // @response(204, {
  //   description: 'Student DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.studentRepository.deleteById(id);
  // }
}
