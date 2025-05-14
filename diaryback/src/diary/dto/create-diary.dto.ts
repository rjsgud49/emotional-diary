import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryDto {
    @ApiProperty({
        example: '2025-05-13',
        description: '일기 날짜 (yyyy-mm-dd 형식)',
    })
    date!: string;

    @ApiProperty({
        example: 3,
        description: '감정 ID (1~5 사이의 정수)',
    })
    emotion!: number;

    @ApiProperty({
        example: '오늘은 정말 행복한 하루였다.',
        description: '일기의 본문 내용',
    })
    content!: string;
}
