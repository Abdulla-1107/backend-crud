// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });
    if (existing) throw new ConflictException('Bu telefon raqam band');

    const hashed = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.create({
      data: { username: dto.username, phone: dto.phone, password: hashed },
    });

    return { message: "Muvaffaqiyatli ro'yxatdan o'tdingiz" };
  }

  async login(dto: LoginDto) {
    console.log(dto.phone);

    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });
    if (!user) throw new UnauthorizedException("Telefon yoki parol noto'g'ri");

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException("Telefon yoki parol noto'g'ri");

    const token = this.jwt.sign({ sub: user.id, role: user.phone });
    return { token };
  }
}
