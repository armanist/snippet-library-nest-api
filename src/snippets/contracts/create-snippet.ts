import type { Snippet } from "./snippet";

export type CreateSnippetData = Pick<Snippet, 'title' | 'language' | 'code' | 'tags'>;
