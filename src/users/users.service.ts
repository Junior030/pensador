import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';

const select = {
  id: true,
  email: true,
  name: true,
};

type TUser = {
  id: number;
  name: string;
  email: string;
};

type TPayload = {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<TUser> {
    try {
      return await this.prisma.user.create({
        data,
        select,
      });
    } catch (error) {
      if (error.message.substring('Unique constraint')) {
        throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<TUser[]> {
    try {
      return await this.prisma.user.findMany({
        select,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<TUser> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string): Promise<user> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    user: TPayload,
  ): Promise<TUser> {
    try {
      if (id !== user.id) throw new Error('users');

      return await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.message.substring('users')) {
        throw new HttpException(
          'You cannot edit other users!',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, user): Promise<TUser> {
    try {
      if (id !== user.id) throw new Error('users');

      return await this.prisma.user.delete({
        where: { id },
        select,
      });
    } catch (error) {
      if (error.message.substring('users')) {
        throw new HttpException(
          'You cannot delete other users!',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
