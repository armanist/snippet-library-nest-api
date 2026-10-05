import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnippetsController } from "./snippets.controller";
import { SnippetResolver } from "./graphql/snippets.resolver";
import { SnippetsService } from "./snippets.service";
import { SnippetEntity } from "./snippet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SnippetEntity])],
    controllers: [SnippetsController],
    providers: [SnippetsService, SnippetResolver],
})

export class SnippetsModule {}

