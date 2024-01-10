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

  async getAllUsersId(): Promise<UserPrismaModel[] | null> {
    return this.prisma.user.findMany();
  }

  async getAllUsers(): Promise<Omit<UserPrismaModel, 'id'>[] | null> {
    return this.prisma.user.findMany({
      select: {
        id: false,
        email: true,
        name: true,
      },
    });
  }

  async getUserById(userId: string): Promise<UserPrismaModel | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
