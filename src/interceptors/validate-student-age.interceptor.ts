import {
  /* inject, */
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {Student} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */

class ValidationError extends Error {
  code?: string;
  statusCode?: number;
}

@injectable({tags: {key: ValidateStudentAgeInterceptor.BINDING_KEY}})
export class ValidateStudentAgeInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ValidateStudentAgeInterceptor.name}`;

  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    console.log("intercepter")

    let student: Student | undefined;
    if (invocationCtx.methodName === 'create')
      student = invocationCtx.args[0];
    else if (invocationCtx.methodName === 'replaceById')
      student = invocationCtx.args[1];
      
    console.log(student)

    if (
      student &&
      !this.isAgeStudentValid(student.age)
    ) {
      const err: ValidationError = new ValidationError(
        'Area code and city do not match',
      );
      err.statusCode = 422;
      throw err;
    }

    try {
      // Add pre-invocation logic here
      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }

  isAgeStudentValid(age: number) {
      if(age > 0 && age <= 200) {
        return true;
      }

      return false;
  }
}
