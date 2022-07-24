import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

type TPayload = {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
};
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

  async update(
    id: number,
    updatePostsDto: UpdatePostDto,
    user: TPayload,
  ): Promise<Post> {
    try {
      const post = await this.findOne(id);

      if (post.userId !== user.id) throw new Error('posts');

      return await this.prisma.posts.update({
        where: {
          id,
        },
        data: updatePostsDto,
      });
    } catch (error) {
      if (error.message.substring('posts')) {
        throw new HttpException(
          'You cannot edit other users` posts!',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal Server Error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, user: TPayload): Promise<Post> {
    try {
      const post = await this.findOne(id);

      if (post.userId !== user.id) throw new Error('posts');
      return await this.prisma.posts.delete({
        where: { id },
      });
    } catch (error) {
      if (error.message.substring('posts')) {
        throw new HttpException(
          'You cannot delete other users` posts!',
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
