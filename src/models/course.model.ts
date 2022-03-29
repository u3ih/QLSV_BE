import {hasMany, Model, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Student} from './student.model'

@model()
export class Course extends BaseModel {
  @property({
    type: 'number',
    default: 0
  })
  countStudent?: number;

  @property({
    type: 'string',
  })
  idClass: string;

  @hasMany(() => Student)
  students: Student[];

  @property({
    type: 'string',
    require: true
  })
  timeStart: string;

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
