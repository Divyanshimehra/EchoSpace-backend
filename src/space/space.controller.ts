import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { SpaceService } from './space.service';
import { Space } from 'src/schemas/space.schema';

@Controller('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(
    @Body('name') name: string,
    @Body('adminId') adminId: string,
  ): Promise<Space> {
    return this.spaceService.createSpace(name, adminId);
  }

  @Get()
  async findAllSpaces(): Promise<Space[]> {
    return this.spaceService.findAllSpaces();
  }

  @Get('search')
  async findBySpaceId(
    @Query('spaceId') spaceId: string,
  ): Promise<Space | null> {
    return this.spaceService.findBySpaceId(spaceId);
  }

  @Get('search-by-name')
  async findByName(@Query('name') name: string): Promise<Space[]> {
    return this.spaceService.findByName(name);
  }

  @Post('join')
  async joinSpace(
    @Body('spaceId') spaceId: string,
    @Body('userId') userId: string,
  ): Promise<Space> {
    return this.spaceService.joinSpace(spaceId, userId);
  }

  @Post('leave')
  async leaveSpace(
    @Body('spaceId') spaceId: string,
    @Body('userId') userId: string,
  ): Promise<Space> {
    return this.spaceService.leaveSpace(spaceId, userId);
  }

  @Post('add-member')
  async addMember(
    @Body('spaceId') spaceId: string,
    @Body('adminId') adminId: string,
    @Body('memberId') memberId: string,
  ): Promise<Space> {
    return this.spaceService.addMember(spaceId, adminId, memberId);
  }

  @Post('remove-member')
  async removeMember(
    @Body('spaceId') spaceId: string,
    @Body('adminId') adminId: string,
    @Body('memberId') memberId: string,
  ): Promise<Space> {
    return this.spaceService.removeMember(spaceId, adminId, memberId);
  }
}
