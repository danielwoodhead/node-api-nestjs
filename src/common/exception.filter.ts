import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  internalServerErrorProblemDetails,
  badRequestProblemDetails,
  PROBLEM_JSON_CONTENT_TYPE,
  notFoundProblemDetails,
} from './problemDetails';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  getResponseBody(status: number, err: any) {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return badRequestProblemDetails(err);
      case HttpStatus.NOT_FOUND:
        return notFoundProblemDetails();
      case HttpStatus.INTERNAL_SERVER_ERROR:
      default:
        return internalServerErrorProblemDetails();
    }
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = this.getResponseBody(httpStatus, exception);

    response
      .status(httpStatus)
      .contentType(PROBLEM_JSON_CONTENT_TYPE)
      .json(responseBody);
  }
}
