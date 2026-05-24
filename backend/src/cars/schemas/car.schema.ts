import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  originalPrice: number;

  @Prop({ required: true })
  type: string; // Sedan, SUV, Coupe, Convertible, etc.

  @Prop({ required: true })
  condition: string; // New, Used, Certified Pre-Owned

  @Prop()
  mileage: number;

  @Prop()
  engine: string;

  @Prop()
  transmission: string; // Automatic, Manual

  @Prop()
  fuelType: string; // Petrol, Diesel, Electric, Hybrid

  @Prop()
  color: string;

  @Prop()
  interiorColor: string;

  @Prop()
  seats: number;

  @Prop()
  doors: number;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  description: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isLuxury: boolean;

  @Prop({ default: 0 })
  views: number;

  @Prop()
  location: string;

  @Prop()
  vin: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.index({ brand: 'text', model: 'text', description: 'text' });