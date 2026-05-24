import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateData: any) {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async getStats() {
    const total = await this.userModel.countDocuments();
    const admins = await this.userModel.countDocuments({ role: 'admin' });
    const active = await this.userModel.countDocuments({ isActive: true });
    return { total, admins, active };
  }
}