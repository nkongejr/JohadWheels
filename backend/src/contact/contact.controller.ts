import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, AdminGuard)
  getStats() {
    return this.contactService.getStats();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; adminReply?: string },
  ) {
    return this.contactService.updateStatus(id, body.status, body.adminReply);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}