/* eslint-disable prettier/prettier */

import { Task } from "src/tasks/task.entity";


export class User {
    id: string;

    username: string;

    password: string;

    tasks: Task[];
}