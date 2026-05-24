import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Testimonial,
  TestimonialDocument,
} from './schemas/testimonial.schema';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private testimonialModel: Model<TestimonialDocument>,
  ) {}

  async findAll() {
    return this.testimonialModel
      .find({ isActive: true })
      .sort({ isFeatured: -1, createdAt: -1 })
      .exec();
  }

  async create(data: any) {
    const testimonial = new this.testimonialModel(data);
    return testimonial.save();
  }

  async update(id: string, data: any) {
    return this.testimonialModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.testimonialModel.findByIdAndDelete(id).exec();
  }

  async seed() {
    const count = await this.testimonialModel.countDocuments();
    if (count > 0) return;

    const testimonials = [
      {
        name: 'John Mwangi',
        title: 'CEO, Tech Startup',
        message:
          'JOHAD WHEELS provided exceptional service. Found my dream BMW within budget. Highly recommended!',
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'Sarah Kamau',
        title: 'Business Owner',
        message:
          'Amazing experience! The team was professional and helped me find the perfect Range Rover. Very satisfied!',
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'David Ochieng',
        title: 'Engineer',
        message:
          'Great selection of luxury cars at competitive prices. The financing options made it easy to get my Mercedes. Thank you!',
        rating: 5,
        isActive: true,
        isFeatured: true,
      },
    ];

    await this.testimonialModel.insertMany(testimonials);
  }
}