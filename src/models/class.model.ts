import {Entity, model, property} from '@loopback/repository';

@model()
export class Class extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[1-4][0-9]{2}$'
    }
  })
  roomNumber: string;

  constructor(data?: Partial<Class>) {
    super(data);
  }
}

export interface ClassRelations {
  // describe navigational properties here
}

export type ClassWithRelations = Class & ClassRelations;
