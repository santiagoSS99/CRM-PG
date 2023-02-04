import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      return user

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    if (!user) {
      throw new UnauthorizedException('credentials are not valid, please try again');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('credentials are not valid, please try again');
    }
    return user
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, please check the logs')
  }


}
