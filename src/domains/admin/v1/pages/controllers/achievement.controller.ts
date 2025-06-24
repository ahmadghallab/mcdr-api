import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AchievementService } from '../services/achievement.service';
import { CreateAchievementDto } from '../dto/create-achievement.dto';
import { UpdateAchievementDto } from '../dto/update-achievement.dto';

@Controller('achievements')
export class AchievementController {
  constructor(
    private readonly achievementService: AchievementService,
  ) {}

  @Post()
  create(
    @Body() CreateAchievementDto: CreateAchievementDto
  ) {
    return this.achievementService.create(CreateAchievementDto);
  }

  @Get()
  findAll() {
    return this.achievementService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.achievementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementService.update(+id, updateAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementService.remove(+id);
  }
}
