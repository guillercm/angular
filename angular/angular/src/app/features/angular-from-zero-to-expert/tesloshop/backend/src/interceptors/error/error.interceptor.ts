import { BadRequestException, CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { getDBError } from '../helpers/db-errors-handler.helper';

const BBDDErrorCodes = ['23505']

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        console.error('Error capturado:', JSON.stringify(error));
        if (BBDDErrorCodes.includes(error.code))
          throw new BadRequestException({databaseErrorResponse:{code: error.code, ...getDBError(error)}});
        return next.handle()
        throw throwError(() => error)

        throw new InternalServerErrorException('Please check server logs');
      }),
    );
  }
}
