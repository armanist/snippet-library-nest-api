import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsIn, IsString, MinLength } from "class-validator";
import { LANGUAGES } from "../snippet";
import { languageEnum } from "./snippet.graphql-type";
import type { Language } from "../snippet";

@InputType('CreateSnippetInput')
export class CreateSnippetGraphqlInput {
    @Field()
    @IsString()
    @MinLength(1)
    title!: string;

    @Field(() => languageEnum)
    @IsIn([...LANGUAGES])
    language!: Language;

    @Field()
    @IsString()
    @MinLength(1)
    code!: string;

    @Field(() => [String])
    @IsArray()
    @IsString({ each: true })
    tags!: string[];
}