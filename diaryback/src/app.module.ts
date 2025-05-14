import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryModule } from './diary/diary.module';
import { Diary } from './diary/diary.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'rjsgud49',
            database: 'diary',
            entities: [Diary],
            synchronize: true,
        }),
        DiaryModule,
    ],
})
export class AppModule { }
