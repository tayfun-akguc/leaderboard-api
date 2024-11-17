import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { HttpException, NotFoundException } from '@nestjs/common';

const mockUserDoc = {
  _id: '1234',
  username: 'username',
  password: 'password',
  createdAt: new Date('1'),
  updatedAt: new Date('1'),
};

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUserDoc),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('user service should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should insert a new user', async () => {
    jest
      .spyOn(userModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUserDoc as any));

    jest.spyOn(userModel, 'findOne').mockImplementationOnce(() => null);

    const result = await userService.createUser({
      username: 'username',
      password: 'password',
    });

    expect(result.id).toEqual(mockUserDoc._id);
    expect(result.username).toEqual(mockUserDoc.username);
    expect(result.createdAt).toEqual(mockUserDoc.createdAt);
    expect(result.updatedAt).toEqual(mockUserDoc.updatedAt);
    expect(userModel.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the username is already in use', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUserDoc);

    try {
      await userService.createUser({
        username: 'username',
        password: 'password',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toEqual(409);
      expect(userModel.findOne).toHaveBeenCalledTimes(1);
      expect(userModel.create).toHaveBeenCalledTimes(0);
    }
  });

  it('should return user details when found', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUserDoc);

    const result = await userService.findUser('username');

    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(result.id).toEqual(mockUserDoc._id);
    expect(result.username).toEqual(mockUserDoc.username);
  });

  it('should throw exception when user not found', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

    try {
      await userService.findUser('username');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(userModel.findOne).toHaveBeenCalledTimes(1);
    }
  });

  it('should return true for correct user credentials', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUserDoc);

    const result = await userService.validateCredentials(
      'username',
      'password',
    );

    expect(result).toEqual(true);
    expect(userModel.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return false for wrong user credentials', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

    const result = await userService.validateCredentials(
      'username',
      'password',
    );

    expect(result).toEqual(false);
    expect(userModel.findOne).toHaveBeenCalledTimes(1);
  });
});
