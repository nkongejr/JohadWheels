import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, phone } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = new this.userModel({ name, email, password, phone });
    await user.save();

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async createAdmin() {
    const adminExists = await this.userModel.findOne({ role: 'admin' });
    if (adminExists) return { message: 'Admin already exists' };

    const admin = new this.userModel({
      name: 'JOHAD Admin',
      email: 'admin@johadwheels.com',
      password: 'Admin@2024',
      role: 'admin',
    });
    await admin.save();
    return { message: 'Admin created successfully' };
  }

  private generateToken(user: UserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }
}