import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new this.userModel({
      ...createUserDto,
    });
    const saved = await user.save();
    this.logger.log({ ...createUserDto }, 'New user created!');
    const { _id, username, createdAt, updatedAt } = saved.toJSON();
    return new UserDto(_id.toString(), username, createdAt, updatedAt);
  }
}
