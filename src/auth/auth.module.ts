// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // ← import bormi?

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // ← register() ga o'zgartiring
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy], // ← JwtStrategy providers da bormi?
  controllers: [AuthController],
  exports: [JwtModule, JwtStrategy, PassportModule], // ← exports ga ham qo'shing
})
export class AuthModule {}
