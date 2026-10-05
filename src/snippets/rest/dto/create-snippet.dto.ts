import { IsArray, IsIn, IsString, MinLength } from "class-validator";
import { LANGUAGES, type Language } from "src/snippets/contracts/snippet-language";

export class CreateSnippetDto {
    @IsString()
    @MinLength(1)
    title!: string;

    @IsIn([...LANGUAGES])
    language!: Language;

    @IsString()
    @MinLength(1)
    code!: string;

    @IsArray()
    @IsString({each: true})
    tags!: string[];
}