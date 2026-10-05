import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnippetsController } from "./rest/snippets.controller";
import { SnippetResolver } from "./graphql/snippets.resolver";
import { SnippetsService } from "./snippets.service";
import { SnippetEntity } from "./snippet.entity";
import { AllExceptionsFilter } from "src/common/filters/all-exceptions.filter";

@Module({
    imports: [TypeOrmModule.forFeature([SnippetEntity])],
    controllers: [SnippetsController],
    providers: [SnippetsService, SnippetResolver, AllExceptionsFilter],
})

export class SnippetsModule {}

