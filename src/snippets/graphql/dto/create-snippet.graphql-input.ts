import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsIn, IsString, MinLength } from "class-validator";
import { LANGUAGES, type Language } from "src/snippets/contracts/snippet-language";
import { languageEnum } from "../snippet-language.enum";

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