import { IsArray, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { LANGUAGES, type Language } from "src/snippets/contracts/snippet-language";

export class UpdateSnippetDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    title?: string;

    @IsOptional()
    @IsIn([...LANGUAGES])
    language?: Language;

    @IsOptional()
    @IsString()
    @MinLength(1)
    code?: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags?: string[];
}