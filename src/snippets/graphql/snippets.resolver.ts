import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SnippetsService } from "../snippets.service";
import { SnippetGraphqlType } from "./snippet.graphql-type";
import { SnippetPageGraphqlType } from "./snippet-page.graphql-type";
import { CreateSnippetGraphqlInput } from "./create-snippet.graphql-input";
import type { SnippetEntity } from "../snippet.entity";
import type { FindSnippetsResult } from "../snippet";

@Resolver(() => SnippetGraphqlType)
export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) { }

    @Query(() => SnippetPageGraphqlType, { name: 'snippets' })
    async findAll(
        @Args('search', { type: () => String, nullable: true }) search?: string,
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    ): Promise<FindSnippetsResult> {
        return this.snippetService.findAll({ search, page, limit });
    }

    @Query(() => SnippetGraphqlType, { name: 'snippet' })
    findOne(@Args('id', { type: () => ID }) id: string): Promise<SnippetEntity> {
        return this.snippetService.findOne(id);
    }

    @Mutation(() => SnippetGraphqlType, { name: 'createSnippet' })
    create(@Args('input') input: CreateSnippetGraphqlInput): Promise<SnippetEntity> {
        return this.snippetService.create(input);
    }
}