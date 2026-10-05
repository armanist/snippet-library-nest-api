import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SnippetsService } from "../snippets.service";
import { SnippetGraphqlType } from "./snippet.graphql-type";
import { SnippetPageGraphqlType } from "./snippet-page.graphql-type";
import { CreateSnippetGraphqlInput } from "./dto/create-snippet.graphql-input";
import { UpdateSnippetGraphqlInput } from "./dto/update-snippet.graphql-input";
import { QuerySnippetsArgs } from "./dto/query-snippets.args";
import type { Snippet } from "../contracts/snippet";
import type { FindSnippetsResult } from "../contracts/find-snippet";

@Resolver(() => SnippetGraphqlType)
export class SnippetResolver {
    constructor(private readonly snippetService: SnippetsService) { }

    @Query(() => SnippetPageGraphqlType, { name: 'snippets' })
    findAll(@Args() args: QuerySnippetsArgs): Promise<FindSnippetsResult> {
        return this.snippetService.findAll(args);
    }

    @Query(() => SnippetGraphqlType, { name: 'snippet' })
    findOne(@Args('id', { type: () => ID }) id: string): Promise<Snippet> {
        return this.snippetService.findOne(id);
    }

    @Mutation(() => SnippetGraphqlType, { name: 'createSnippet' })
    create(@Args('input') input: CreateSnippetGraphqlInput): Promise<Snippet> {
        return this.snippetService.create(input);
    }

    @Mutation(() => SnippetGraphqlType, { name: 'updateSnippet' })
    update(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateSnippetGraphqlInput,
    ): Promise<Snippet> {
        return this.snippetService.update(id, input);
    }

    @Mutation(() => ID, { name: 'deleteSnippet' })
    async delete(@Args('id', { type: () => ID }) id: string): Promise<string> {
        await this.snippetService.remove(id);
        return id;
    }
}