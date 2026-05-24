// src/auth/dto/login.dto.ts
import { IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string; // login with username

  @IsOptional()
  @IsString()
  email?: string; // login with email (fallback)

  @IsString()
  @MinLength(6)
  password: string;
}