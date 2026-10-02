import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { SnippetEntity } from './snippet.entity';
import { Repository } from 'typeorm';
import type { CreateSnippetDto } from './dto/create-snippet.dto';
import type { UpdateSnippetDto } from './dto/update-snippet.dto';
import type { FindSnippetsOptions, FindSnippetsResult } from './snippet';

@Injectable()
export class SnippetsService {
    constructor(@InjectRepository(SnippetEntity) private readonly snippetRepository: Repository<SnippetEntity>) { }

    async findAll(options: FindSnippetsOptions): Promise<FindSnippetsResult> {
        const normalizedSearch = options.search?.trim().toLowerCase();
        const page = options.page ?? 1;
        const limit = options.limit ?? 20;

        const query = this.snippetRepository.createQueryBuilder('snippet');

        if (normalizedSearch) {
            query
                .where('LOWER(snippet.title) LIKE :search')
                .orWhere('LOWER(snippet.language) LIKE :search')
                .orWhere('LOWER(snippet.code) LIKE :search')
                .orWhere('LOWER(snippet.tags) LIKE :search')
                .setParameter('search', `%${normalizedSearch}%`);
        }

        query
            .orderBy('snippet.createdAt', 'DESC')
            .addOrderBy('snippet.id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);

        const [snippets, total] = await query.getManyAndCount();

        return {
            snippets,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string): Promise<SnippetEntity> {
        const snippet = await this.snippetRepository.findOneBy({ id });

        if (!snippet) {
            throw new NotFoundException(`Snippet with ID "${id}" was not found.`);
        }

        return snippet;
    }

    async create(createSnippetDto: CreateSnippetDto): Promise<SnippetEntity> {
        const snippet = this.snippetRepository.create({
            id: randomUUID(),
            ...createSnippetDto,
        });

        return this.snippetRepository.save(snippet);
    }

    async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<SnippetEntity> {
        const snippet = await this.findOne(id);

        Object.assign(snippet, updateSnippetDto);

        await this.snippetRepository.save(snippet);

        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const snippet = await this.findOne(id);

        await this.snippetRepository.remove(snippet);
    }
}