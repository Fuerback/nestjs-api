import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    // storing tasks in memory for now
    private tasks = [];

    getAllTasks() {
        return this.tasks;
    }
}
