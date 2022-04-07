import { Module } from '@nestjs/common';
import { JikanModule } from 'src/jikan/jikan.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseService } from './database.service';
import { DatabaseResolver } from './database.resolver';

@Module({
  imports: [JikanModule, PrismaModule, ScheduleModule.forRoot()],
  providers: [DatabaseService, DatabaseResolver],
})
export class DatabaseModule {}
