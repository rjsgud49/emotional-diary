import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDiaryDto {
    @ApiPropertyOptional({
        example: '2025-05-13',
        description: '수정할 날짜 (yyyy-mm-dd 형식)',
    })
    date?: string;

    @ApiPropertyOptional({
        example: 2,
        description: '수정할 감정 ID (1~5 사이)',
    })
    emotion?: number;

    @ApiPropertyOptional({
        example: '오늘은 조금 힘들었다.',
        description: '수정할 일기 내용',
    })
    content?: string;
}
