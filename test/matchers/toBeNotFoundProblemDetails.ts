import { HttpStatus } from '@nestjs/common';
import { Response } from 'supertest';
import { PROBLEM_DETAILS } from '../../src/common/problemDetails';

export const toBeNotFoundProblemDetails = (received: Response) => {
  if (received.statusCode !== HttpStatus.NOT_FOUND) {
    return {
      message: () =>
        `Response did not have the expected status code of ${HttpStatus.NOT_FOUND}`,
      pass: false,
    };
  }
  if (
    !received.body.type ||
    received.body.type !== PROBLEM_DETAILS.NOT_FOUND.type
  ) {
    return {
      message: () =>
        `Response did not have the expected type of ${PROBLEM_DETAILS.NOT_FOUND.type}`,
      pass: false,
    };
  }
  if (
    !received.body.title ||
    received.body.title !== PROBLEM_DETAILS.NOT_FOUND.title
  ) {
    return {
      message: () =>
        `Response did not have the expected title of ${PROBLEM_DETAILS.NOT_FOUND.title}`,
      pass: false,
    };
  }
  if (
    !received.body.status ||
    received.body.status !== PROBLEM_DETAILS.NOT_FOUND.status
  ) {
    return {
      message: () =>
        `Response did not have the expected status of ${PROBLEM_DETAILS.NOT_FOUND.status}`,
      pass: false,
    };
  }
  return {
    message: () => '',
    pass: true,
  };
};
