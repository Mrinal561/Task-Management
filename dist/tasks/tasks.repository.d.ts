import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
export declare class TasksRepository extends Repository<Task> {
    private dataSource;
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    constructor(dataSource: DataSource);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
