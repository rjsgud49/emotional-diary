import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    // ✅ Swagger 설정
    const config = new DocumentBuilder()
        .setTitle('감정 일기장 API')
        .setDescription('NestJS로 만든 일기장 백엔드 API 문서')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // 👉 http://localhost:3000/api

    await app.listen(3000);
}
bootstrap();
