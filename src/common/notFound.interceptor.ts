import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import {
  notFoundProblemDetails,
  PROBLEM_JSON_CONTENT_TYPE,
} from './problemDetails';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data === undefined || data === null) {
          const response = context.switchToHttp().getResponse<Response>();
          response
            .status(HttpStatus.NOT_FOUND)
            .contentType(PROBLEM_JSON_CONTENT_TYPE)
            .json(notFoundProblemDetails());
        }
      }),
    );
  }
}
