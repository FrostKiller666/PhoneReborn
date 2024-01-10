import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User as UserPrismaModel } from '.prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private usersService: UserService) {}

  @ApiTags('Users')
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserPrismaModel> {
    return this.usersService.createUser(userData);
  }
}
