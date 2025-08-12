import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SpaceDocument = Space & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Space {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  spaceId: string; // Public UUID

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId; // Mongo ObjectId for admin

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: Types.ObjectId[]; // Mongo ObjectId for members
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
