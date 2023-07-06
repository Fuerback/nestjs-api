import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    // storing tasks in memory for now
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
}
