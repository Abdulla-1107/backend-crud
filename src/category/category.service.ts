// src/category/category.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { name: dto.name },
    });
    if (existing)
      throw new ConflictException('Bu kategoriya allaqachon mavjud!');

    return this.prisma.category.create({ data: dto });
  }
  async remove(id: string) {
    const data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not found');
    }
    return await this.prisma.category.delete({ where: { id } });
  }
}
