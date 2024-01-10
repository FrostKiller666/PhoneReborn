import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
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

  //end point for test with id
  @ApiTags('Users')
  @Get('all-users-id')
  async getAllUsersId(): Promise<UserPrismaModel[]> {
    return this.usersService.getAllUsersId();
  }

  //end point for test without id
  @ApiTags('Users')
  @Get('all-users')
  async getAllUsers(): Promise<Omit<UserPrismaModel, 'id'>[]> {
    return this.usersService.getAllUsers();
  }
}
