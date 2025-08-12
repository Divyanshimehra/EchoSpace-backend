// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

// import { UserSchema, User } from './user.schema';
// import { SpaceSchema, Space } from './space.schema';
// import { MessageSchema, Message } from './message.schema';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRoot(process.env.MONGO_URI || ''),
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//       { name: Space.name, schema: SpaceSchema },
//       { name: Message.name, schema: MessageSchema },
//     ]),
//   ],
// })
// export class AppModule {}
