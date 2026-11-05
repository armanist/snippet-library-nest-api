import { HttpException, HttpStatus } from "@nestjs/common";

export interface ApiError {
    statusCode: number
    code: string
    message: string
}

const CODES_BY_STATUS: Record<number, string> = {
    [HttpStatus.BAD_REQUEST]: 'BAD_USER_INPUT',
    [HttpStatus.NOT_FOUND]: 'NOT_FOUND'
}

export function toApiError(error: unknown): ApiError {
    if(error instanceof HttpException) {
        const response = error.getResponse()
        const message = 
            typeof response === 'object' && response !== null && 'message' in response 
                ? [response.message].flat().join('; ')
                : error.message

        return {
            statusCode: error.getStatus(),
            code: CODES_BY_STATUS[error.getStatus()] ?? 'INTERNAL_SERVER_ERROR',
            message
        }
    }

    return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
    }
}