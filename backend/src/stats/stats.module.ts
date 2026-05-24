import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Car, CarSchema } from '../cars/schemas/car.schema';
import { Contact, ContactSchema } from '../contact/schemas/contact.schema';
import {
  Newsletter,
  NewsletterSchema,
} from '../newsletter/schemas/newsletter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Newsletter.name, schema: NewsletterSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}