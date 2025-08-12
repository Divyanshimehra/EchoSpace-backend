import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, SpaceSchema } from '../schemas/space.schema';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
