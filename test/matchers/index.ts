/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeBadRequestProblemDetails(): R;
      toBeNotFoundProblemDetails(): R;
      toBeInternalServerErrorProblemDetails(): R;
    }
  }
}

export { toBeBadRequestProblemDetails } from './toBeBadRequestProblemDetails';
export { toBeNotFoundProblemDetails } from './toBeNotFoundProblemDetails';
export { toBeInternalServerErrorProblemDetails } from './toBeInternalServerErrorProblemDetails';
