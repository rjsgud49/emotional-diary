"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
// src/diary/diary.service.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const diary_entity_1 = require("./diary.entity");
let DiaryService = class DiaryService {
    constructor(diaryRepo) {
        this.diaryRepo = diaryRepo;
    }
    getAll() {
        return this.diaryRepo.find();
    }
    async getOne(id) {
        const diary = await this.diaryRepo.findOneBy({ id });
        if (!diary)
            throw new common_1.NotFoundException('Diary not found');
        return diary;
    }
    create(dto) {
        const diary = this.diaryRepo.create(dto);
        return this.diaryRepo.save(diary);
    }
    // diary.service.ts
    async update(id, dto) {
        var _a, _b, _c;
        console.log("✅ service.update() 진입:", id);
        console.log("📦 받은 dto:", dto);
        const diary = await this.getOne(id);
        diary.date = (_a = dto.date) !== null && _a !== void 0 ? _a : diary.date;
        diary.content = (_b = dto.content) !== null && _b !== void 0 ? _b : diary.content;
        diary.emotion = (_c = dto.emotion) !== null && _c !== void 0 ? _c : diary.emotion;
        diary.id = id;
        console.log("📤 저장 전 diary 객체:", diary);
        return this.diaryRepo.save(diary);
    }
    async delete(id) {
        const result = await this.diaryRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Diary not found');
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(diary_entity_1.Diary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiaryService);
