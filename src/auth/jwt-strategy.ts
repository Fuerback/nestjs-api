import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./user.repository";
import { DataSource } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dataSource: DataSource,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'masterSecret'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        return this.dataSource.transaction(async (manager) => {
            const { username } = payload;
            const user = await this.userRepository.findOne({ where: { username } });

            if (!user) {
                throw new UnauthorizedException();
            }

            return user;
        });
    }
}