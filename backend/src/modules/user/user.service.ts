import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as UserPrismaModel } from '@prisma/client';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserPrismaModel> {
    return this.prisma.user.create({
      data,
    });
  }

  async getAllUsersId(): Promise<UserPrismaModel[]> {
    return this.prisma.user.findMany();
  }

  async getAllUsers(): Promise<Omit<UserPrismaModel, 'id'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: false,
        email: true,
        name: true,
      },
    });
  }
}
