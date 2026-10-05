import {Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import type { Snippet } from './contracts/snippet';
import type { Language } from './contracts/snippet-language';

@Entity('snippets')
export class SnippetEntity implements Snippet {
    @PrimaryColumn('text')
    id!: string;

    @Column()
    title!: string;

    @Column({type: 'text'})
    language!: Language;

    @Column()
    code!: string;

    @Column('simple-json')
    tags!: string[];

    @CreateDateColumn()
    createdAt!: Date
}