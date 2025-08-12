import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Space, SpaceDocument } from 'src/schemas/space.schema';
import { Types } from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';

//message.service.ts: Move the Message-related test logic here

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async createMessage(
    senderId: string,
    spaceId: string, // this is the UUID from request
    type: string,
    content: string,
  ): Promise<Message> {
    console.log('Looking for space with spaceId:', spaceId);
    // Find the space by its UUID (spaceId)
    const space = await this.spaceModel.findOne({ spaceId });
    if (!space) {
      console.log('Space not found for spaceId:', spaceId);
      throw new NotFoundException('Space not found');
    }
    console.log('Found space:', space);
    //  Check membership
    if (!space.members.map((m) => m.toString()).includes(senderId)) {
      throw new ForbiddenException('User not a member of this space');
    }
    // Save message with UUID as spaceId (not ObjectId)
    const newMessage = new this.messageModel({
      senderId: new Types.ObjectId(senderId),
      spaceId,
      type,
      content,
    });
    return newMessage.save();
  }

  async findAllMessagesBySpace(spaceId: string): Promise<Message[]> {
    //Find space by its UUID
    console.log('Fetching messages for spaceId:', spaceId);
    const space = await this.spaceModel.findOne({ spaceId }).exec();
    if (!space) {
      console.log('Space not found for spaceId:', spaceId);
      throw new NotFoundException('Space not found');
    }
    console.log('Found space:', space);
    return this.messageModel
      .find({ spaceId })
      .sort({ createdAt: -1 }) //Sorting by createdAt: -1 means you get the newest messages first. (for "load more" when scrolling up)
      .exec();
  }

  /*
  You need methods for:
  Creating messages with dynamic type and content.
  Validating that the sender is a space member.
  Supporting image/file uploads (later with AWS S3).
  */
}
