import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";

describe('TaskService', () => {
    let taskService: TasksService;

    const newTask = {id: 1, title: 'Test task', description: 'Test desc', status: TaskStatus.OPEN}
    
    const mockedRepo = {
        getTasks: jest.fn(() => Promise.resolve(Promise<Task[]>)),
        findOne: jest.fn(() => Promise.resolve(newTask)),
        createTask: jest.fn(() => Promise.resolve(newTask)),
        delete: jest.fn(() => Promise.resolve({affected: 1})),
        save: jest.fn(() => Promise.resolve(newTask)),
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

    it('get tasks should be called one time', async () => {
        taskService.getTasks(new GetTasksFilterDto(), new User());

        expect(mockedRepo.getTasks).toBeCalledTimes(1);
    });

    it('get task by id return a valid task', async () => {
        const user = new User();

        const task = taskService.getTaskById(1, user);

        expect(mockedRepo.findOne).toBeCalledTimes(1);
        expect(task).resolves.toEqual(newTask);
    });

    it('get task by id not found task', async () => {
      mockedRepo.findOne = jest.fn(() => Promise.resolve(null));
      const user = new User();

      expect(taskService.getTaskById(1, user)).rejects.toThrow(NotFoundException);
      expect(mockedRepo.findOne).toBeCalledTimes(1);
    });

    it('create task', async () => {

      const task = taskService.createTask(new CreateTaskDto(), new User());

      expect(mockedRepo.createTask).toBeCalledTimes(1);
      expect(task).resolves.toEqual(newTask);
    });

    it('delete task', async () => {

      const result = taskService.deleteTask(1, new User());

      expect(mockedRepo.delete).toBeCalledTimes(1);
      expect(result).resolves.toEqual(undefined);
    });

    it('delete task task not found', async () => {
      mockedRepo.delete = jest.fn(() => Promise.resolve({affected: 0}));

      expect(taskService.deleteTask(1, new User())).rejects.toThrow(NotFoundException);
      expect(mockedRepo.delete).toBeCalledTimes(1);
    });

    it('update task', async () => {
      mockedRepo.findOne = jest.fn(() => Promise.resolve(new Task()));
      jest.spyOn(Task.prototype, 'save').mockImplementationOnce(() => Promise.resolve(new Task()))

      const task = taskService.updateTaskStatus(1, TaskStatus.OPEN, new User());
      
      expect(mockedRepo.findOne).toBeCalledTimes(1);
      expect((await task).status).toEqual(TaskStatus.OPEN);
    });
});
