import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { User as UserPrismaModel } from '.prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @ApiTags('Users')
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserPrismaModel> {
    return this.userService.createUser(userData);
  }

  //end point for test with id
  @ApiTags('Users')
  @Get('all-users-id')
  async getAllUsersId(): Promise<UserPrismaModel[]> {
    return this.userService.getAllUsersId();
  }

  //end point for test without id
  @ApiTags('Users')
  @Get('all-users')
  async getAllUsers(): Promise<Omit<UserPrismaModel, 'id'>[]> {
    return this.userService.getAllUsers();
  }

  @ApiTags('Users')
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserPrismaModel> {
    return this.userService.getUserById(userId);
  }

  @ApiTags('Users')
  @Delete(':id')
  async DeleteUserDto(@Param('id') userId: string): Promise<UserPrismaModel> {
    return this.userService.deleteUser(userId);
  }
}
