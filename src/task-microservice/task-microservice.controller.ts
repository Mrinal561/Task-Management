/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from '../tasks/tasks.service';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '../tasks/dto/get-task.dto';
import { TaskStatus } from '../tasks/task-status.enum';
import { Task } from '../tasks/task.entity';

@Controller()
export class TaskMicroserviceController {
  constructor(private tasksService: TasksService) {}

  @MessagePattern({ cmd: 'get_tasks' })
  getTasks(@Payload() data: { filterDto: GetTasksFilterDto; userId: string }): Promise<Task[]> {
    return this.tasksService.getTasks(data.filterDto, data.userId);
  }

  @MessagePattern({ cmd: 'get_task_by_id' })
  getTaskById(@Payload() data: { id: string; userId: string }): Promise<Task> {
    return this.tasksService.getTaskById(data.id, data.userId);
  }

  @MessagePattern({ cmd: 'create_task' })
  createTask(@Payload() data: { createTaskDto: CreateTaskDto; userId: string }): Promise<Task> {
    return this.tasksService.createTask(data.createTaskDto, data.userId);
  }

  @MessagePattern({ cmd: 'delete_task' })
  deleteTask(@Payload() data: { id: string; userId: string }): Promise<void> {
    return this.tasksService.deleteTask(data.id, data.userId);
  }

  @MessagePattern({ cmd: 'update_task_status' })
  updateTaskStatus(@Payload() data: { id: string; status: TaskStatus; userId: string }): Promise<Task> {
    return this.tasksService.updateTaskStatus(data.id, data.status, data.userId);
  }
}