// src/category/dto/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty() @IsString() name!: string;
 
}
