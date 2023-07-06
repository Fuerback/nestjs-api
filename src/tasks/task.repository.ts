import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";

@EntityRepository(Task)
@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSaource: DataSource) {
        super(Task, dataSaource.createEntityManager() );
      }
}

