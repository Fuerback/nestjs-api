import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { NotFoundException } from "@nestjs/common";

describe('TaskService', () => {
    let taskService: TasksService;
    
    const mockedRepo = {
        getTasks: jest.fn(() => Promise.resolve(Promise<Task[]>)),
        findOne: jest.fn(() => Promise.resolve({id: 1, title: 'Test task', description: 'Test desc', status: TaskStatus.OPEN})),
      };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            TasksService,
            {
                provide: TaskRepository,
                useValue: mockedRepo,
            }
        ],
        }).compile();
    
        taskService = module.get<TasksService>(TasksService);
      });

    it('getTasks should be called one time', async () => {
        taskService.getTasks(new GetTasksFilterDto(), new User());

        expect(mockedRepo.getTasks).toBeCalledTimes(1);
    });

    it('getTaskById return a valid task', async () => {
        const user = new User();

        const task = taskService.getTaskById(1, user);

        expect(mockedRepo.findOne).toBeCalledTimes(1);
        expect(task).resolves.toEqual({id: 1, title: 'Test task', description: 'Test desc', status: TaskStatus.OPEN});
    });

    it('getTaskById not found task error', async () => {
      mockedRepo.findOne = jest.fn(() => Promise.resolve(null));
      const user = new User();

      expect(taskService.getTaskById(1, user)).rejects.toThrow(NotFoundException);
      expect(mockedRepo.findOne).toBeCalledTimes(1);
  });
});