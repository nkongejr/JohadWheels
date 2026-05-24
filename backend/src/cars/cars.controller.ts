import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  findAll(@Query() filterDto: FilterCarDto) {
    return this.carsService.findAll(filterDto);
  }

  @Get('featured')
  findFeatured() {
    return this.carsService.findFeatured();
  }

  @Get('luxury')
  findLuxury() {
    return this.carsService.findLuxury();
  }

  @Get('brands')
  getBrands() {
    return this.carsService.getBrands();
  }

  @Get('types')
  getTypes() {
    return this.carsService.getTypes();
  }

  @Get('stats')
  getStats() {
    return this.carsService.getStats();
  }

  @Get('seed')
  seed() {
    return this.carsService.seedCars();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Post('upload-images')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadImage(file),
    );
    const results = await Promise.all(uploadPromises);
    return { urls: results.map((r) => r.secure_url) };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}