import type { GqlExceptionFilter } from "@nestjs/graphql";
import { Catch, Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { toApiError } from "../errors/to-api-error";

@Catch()
export class GraphqlExceptionsFilter implements GqlExceptionFilter {
    private readonly logger = new Logger(GraphqlExceptionsFilter.name);

    catch(exception: unknown): GraphQLError {
        const { statusCode, code, message } = toApiError(exception);

        if (statusCode === 500) {
            this.logger.error(
                "Unhandled exception",
                exception instanceof Error ? exception.stack : String(exception),
            );
        }

        return new GraphQLError(message, { extensions: { code } });
    }
}