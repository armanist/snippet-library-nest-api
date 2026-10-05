import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SnippetGraphqlType } from "./snippet.graphql-type";

@ObjectType('PaginationMetadata')
export class PaginationMetadataGraphType {
    @Field(() => Int)
    page!: number;

    @Field(() => Int)
    limit!: number;

    @Field(() => Int)
    total!: number;

    @Field(() => Int)
    totalPages!: number;
}

@ObjectType('SnippetPage')
export class SnippetPageGraphqlType {
    @Field(() => [SnippetGraphqlType])
    snippets!: SnippetGraphqlType[]

    @Field(() => PaginationMetadataGraphType)
    pagination!: PaginationMetadataGraphType
}