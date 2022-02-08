import { HttpStatus } from '@nestjs/common';
import { Response } from 'supertest';
import { PROBLEM_DETAILS } from '../../src/common/problemDetails';

export const toBeBadRequestProblemDetails = (received: Response) => {
  if (received.statusCode !== HttpStatus.BAD_REQUEST) {
    return {
      message: () =>
        `Response did not have the expected status code of ${HttpStatus.BAD_REQUEST}`,
      pass: false,
    };
  }
  if (
    !received.body.type ||
    received.body.type !== PROBLEM_DETAILS.BAD_REQUEST.type
  ) {
    return {
      message: () =>
        `Response did not have the expected type of ${PROBLEM_DETAILS.BAD_REQUEST.type}`,
      pass: false,
    };
  }
  if (
    !received.body.title ||
    received.body.title !== PROBLEM_DETAILS.BAD_REQUEST.title
  ) {
    return {
      message: () =>
        `Response did not have the expected title of ${PROBLEM_DETAILS.BAD_REQUEST.title}`,
      pass: false,
    };
  }
  if (
    !received.body.status ||
    received.body.status !== PROBLEM_DETAILS.BAD_REQUEST.status
  ) {
    return {
      message: () =>
        `Response did not have the expected status of ${PROBLEM_DETAILS.BAD_REQUEST.status}`,
      pass: false,
    };
  }
  return {
    message: () => '',
    pass: true,
  };
};
