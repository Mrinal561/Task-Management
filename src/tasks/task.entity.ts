/* eslint-disable prettier/prettier */
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";

export class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    userId: string;
    user?: User;
}