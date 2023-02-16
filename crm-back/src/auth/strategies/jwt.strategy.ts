import { ConfigService } from "@nestjs/config";
import { UnauthorizedException, Injectable } from '@nestjs/common'
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configservice: ConfigService
    ) {
        super({
            secretOrKey: configservice.get("JWT_SECRET"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new UnauthorizedException('Invalid token')
        }
        if (!user.isActive) {
            throw new UnauthorizedException('User is inactive, please contact with admin')
        }

        return user;
    }
}