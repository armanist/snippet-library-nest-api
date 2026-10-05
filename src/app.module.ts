import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetEntity } from './snippets/snippet.entity';
import { SnippetsModule } from './snippets/snippets.module';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow<string>('DATABASE_PATH'),
        entities: [SnippetEntity],
        synchronize: false,
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      graphiql: true,
    }),

    SnippetsModule
  ],
})

export class AppModule { }
