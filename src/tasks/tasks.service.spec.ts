import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";

describe('TaskService', () => {
    let taskService: TasksService;
    
    const mockedRepo = {
        // mock the repo `getTasks`
        getTasks: jest.fn((id) => Promise.resolve(Promise<Task[]>)),
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

    it('getTask should be called one time', async () => {
        const filterDto = {status: TaskStatus.OPEN, search: 'Some search query'};
        const user = new User();

        taskService.getTasks(filterDto, user);

        expect(mockedRepo.getTasks).toBeCalledTimes(1);
    });
});