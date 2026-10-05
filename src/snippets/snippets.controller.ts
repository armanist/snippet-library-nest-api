import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    HttpCode,
    HttpStatus,
    UseFilters,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { QuerySnippetDto } from './dto/query-snippet.dto';
import type { Snippet, FindSnippetsResult } from './snippet';

@Controller('snippets')
@UseFilters(AllExceptionsFilter)
export class SnippetsController {
    constructor(private readonly snippetService: SnippetsService) { }

    @Get()
    getAll(@Query() query: QuerySnippetDto): Promise<FindSnippetsResult> {
        return this.snippetService.findAll({
            search: query.search,
            page: query.page,
            limit: query.limit,
        });
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Snippet> {
        return this.snippetService.findOne(id);
    }

    @Post()
    create(@Body() createSnippetDto: CreateSnippetDto): Promise<Snippet> {
        return this.snippetService.create(createSnippetDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
        return this.snippetService.update(id, updateSnippetDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.snippetService.remove(id);
    }
}
