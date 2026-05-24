import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body('email') email: string) {
    return this.newsletterService.subscribe(email);
  }

  @Post('unsubscribe')
  unsubscribe(@Body('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get('count')
  getCount() {
    return this.newsletterService.getCount();
  }
}