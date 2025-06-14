import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParticipantService } from '../services/participant.service';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { FindAllParticipantsDto } from '../dto/find-all-participants.dto';

@Controller('participants')
export class ParticipantController {
  constructor(
    private readonly participantService: ParticipantService,
  ) {}

  @Post()
  create(
    @Body() CreateParticipantDto: CreateParticipantDto
  ) {
    return this.participantService.create(CreateParticipantDto);
  }

  @Get()
  async findAll(
    @Query() participantsQueryDto: FindAllParticipantsDto,
  ) {
    const { page, limit } = participantsQueryDto;
    const [items, total] = await this.participantService.findAll(participantsQueryDto)

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
