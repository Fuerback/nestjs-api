import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;

  const mockedRepo = {
    signUp: jest.fn(() => Promise.resolve()),
    validateUserPassword: jest.fn(() => Promise.resolve('username')),
  };

  const mockedJwtService = {
    sign: jest.fn(() => 'token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockedRepo,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('sign up new user', async () => {
    authService.signUp(new AuthCredentialsDto());

    expect(mockedRepo.signUp).toBeCalledTimes(1);
  });

  it('sign in user', async () => {
    const token = authService.signIn(new AuthCredentialsDto());

    expect(mockedRepo.validateUserPassword).toBeCalledTimes(1);
    expect((await token).accessToken).toEqual('token');
  });
});
