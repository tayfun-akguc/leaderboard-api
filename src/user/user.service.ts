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
    const user = await this.userModel.create({ ...createUserDto });
    const response = new UserDto(
      user._id.toString(),
      user.username,
      user.createdAt,
      user.updatedAt,
    );
    this.logger.log({ ...response }, 'New user created!');
    return response;
  }
}
