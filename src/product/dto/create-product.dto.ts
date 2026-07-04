// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsNumber() price!: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty() @IsString() image!: string;
  @ApiProperty({ example: 'uuid' }) @IsString() categoryId!: string;
}
