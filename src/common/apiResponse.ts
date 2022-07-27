import { HttpStatus } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ProblemDetails,
  PROBLEM_DETAILS,
  PROBLEM_JSON_CONTENT_TYPE,
} from './problemDetails';

export function BadRequestApiResponse() {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    content: {
      [PROBLEM_JSON_CONTENT_TYPE]: {
        schema: { $ref: getSchemaPath(ProblemDetails) },
        example: PROBLEM_DETAILS.BAD_REQUEST,
      },
    },
  });
}

export function NotFoundApiResponse() {
  return ApiResponse({
    status: HttpStatus.NOT_FOUND,
    content: {
      [PROBLEM_JSON_CONTENT_TYPE]: {
        schema: { $ref: getSchemaPath(ProblemDetails) },
        example: PROBLEM_DETAILS.NOT_FOUND,
      },
    },
  });
}
