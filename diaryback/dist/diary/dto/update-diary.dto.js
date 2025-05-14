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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateDiaryDto {
}
exports.UpdateDiaryDto = UpdateDiaryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-05-13',
        description: '수정할 날짜 (yyyy-mm-dd 형식)',
    }),
    __metadata("design:type", String)
], UpdateDiaryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2,
        description: '수정할 감정 ID (1~5 사이)',
    }),
    __metadata("design:type", Number)
], UpdateDiaryDto.prototype, "emotion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '오늘은 조금 힘들었다.',
        description: '수정할 일기 내용',
    }),
    __metadata("design:type", String)
], UpdateDiaryDto.prototype, "content", void 0);
