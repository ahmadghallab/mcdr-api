import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { Participant } from '../entities/participant.entity';
import { FindAllParticipantsDto } from '../dto/find-all-participants.dto';
import { ORDER_BY_RANK_DESC } from 'src/core/utils/order.util';
import { applySearch } from 'src/core/utils/apply-search.util';

@Injectable()
export class ParticipantService {

  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>
  ) {}

  async findAll(participantsQueryDto: FindAllParticipantsDto): Promise<[Participant[], number]> {
    const { type, skip, take, search } = participantsQueryDto;

    const qb = this.participantRepository
      .createQueryBuilder('p')
      .where('p.type = :type', { type })
      .orderBy('p.rank', 'ASC')
      .addOrderBy('p.id', 'ASC')
      .skip(skip)
      .take(take);

    if (search) {
      applySearch(qb, search, ['code', 'aname', 'ename'], 'p');
    }

    return await qb.getManyAndCount();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOneByOrFail({ id });
    return participant;
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return await this.participantRepository.manager.transaction(async (manager) => {
      const last = await manager.findOne(Participant, {
        where: { type: createParticipantDto.type },
        order: ORDER_BY_RANK_DESC,
        lock: { mode: 'pessimistic_write' },
      });
    
      const participant = manager.create(Participant, {
        ...createParticipantDto,
        rank: (last?.rank || 0) + 1,
      });
  
      return manager.save(participant);
    });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const participant = await this.participantRepository.findOneByOrFail({ id });
    return this.participantRepository.save({...participant, ...updateParticipantDto});
  }

  async remove(id: number): Promise<void> {
    await this.participantRepository.delete(id);
  }
}
