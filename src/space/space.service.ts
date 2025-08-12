import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Space, SpaceDocument } from '../schemas/space.schema';
import { v4 as uuidv4 } from 'uuid';

//spaces.service.ts: Move the Space-related test logic here

@Injectable()
export class SpaceService {
  constructor(
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async createSpace(name: string, adminId: string): Promise<Space> {
    console.log('Creating space with adminId:', adminId);
    const spaceId = uuidv4();
    const newSpace = new this.spaceModel({
      name,
      spaceId,
      adminId: new Types.ObjectId(adminId),
      members: [new Types.ObjectId(adminId)], // Initialize with admin as the first member
    });
    const savedSpace = await newSpace.save();
    console.log('Saved space:', savedSpace);
    return savedSpace;
  }

  async findAllSpaces(): Promise<Space[]> {
    return this.spaceModel.find().exec();
  }

  async findBySpaceId(spaceId: string): Promise<Space | null> {
    return this.spaceModel.findOne({ spaceId }).exec();
  }

  async findByName(name: string): Promise<Space[]> {
    return this.spaceModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async joinSpace(spaceId: string, userId: string): Promise<Space> {
    const space = await this.spaceModel
      .findOneAndUpdate(
        { spaceId },
        { $addToSet: { members: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();

    if (!space) throw new NotFoundException('Space not found');
    return space;
  }

  async leaveSpace(spaceId: string, userId: string): Promise<Space> {
    const space = await this.spaceModel
      .findOneAndUpdate(
        { spaceId },
        { $pull: { members: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();

    if (!space) throw new NotFoundException('Space not found');
    return space;
  }

  async addMember(
    spaceId: string,
    adminId: string,
    memberId: string,
  ): Promise<Space> {
    const space = await this.spaceModel
      .findOneAndUpdate(
        { spaceId, adminId: new Types.ObjectId(adminId) },
        { $addToSet: { members: new Types.ObjectId(memberId) } },
        { new: true },
      )
      .exec();
    if (!space) throw new NotFoundException('Space not found or not admin');
    return space;
  }

  async removeMember(
    spaceId: string,
    adminId: string,
    memberId: string,
  ): Promise<Space> {
    const space = await this.spaceModel
      .findOneAndUpdate(
        { spaceId, adminId: new Types.ObjectId(adminId) },
        { $pull: { members: new Types.ObjectId(memberId) } },
        { new: true },
      )
      .exec();
    if (!space) throw new NotFoundException('Space not found or not admin');
    return space;
  }

  /*
  You need methods for:
  Creating spaces with dynamic name and adminId.
  Joining/leaving spaces (update members array).
  Searching spaces by name or spaceId.
  Adding/removing members (admin-only).

  */
}
