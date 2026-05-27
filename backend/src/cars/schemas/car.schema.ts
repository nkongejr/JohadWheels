// src/cars/schemas/car.schema.ts
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
  type: string;

  @Prop({ required: true })
  condition: string;

  @Prop()
  mileage: number;

  @Prop()
  engine: string;

  @Prop()
  transmission: string;

  @Prop()
  fuelType: string;

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

  @Prop({ default: false })   // ← NEW
  isSold: boolean;

  @Prop()                     // ← NEW
  soldAt: Date;

  @Prop({ default: 0 })
  views: number;

  @Prop()
  location: string;

  @Prop()
  vin: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.index({ brand: 'text', model: 'text', description: 'text' });