// src/diary/diary.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './diary.entity';
import { CreateDiaryDto, UpdateDiaryDto } from './dto';

@Injectable()
export class DiaryService {
    constructor(
        @InjectRepository(Diary)
        private diaryRepo: Repository<Diary>,
    ) { }

    getAll() {
        return this.diaryRepo.find();
    }

    async getOne(id: number) {
        const diary = await this.diaryRepo.findOneBy({ id });
        if (!diary) throw new NotFoundException('Diary not found');
        return diary;
    }

    create(dto: CreateDiaryDto) {
        const diary = this.diaryRepo.create(dto);
        return this.diaryRepo.save(diary);
    }

    // diary.service.ts
    async update(id: number, dto: UpdateDiaryDto) {
        console.log("✅ service.update() 진입:", id);
        console.log("📦 받은 dto:", dto);

        const diary = await this.getOne(id);
        diary.date = dto.date ?? diary.date;
        diary.content = dto.content ?? diary.content;
        diary.emotion = dto.emotion ?? diary.emotion;
        diary.id = id;

        console.log("📤 저장 전 diary 객체:", diary);
        return this.diaryRepo.save(diary);
    }






    async delete(id: number) {
        const result = await this.diaryRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Diary not found');
    }
}
