// src/user/user.controller.ts
import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { QueryUserDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorators';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha userlar (filter + pagination)' })
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta user (orderlar bilan)' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Userni tahrirlash' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: "Userni o'chirish (Admin)" })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
