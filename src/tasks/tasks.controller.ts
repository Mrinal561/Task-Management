/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';


@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TasksService) {}

  
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  
  
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }


  @Post()
    createTask(
      @Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksService.createTask(createTaskDto);    
    }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }


  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, 
    @Body() updateTasksStatusDto: UpdateTaskStatusDto,
): Promise<Task> {
    const { status } = updateTasksStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
  















//   //http://localhost:3000/tasks
//   @Get()
//   getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//     if(Object.keys(filterDto).length){
//         return this.tasksService.getTasksWithFilters(filterDto);
//     } else {
//         return this.tasksService.getAllTasks();
//     }
//   }

//   //http://localhost:3000/tasks/id
//   @Get('/:id')
//   getTaskById(@Param('id') id: string): Task {
//     return this.tasksService.getTaskById(id);
//   }

//   @Post()
//   createTask(
//     @Body() createTaskDto: CreateTaskDto): Task {
//     return this.tasksService.createTask(createTaskDto);    
//   }


//   @Delete('/:id')
//   deleteTaskById(@Param('id') id: string): void {
//     return this.tasksService.deleteTaskById(id);
//   }

//   @Patch('/:id/status')
//   updateTaskStatus(
//     @Param('id') id: string, 
//     @Body() updateTasksStatusDto: UpdateTaskStatusDto,
// ): Task {
//     const { status } = updateTasksStatusDto;
//     return this.tasksService.updateTaskStatus(id, status);
//   }
 
}
