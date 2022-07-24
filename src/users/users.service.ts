import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<user> {
    try {
      return await this.prisma.user.create({ data });
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

  async findAll(): Promise<user[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          email: true,
          name: true,
        },
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<object> {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: { email: true },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
