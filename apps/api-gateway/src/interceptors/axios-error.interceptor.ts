import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import axios from "axios";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AxiosErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			catchError((error) => {
				if (axios.isAxiosError(error)) {
					const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
					const data = error.response?.data;

					const defaultError = {
						statusCode: status,
						message: "internal error in external service",
						error: "ExternalServiceError",
					};

					const errorResponse = { ...defaultError, ...data };

					return throwError(() => new HttpException(errorResponse, status));
				}

				return throwError(() => error);
			}),
		);
	}
}
