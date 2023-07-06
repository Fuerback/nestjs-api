import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSaource: DataSource) {
        super(Task, dataSaource.createEntityManager() );
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}

