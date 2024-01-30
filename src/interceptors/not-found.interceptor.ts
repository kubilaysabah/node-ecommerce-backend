import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
		return next.handle().pipe(
			tap((data) => {
				if (data === undefined) throw new NotFoundException()
			}),
		)
	}
}
