import {inject} from '@loopback/core';
import {DataObject, DefaultCrudRepository, Entity, juggler} from '@loopback/repository';
import { SecurityBindings, UserProfile } from '@loopback/security';

export interface WithModifiedBy {
  modifiedBy: string,
}

export class AuditingRepository<T extends Entity & WithModifiedBy, ID, Relations extends object = {}> extends DefaultCrudRepository<T, ID, Relations> {
  @inject(SecurityBindings.USER, {optional: true})
  currentUser?: UserProfile;

  constructor(
    entityClass: typeof Entity & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource);
  }

  async entityToData<R extends T>(entity: R | DataObject<R>, options?: {}) {
    const data = await super.entityToData(entity, options);

    (data as WithModifiedBy).modifiedBy = this.currentUser?.idStudent ?? 'Loopback';

    return data;
  }
}
