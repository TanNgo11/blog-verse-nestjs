import { MESSAGE_METADATA_KEY } from '@common/decorators/set-message.decorator';
import { ApiListResponseDto, ApiResponseDto } from '@commonTypes/common.types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T> | ApiListResponseDto<T>>
{
  private readonly reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T> | ApiListResponseDto<T>> {
    const handler = _context.getHandler();
    const message = this.reflector.get<string>(MESSAGE_METADATA_KEY, handler);

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        message: message ?? 'Request was successful',
        code: 200,
        ...(data !== undefined && { data }),
        timestamp: Date.now(),
      })),
    );
  }
}
