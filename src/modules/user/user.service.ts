import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async createUser(createUserDto: CreateUserDTO) {
    const email = await this.findOneBy(createUserDto.email);
    if (email)
      throw new ConflictException('User already exist with this email.');

    const user = this.userRepository.create(createUserDto);
    await user.hashPassword();
    return this.userRepository.save(user);
  }
}
