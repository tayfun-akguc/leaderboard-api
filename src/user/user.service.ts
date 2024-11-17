import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (user) {
      throw new HttpException(
        {
          message: 'Username already in use!',
          statusCode: 409,
        },
        409,
      );
    }
    const newUser = await this.userModel.create({ ...createUserDto });
    const response = new UserDto(
      newUser._id.toString(),
      newUser.username,
      newUser.createdAt,
      newUser.updatedAt,
    );
    this.logger.log({ ...response }, 'New user created!');
    return response;
  }

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({
      username: username,
      password: password,
    });
    if (!user) {
      return false;
    }
    return true;
  }

  async findUser(username: string) {
    const user = await this.userModel.findOne({
      username: username,
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return new UserDto(
      user._id.toString(),
      user.username,
      user.createdAt,
      user.updatedAt,
    );
  }
}
