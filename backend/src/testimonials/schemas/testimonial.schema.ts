import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop()
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 5, min: 1, max: 5 })
  rating: number;

  @Prop()
  avatar: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isFeatured: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);