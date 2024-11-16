import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from './schema/user.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
