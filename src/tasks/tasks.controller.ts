/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorators';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  private logger = new Logger('TaskController');
  constructor(private tasksService: TasksService) {}

  
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }
  
  
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }


  @Post()
    createTask(
      @Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
      return this.tasksService.createTask(createTaskDto, user);    
    }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }


  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, 
    @Body() updateTasksStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
): Promise<Task> {
    const { status } = updateTasksStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
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
