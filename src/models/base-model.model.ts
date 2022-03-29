import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    defautl: BaseModel.STATUS.DRAFT
  })
  status: string;

  static STATUS = {
    ACTIVE: "active",
    DRAFT: "draft",
    DELETE: "delete"
  }

  constructor(data?: Partial<BaseModel>) {
    super(data);
  }
}

export interface BaseModelRelations {
  // describe navigational properties here
}

export type BaseModelWithRelations = BaseModel & BaseModelRelations;
