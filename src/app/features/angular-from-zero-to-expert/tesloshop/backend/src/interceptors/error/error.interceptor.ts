import { BadRequestException, CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { getDBError } from '../helpers/db-errors-handler.helper';

const BBDDErrorCodes = ['23505']

const r2 = {"query":"INSERT INTO \"users\"(\"id\", \"email\", \"password\", \"fullName\", \"isActive\", \"roles\") VALUES (DEFAULT, $1, $2, $3, DEFAULT, DEFAULT) RETURNING \"id\", \"isActive\", \"roles\"","parameters":["admin@google.com","$2b$10$iPoYzGVG58YKHc/Wx.cTpe2FZvIyd/X6IGLidL3CPKJU7TkcFhC3S","felipe"],"driverError":{"length":238,"name":"error","severity":"ERROR","code":"23505","detail":"Key (email)=(admin@google.com) already exists.","schema":"public","table":"users","constraint":"UQ_97672ac88f789774dd47f7c8be3","file":"nbtinsert.c","line":"663","routine":"_bt_check_unique"},"length":238,"severity":"ERROR","code":"23505","detail":"Key (email)=(admin@google.com) already exists.","schema":"public","table":"users","constraint":"UQ_97672ac88f789774dd47f7c8be3","file":"nbtinsert.c","line":"663","routine":"_bt_check_unique"}

const r = { "response": {
   "message": "Key (title)=(Men's Solar Roof Tee) already exists.",
    "error": "Bad Request", "statusCode": 400
  }, "status": 400, "options": {}, "message": "Key (title)=(Men's Solar Roof Tee) already exists.", "name": "BadRequestException" }

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        console.error('Error capturado:', JSON.stringify(error));
        if (BBDDErrorCodes.includes(error.code))
          throw new BadRequestException({ databaseErrorResponse: { code: error.code, ...getDBError(error) } });
        return next.handle()
        throw throwError(() => error)

        throw new InternalServerErrorException('Please check server logs');
      }),
    );
  }
}
