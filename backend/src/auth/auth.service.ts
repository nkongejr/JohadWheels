// src/auth/auth.service.ts
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

// ─── Predefined Admin Accounts ────────────────────────────────
const ADMIN_ACCOUNTS = [
  {
    name: 'Harrison Muriithi',
    username: 'harrison',
    email: 'harrison@johadwheels.com',
    password: 'Admin@2026',
    role: 'admin',
  },
  {
    name: 'Dishon Mwathi',
    username: 'dishon',
    email: 'dishon@johadwheels.com',
    password: 'Admin@2026',
    role: 'admin',
  },
  {
    name: 'Joshmark Kivuma',
    username: 'joshmark',
    email: 'joshmark@johadwheels.com',
    password: 'Admin@2026',
    role: 'admin',
  },
];

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // ─── Register ─────────────────────────────────────────────────
  async register(registerDto: RegisterDto) {
    const { email, username, password, name, phone } = registerDto;

    // Check existing
    if (email) {
      const existingEmail = await this.userModel.findOne({ email });
      if (existingEmail) {
        throw new ConflictException('Email already registered');
      }
    }
    if (username) {
      const existingUsername = await this.userModel.findOne({ username });
      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    const user = new this.userModel({
      name,
      email,
      username,
      password,
      phone,
    });
    await user.save();

    const token = this.generateToken(user);

    return {
      token,
      user: this.sanitizeUser(user),
    };
  }

  // ─── Login (Username or Email) ─────────────────────────────────
  async login(loginDto: LoginDto) {
    const { username, email, password } = loginDto;

    if (!username && !email) {
      throw new UnauthorizedException(
        'Please provide username or email',
      );
    }

    // Find user by username OR email
    let user: UserDocument | null = null;

    if (username) {
      user = await this.userModel
        .findOne({ username: username.toLowerCase().trim() })
        .select('+password');
    } else if (email) {
      user = await this.userModel
        .findOne({ email: email.toLowerCase().trim() })
        .select('+password');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account has been deactivated');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      message: `Welcome back, ${user.name}!`,
      token,
      user: this.sanitizeUser(user),
    };
  }

  // ─── Setup All Admin Accounts ──────────────────────────────────
  async createAdmin() {
    const results: string[] = [];

    for (const adminData of ADMIN_ACCOUNTS) {
      // Check by username
      const exists = await this.userModel.findOne({
        username: adminData.username,
      });

      if (exists) {
        results.push(`${adminData.name} already exists`);
        continue;
      }

      const admin = new this.userModel({
        name: adminData.name,
        username: adminData.username,
        email: adminData.email,
        password: adminData.password,
        role: adminData.role,
        isActive: true,
      });

      await admin.save();
      results.push(`${adminData.name} created successfully`);
    }

    return {
      message: 'Admin setup complete',
      details: results,
      credentials: {
        password: 'Admin@2026',
        admins: ADMIN_ACCOUNTS.map((a) => ({
          name: a.name,
          username: a.username,
        })),
      },
    };
  }

  // ─── Get Profile ───────────────────────────────────────────────
  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }

  // ─── Helpers ───────────────────────────────────────────────────
  private generateToken(user: UserDocument) {
    const payload = {
      sub: user._id,
      userId: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: UserDocument) {
    return {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      isActive: user.isActive,
    };
  }
}