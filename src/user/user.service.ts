import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
//import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async addFriend(userId: string, friendId: string): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true },
      )
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /*
  You need methods for:
  User registration (with password hashing).
  Friend management (add friend, search by username/ID).
  Profile picture upload (optional, can be added later with S3)
  */
}
