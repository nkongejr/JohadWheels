import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter, NewsletterDocument } from './schemas/newsletter.schema';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Newsletter.name)
    private newsletterModel: Model<NewsletterDocument>,
  ) {}

  async subscribe(email: string) {
    const existing = await this.newsletterModel.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        throw new ConflictException('Email already subscribed');
      }
      existing.isActive = true;
      await existing.save();
      return { success: true, message: 'Resubscribed successfully!' };
    }

    await this.newsletterModel.create({ email });
    return {
      success: true,
      message: 'Subscribed successfully! Welcome to JOHAD WHEELS.',
    };
  }

  async unsubscribe(email: string) {
    await this.newsletterModel.findOneAndUpdate({ email }, { isActive: false });
    return { success: true, message: 'Unsubscribed successfully' };
  }

  async findAll() {
    return this.newsletterModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getCount() {
    return this.newsletterModel.countDocuments({ isActive: true });
  }
}