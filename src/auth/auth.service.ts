import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.dataSource.transaction((manager) => {
      return this.userRepository.signUp(authCredentialsDto);
    });
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.dataSource.transaction(async (manager) => {
      const username = await this.userRepository.validateUserPassword(authCredentialsDto);
      if (!username) {
        throw new UnauthorizedException('Invalid credentials');
      } else {
        return username;
      }
    });
  }
}
