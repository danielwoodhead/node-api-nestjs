import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProblemDetails {
  @ApiProperty()
  type: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: number;

  @ApiPropertyOptional()
  detail?: string;

  @ApiPropertyOptional()
  instance?: string;
}

export const PROBLEM_DETAILS = {
  BAD_REQUEST: {
    type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1',
    title: 'Baf Request',
    status: HttpStatus.BAD_REQUEST,
  },
  NOT_FOUND: {
    type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4',
    title: 'Not Found',
    status: HttpStatus.NOT_FOUND,
  },
  INTERNAL_SERVER_ERROR: {
    type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1',
    title: 'Internal Server Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};

export const PROBLEM_JSON_CONTENT_TYPE = 'application/problem+json';

export const badRequestProblemDetails = (
  e: BadRequestException,
): ProblemDetails => {
  return {
    type: PROBLEM_DETAILS.BAD_REQUEST.type,
    title: PROBLEM_DETAILS.BAD_REQUEST.title,
    status: PROBLEM_DETAILS.BAD_REQUEST.status,
    detail: e.message,
  };
};

export const notFoundProblemDetails = (): ProblemDetails => {
  return PROBLEM_DETAILS.NOT_FOUND;
};

export const internalServerErrorProblemDetails = (): ProblemDetails => {
  return PROBLEM_DETAILS.INTERNAL_SERVER_ERROR;
};
