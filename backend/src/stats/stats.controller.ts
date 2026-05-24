import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, AdminGuard)
  getDashboard() {
    return this.statsService.getDashboardStats();
  }

  @Get('public')
  getPublicStats() {
    return {
      premiumCars: 500,
      happyClients: 5000,
      successRate: 98,
      yearsExperience: 2,
    };
  }
}