import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    // storing tasks in memory for now
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);

        // A longer way to do the same thing:

        // const task = this.getTaskById(id);
        // const index = this.tasks.indexOf(task);
        // if (index >= 0) {
        //     this.tasks.splice(index, 1)
        // }
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {

        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
