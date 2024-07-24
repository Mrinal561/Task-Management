import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { User } from 'src/auth/user.entity';
export declare class TasksRepository extends Repository<Task> {
    private dataSource;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    constructor(dataSource: DataSource);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
}
