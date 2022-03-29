import {Constructor} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {Class} from '../models';
import {ClassRepository} from '../repositories';
import {BaseControllerMixinOptions, ControllerMixin} from './base-model.controller';

const options: BaseControllerMixinOptions = {
  basePath: '/classes',
  modelClass: Class,
};

export class ClassController extends ControllerMixin<
  Class,
  Constructor<Object>,
  ClassRepository
>(Object, options) {
  constructor(
    @repository(ClassRepository)
    public classRepository: ClassRepository,
  ) {
    super();
    this.repository = this.classRepository;
  }

  // @post('/student-classes')
  // @response(200, {
  //   description: 'StudentClass model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(StudentClass)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(StudentClass, {
  //           title: 'NewStudentClass',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   studentClass: Omit<StudentClass, 'id'>,
  // ): Promise<StudentClass> {
  //   return this.studentClassRepository.create(studentClass);
  // }

  // @get('/student-classes/count')
  // @response(200, {
  //   description: 'StudentClass model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(StudentClass) where?: Where<StudentClass>,
  // ): Promise<Count> {
  //   return this.studentClassRepository.count(where);
  // }

  // @get('/student-classes')
  // @response(200, {
  //   description: 'Array of StudentClass model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(StudentClass, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(StudentClass) filter?: Filter<StudentClass>,
  // ): Promise<StudentClass[]> {
  //   return this.studentClassRepository.find(filter);
  // }

  // @patch('/student-classes')
  // @response(200, {
  //   description: 'StudentClass PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(StudentClass, {partial: true}),
  //       },
  //     },
  //   })
  //   studentClass: StudentClass,
  //   @param.where(StudentClass) where?: Where<StudentClass>,
  // ): Promise<Count> {
  //   return this.studentClassRepository.updateAll(studentClass, where);
  // }

  // @get('/student-classes/{id}')
  // @response(200, {
  //   description: 'StudentClass model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(StudentClass, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(StudentClass, {exclude: 'where'}) filter?: FilterExcludingWhere<StudentClass>
  // ): Promise<StudentClass> {
  //   return this.studentClassRepository.findById(id, filter);
  // }

  // @patch('/student-classes/{id}')
  // @response(204, {
  //   description: 'StudentClass PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(StudentClass, {partial: true}),
  //       },
  //     },
  //   })
  //   studentClass: StudentClass,
  // ): Promise<void> {
  //   await this.studentClassRepository.updateById(id, studentClass);
  // }

  // @put('/student-classes/{id}')
  // @response(204, {
  //   description: 'StudentClass PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() studentClass: StudentClass,
  // ): Promise<void> {
  //   await this.studentClassRepository.replaceById(id, studentClass);
  // }

  // @del('/student-classes/{id}')
  // @response(204, {
  //   description: 'StudentClass DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.studentClassRepository.deleteById(id);
  // }
}
