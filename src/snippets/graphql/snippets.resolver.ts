import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { SnippetsService } from "../snippets.service";
import { SnippetGraphqlType } from "./snippet.graphql-type";
import type { SnippetEntity } from "../snippet.entity";

@Resolver(() => SnippetGraphqlType)
export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) {}

    @Query(() => [SnippetGraphqlType], {name: 'snippets'})
    async findAll(): Promise<SnippetEntity[]> {
        const result = await this.snippetService.findAll({});
        return result.snippets;
    }

    @Query(() => SnippetGraphqlType, {name: 'snippet'})
    findOne(@Args('id', {type: () => ID}) id: string): Promise<SnippetEntity> {
        return this.snippetService.findOne(id);
    }
}