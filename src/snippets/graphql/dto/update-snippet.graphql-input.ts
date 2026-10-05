import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { LANGUAGES, type Language } from "src/snippets/contracts/snippet-language";
import { languageEnum } from "../snippet-language.enum";

@InputType('UpdateSnippetInput')
export class UpdateSnippetGraphqlInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(1)
    title?: string;

    @Field(() => languageEnum, { nullable: true })
    @IsOptional()
    @IsIn([...LANGUAGES])
    language?: Language;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(1)
    code?: string;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}