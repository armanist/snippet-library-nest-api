import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import type { ApiErrorResponse } from "../types/api-error-response";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const httpContext = host.switchToHttp();
        const request = httpContext.getRequest();
        const response = httpContext.getResponse();

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : null;

        if (!(exception instanceof HttpException)) {
            this.logger.error(
                'Unhandled exception',
                exception instanceof Error
                    ? exception.stack
                    : String(exception),
            );
        }

        let message: string | string[] = 'Internal server error';

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (exceptionResponse !== null && typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
            const responseMessage = exceptionResponse.message;

            if (typeof responseMessage === 'string' || (Array.isArray(responseMessage) && responseMessage.every((item) => typeof item === 'string'))) {
                message = responseMessage;
            }
        }

        let error = statusCode === HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Internal server error'
            : 'HTTP error';

        if (
            exceptionResponse !== null &&
            typeof exceptionResponse === 'object' &&
            'error' in exceptionResponse &&
            typeof exceptionResponse.error === 'string'
        ) {
            error = exceptionResponse.error;
        }

        const responseBody: ApiErrorResponse = {
            statusCode,
            error,
            message,
            path: httpAdapter.getRequestUrl(request),
            timestamp: new Date().toISOString(),
        };

        httpAdapter.reply(response, responseBody, statusCode);
    }
}