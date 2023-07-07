import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.dataSource.transaction((manager) => {
      return this.userRepository.signUp(authCredentialsDto);
    });
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.dataSource.transaction(async (manager) => {
      const username = await this.userRepository.validateUserPassword(authCredentialsDto);
      if (!username) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    });
  }
}
