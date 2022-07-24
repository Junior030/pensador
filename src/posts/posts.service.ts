import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      return await this.prisma.posts.create({ data: createPostDto });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.prisma.posts.findMany();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.prisma.posts.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePostsDto: UpdatePostDto): Promise<Post> {
    try {
      return await this.prisma.posts.update({
        where: {
          id,
        },
        data: updatePostsDto,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Post> {
    try {
      return await this.prisma.posts.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
