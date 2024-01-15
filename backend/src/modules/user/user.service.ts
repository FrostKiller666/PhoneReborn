import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User as UserPrismaModel } from '@prisma/client';
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
        createdAt: true,
        updatedAt: true,
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

  async deleteUser(userId: string): Promise<UserPrismaModel> {
    try {
      const deleteHandler = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return deleteHandler;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // P2025 is the Prisma error code for record not found
        throw new NotFoundException(`User with ID ${userId} not found`);
      } else {
        throw new HttpException(
          'Error deleting user from the database',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async updateUser(userId: string, userData: CreateUserDto): Promise<UserPrismaModel> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userData.name,
        email: userData.email,
      },
    });
  }
}
