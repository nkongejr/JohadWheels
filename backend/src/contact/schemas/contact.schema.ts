import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'pending' })
  status: string; // pending, replied, resolved

  @Prop()
  adminReply: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);