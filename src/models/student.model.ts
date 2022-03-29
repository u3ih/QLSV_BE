import {Entity, model, property, belongsTo} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Course, CourseWithRelations} from './course.model'

@model()
export class Student extends BaseModel {

  @property({
    type: 'string',
    required: true,
    id: true,
    jsonSchema: {
      pattern: '^SV[0-5][0-9]$',
      errorMessage: 'Mã sinh viên theo định dạng SV[0-5][0-9]',
    }
  })
  codeStudent: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      errorMessage: 'Giới tính là Nam, Nữ hoặc Khác',
    }
  })
  gender: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      maximum: 200,
      minimum: 1,
      errorMessage: 'Student age should be between 1 and 200',
    },
  })
  age: number;

  @property({
    type: 'string',
  })
  address: string;

  @belongsTo(() => Course, {name:'course'})
  courseId: string;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
  course?: CourseWithRelations
}

export type StudentWithRelations = Student & StudentRelations;
