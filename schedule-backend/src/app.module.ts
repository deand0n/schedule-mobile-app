import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TestModule } from './test/test.module';
import { AaaaModule } from './aaaa/aaaa.module';

@Module({
  imports: [UsersModule, ScheduleModule, TestModule, AaaaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
