import {
    ID,
    ObjectType,
    Field,
    GraphQLISODateTime,
    registerEnumType
} from '@nestjs/graphql';
import { LANGUAGES } from '../snippet';
import type { Language } from '../snippet';

const languageEnum = Object.fromEntries(
    LANGUAGES.map((language) => [language, language])
) as Record<Language, Language>

registerEnumType(languageEnum, {name: 'SnippetLanguage'})

@ObjectType('Snippet')
export class SnippetGraphqlType {
    @Field(() => ID)
    id!: string;

    @Field()
    title!: string;

    @Field(() => languageEnum)
    language!: Language;

    @Field()
    code!: string;

    @Field(() => [String])
    tags!: string[];

    @Field(() => GraphQLISODateTime)
    createdAt!: Date;
}