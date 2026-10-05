import type { Snippet } from "./snippet";

export interface FindSnippetsOptions {
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginationMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface FindSnippetsResult {
    snippets: Snippet[];
    pagination: PaginationMetadata;
}