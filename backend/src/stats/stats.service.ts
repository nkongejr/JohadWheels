import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from '../cars/schemas/car.schema';
import { Contact, ContactDocument } from '../contact/schemas/contact.schema';
import {
  Newsletter,
  NewsletterDocument,
} from '../newsletter/schemas/newsletter.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    @InjectModel(Newsletter.name)
    private newsletterModel: Model<NewsletterDocument>,
  ) {}

  async getDashboardStats() {
    const [
      totalCars,
      availableCars,
      featuredCars,
      luxuryCars,
      totalContacts,
      pendingContacts,
      subscribers,
      brands,
    ] = await Promise.all([
      this.carModel.countDocuments(),
      this.carModel.countDocuments({ isAvailable: true }),
      this.carModel.countDocuments({ isFeatured: true }),
      this.carModel.countDocuments({ isLuxury: true }),
      this.contactModel.countDocuments(),
      this.contactModel.countDocuments({ status: 'pending' }),
      this.newsletterModel.countDocuments({ isActive: true }),
      this.carModel.distinct('brand'),
    ]);

    return {
      cars: {
        total: totalCars,
        available: availableCars,
        featured: featuredCars,
        luxury: luxuryCars,
      },
      contacts: {
        total: totalContacts,
        pending: pendingContacts,
      },
      newsletter: {
        subscribers,
      },
      brands: brands.length,
      highlights: {
        premiumCars: 500,
        happyClients: 5000,
        successRate: 98,
        yearsExperience: 2,
      },
    };
  }
}