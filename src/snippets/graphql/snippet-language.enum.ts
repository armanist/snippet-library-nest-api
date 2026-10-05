import { registerEnumType } from '@nestjs/graphql';
import { LANGUAGES, type Language } from '../contracts/snippet-language';

export const languageEnum = Object.fromEntries(
    LANGUAGES.map((language) => [language, language])
) as Record<Language, Language>

registerEnumType(languageEnum, { name: 'SnippetLanguage' })