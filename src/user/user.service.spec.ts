import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

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

    const newUser = await userService.createUser({
      username: 'username',
      password: 'password',
    });

    expect(newUser.id).toEqual(mockUserDoc._id);
    expect(newUser.username).toEqual(mockUserDoc.username);
    expect(newUser.createdAt).toEqual(mockUserDoc.createdAt);
    expect(newUser.updatedAt).toEqual(mockUserDoc.updatedAt);
    expect(userModel.create).toHaveBeenCalledTimes(1);
  });
});
