import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'students',
  connector: 'mongodb',
  url: 'mongodb+srv://u3ih:tranhieu@cluster0.en8xu.mongodb.net/students?retryWrites=true&w=majority',
  host: 'cluster0.en8xu.mongodb.net',
  port: 27017,
  user: 'u3ih',
  password: 'tranhieu',
  database: 'students',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class StudentsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'students';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.students', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
