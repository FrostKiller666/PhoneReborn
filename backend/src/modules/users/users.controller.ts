import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User as UserPrismaModel } from '.prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @ApiTags('Users')
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserPrismaModel> {
    return this.usersService.createUser(userData);
  }
}
