import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const ms = require('ms');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  userGroup: 'Student' | 'Young_Adult';
  language?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    userId: string;
    name: string;
    email: string;
    userGroup: string;
    financialScore: number;
    language: string;
  };
  expiresIn: string;
}

export class AuthService {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('EMAIL_EXISTS');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        userGroup: data.userGroup,
        language: data.language || 'en'
      }
    });

    // Create progress record
    await prisma.progress.create({
      data: {
        userId: user.id
      }
    });

    // Generate JWT
    let expiresIn: number;
    if (typeof JWT_EXPIRY === 'string' && isNaN(Number(JWT_EXPIRY))) {
      const msValue = ms(JWT_EXPIRY);
      expiresIn = typeof msValue === 'number' ? Math.floor(msValue / 1000) : 24 * 60 * 60;
    } else {
      expiresIn = typeof JWT_EXPIRY === 'string' ? parseInt(JWT_EXPIRY, 10) : JWT_EXPIRY;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userGroup: user.userGroup
      },
      JWT_SECRET as string,
      { expiresIn }
    );

    return {
      token,
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
        userGroup: user.userGroup,
        financialScore: user.financialScore,
        language: user.language
      },
      expiresIn: JWT_EXPIRY
    };
  }

  async login(credentials: LoginDTO): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Verify password
    const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Generate JWT
    let expiresIn: number;
    if (typeof JWT_EXPIRY === 'string' && isNaN(Number(JWT_EXPIRY))) {
      const msValue = ms(JWT_EXPIRY);
      expiresIn = typeof msValue === 'number' ? Math.floor(msValue / 1000) : 24 * 60 * 60;
    } else {
      expiresIn = typeof JWT_EXPIRY === 'string' ? parseInt(JWT_EXPIRY, 10) : JWT_EXPIRY;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userGroup: user.userGroup
      },
      JWT_SECRET as string,
      { expiresIn }
    );

    return {
      token,
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
        userGroup: user.userGroup,
        financialScore: user.financialScore,
        language: user.language
      },
      expiresIn: JWT_EXPIRY
    };
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('INVALID_TOKEN');
    }
  }
}

export default new AuthService();
