import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get('search')
  async findByUsername(@Query('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Post('friends')
  async addFriend(
    @Body('userId') userId: string,
    @Body('friendId') friendId: string,
  ): Promise<User> {
    return this.userService.addFriend(userId, friendId);
  }
}
