"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    // ✅ Swagger 설정
    const config = new swagger_1.DocumentBuilder()
        .setTitle('감정 일기장 API')
        .setDescription('NestJS로 만든 일기장 백엔드 API 문서')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document); // 👉 http://localhost:3000/api
    await app.listen(3000);
}
bootstrap();
