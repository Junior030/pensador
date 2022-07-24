import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<user> {
    return await this.prisma.user.create({ data });
  }

  async findAll(): Promise<user[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<object> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<user> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<object> {
    return await this.prisma.user.delete({
      where: { id },
      select: { email: true },
    });
  }
}
