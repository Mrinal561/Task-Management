/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getTasks(filterDto: GetTasksFilterDto, userId: string): Promise<Task[]> {
        const { status, search } = filterDto;
        const where: any = { userId };

        if (status) {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } }
            ];
        }

        const tasks = await this.prisma.task.findMany({ where });
        return tasks.map(task => ({
            ...task,
            status: task.status as TaskStatus
        }));
    }

    async getTaskById(id: string, userId: string): Promise<Task> {
        const task = await this.prisma.task.findFirst({ where: { id, userId } });

        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return {
            ...task,
            status: task.status as TaskStatus
        };
    }

    async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = await this.prisma.task.create({
            data: {
                title,
                description,
                status: TaskStatus.OPEN,
                userId,
            },
        });

        return {
            ...task,
            status: task.status as TaskStatus
        };
    }

    async deleteTask(id: string, userId: string): Promise<void> {
        const result = await this.prisma.task.deleteMany({ where: { id, userId } });

        if (result.count === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, userId: string): Promise<Task> {
        await this.getTaskById(id, userId);
        const updatedTask = await this.prisma.task.update({
            where: { id },
            data: { status },
        });

        return {
            ...updatedTask,
            status: updatedTask.status as TaskStatus
        };
    }









    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if(search) {
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }
    //             return false
    //         });
    //     }

    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);

    //     if (!found){
    //         throw new NotFoundException(`Task with ID "${id} not found`);
    //     }
    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    //   }

    //   deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    //   }

    //   updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    //   }


}
