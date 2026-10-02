import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnippetEntity } from '../snippets/snippet.entity';

export default new DataSource({
    type: 'better-sqlite3',
    database: process.env.DATABASE_PATH ?? 'snippets.sqlite',
    entities: [SnippetEntity],
    migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
    synchronize: false,
});