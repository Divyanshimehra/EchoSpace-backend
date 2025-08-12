import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerDto: RegisterDto): Promise<Partial<User>> {
    const { username, email, password } = registerDto;
    const existingUser = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // Sanitize: exclude password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...sanitizedUser } = savedUser.toObject();
    return sanitizedUser;
  }
}
