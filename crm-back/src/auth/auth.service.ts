import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface/jwt-payload.interface';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {

  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDates } = createUserDto
      const user = this.userRepository.create({
        ...userDates,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      delete user.password
      return {
        ...user,
        token: this.getJWTToken({ id: user.id })
      }

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email, id } = loginUserDto
    const user = await this.userRepository.findOne({
      where: { id },
      select: { email: true, password: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException('credentials are not valid, please try again');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('credentials are not valid, please try again');
    }
    return {
      ...user,
      token: this.getJWTToken({ id: user.id })
    }
  }

  getJWTToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, please check the logs')
  }


}
