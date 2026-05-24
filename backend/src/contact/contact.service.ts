import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  private createTransporter() {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async create(createContactDto: CreateContactDto) {
    const contact = new this.contactModel(createContactDto);
    await contact.save();

    // Send notification email
    try {
      const transporter = this.createTransporter();
      await transporter.sendMail({
        from: `"JOHAD WHEELS" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: `New Contact: ${createContactDto.subject || 'General Inquiry'}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${createContactDto.name}</p>
          <p><strong>Email:</strong> ${createContactDto.email}</p>
          <p><strong>Phone:</strong> ${createContactDto.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${createContactDto.subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${createContactDto.message}</p>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"JOHAD WHEELS" <${process.env.MAIL_USER}>`,
        to: createContactDto.email,
        subject: 'Thank you for contacting JOHAD WHEELS',
        html: `
          <h2>Thank you, ${createContactDto.name}!</h2>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>At JOHAD WHEELS, your satisfaction is our priority.</p>
          <br>
          <p>Best regards,<br>JOHAD WHEELS Team<br>Karatina, Kenya</p>
        `,
      });
  } catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);

  console.error('Email send failed:', message);
}

    return {
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      contact,
    };
  }

  async findAll() {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string, adminReply?: string) {
    return this.contactModel
      .findByIdAndUpdate(id, { status, adminReply }, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.contactModel.findByIdAndDelete(id).exec();
  }

  async getStats() {
    const total = await this.contactModel.countDocuments();
    const pending = await this.contactModel.countDocuments({
      status: 'pending',
    });
    const replied = await this.contactModel.countDocuments({
      status: 'replied',
    });
    return { total, pending, replied };
  }
}