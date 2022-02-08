/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInternalServerErrorProblemDetails(): R;
      toBeNotFoundProblemDetails(): R;
      toBeValidationProblemDetails(): R;
    }
  }
}

export { toBeInternalServerErrorProblemDetails } from './toBeInternalServerErrorProblemDetails';
export { toBeNotFoundProblemDetails } from './toBeNotFoundProblemDetails';
export { toBeValidationProblemDetails } from './toBeValidationProblemDetails';
