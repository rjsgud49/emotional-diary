import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto, UpdateDiaryDto } from './dto';

@ApiTags('Diaries') // Swagger UI에서 "Diaries" 그룹으로 묶임
@Controller('diaries')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) { }

    @Get()
    @ApiOperation({ summary: '전체 일기 목록 조회' })
    getAll() {
        return this.diaryService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '특정 ID의 일기 상세 조회' })
    getOne(@Param('id') id: string) {
        return this.diaryService.getOne(+id);
    }

    @Post()
    @ApiOperation({ summary: '새 일기 작성' })
    create(@Body() dto: CreateDiaryDto) {
        return this.diaryService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: '기존 일기 수정' })
    update(@Param('id') id: string, @Body() dto: UpdateDiaryDto) {
        console.log('✅ PUT 요청 도착:', id);
        return this.diaryService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '일기 삭제' })
    delete(@Param('id') id: string) {
        return this.diaryService.delete(+id);
    }
}
