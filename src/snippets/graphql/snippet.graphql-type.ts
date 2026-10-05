import {
    ID,
    ObjectType,
    Field,
    GraphQLISODateTime
} from '@nestjs/graphql';

import { languageEnum } from './snippet-language.enum';
import type { Language } from '../contracts/snippet-language';

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