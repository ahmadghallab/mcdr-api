import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { Participant } from '../entities/participant.entity';
import { FindAllParticipantsDto } from '../dto/find-all-participants.dto';
import { ORDER_BY_RANK_DESC } from 'src/core/utils/order.util';

@Injectable()
export class ParticipantService {

  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>
  ) {}

  async findAll(participantsQueryDto: FindAllParticipantsDto): Promise<[Participant[], number]> {
    const { type, skip, take } = participantsQueryDto;

    return await this.participantRepository.findAndCount({
      where: { type }, 
      order: ORDER_BY_RANK_DESC,
      skip, 
      take
    });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOneByOrFail({ id });
    return participant;
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantRepository.save(createParticipantDto);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const participant = await this.participantRepository.findOneByOrFail({ id });
    return this.participantRepository.save({...participant, ...updateParticipantDto});
  }

  async remove(id: number): Promise<void> {
    await this.participantRepository.delete(id);
  }
}
