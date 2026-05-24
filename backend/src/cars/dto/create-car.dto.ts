import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsString()
  type: string;

  @IsString()
  condition: string;

  @IsOptional()
  @IsNumber()
  mileage?: number;

  @IsOptional()
  @IsString()
  engine?: string;

  @IsOptional()
  @IsString()
  transmission?: string;

  @IsOptional()
  @IsString()
  fuelType?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  interiorColor?: string;

  @IsOptional()
  @IsNumber()
  seats?: number;

  @IsOptional()
  @IsNumber()
  doors?: number;

  @IsOptional()
  @IsArray()
  features?: string[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isLuxury?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  vin?: string;
}