/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskMicroserviceController } from './task-microservice.controller';
import { TasksService } from '../tasks/tasks.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskMicroserviceController],
  providers: [TasksService],
})
export class TaskMicroserviceModule {}