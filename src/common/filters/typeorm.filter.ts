import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Response } from 'express';

enum PostgresErrorCode {
  UniqueViolation = '23505',
  CheckViolation = '23514',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
}

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const status = exception.getStatus();
    //const exceptionResponse = exception.getResponse();
    console.log(exception);
    switch (exception.code) {
      case PostgresErrorCode.UniqueViolation:
        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          statusCode: 422,
          message: 'Duplicado',
          error: 'Unprocessable Entity',
          timestamp: new Date().toISOString(),
        });
        break;
      default:
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Ocorreu um erro',
          error: 'BAD_REQUEST',
          timestamp: new Date().toISOString(),
        });
    }
  }
}
