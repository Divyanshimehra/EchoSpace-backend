import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/schemas/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body('senderId') senderId: string,
    @Body('spaceId') spaceId: string,
    @Body('type') type: string,
    @Body('content') content: string,
  ): Promise<Message> {
    return this.messageService.createMessage(senderId, spaceId, type, content);
  }

  @Get(':spaceId')
  async findAllMessagesBySpace(
    @Param('spaceId') spaceId: string,
  ): Promise<Message[]> {
    return this.messageService.findAllMessagesBySpace(spaceId);
  }
}
