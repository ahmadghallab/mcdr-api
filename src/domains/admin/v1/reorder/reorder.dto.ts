import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt, Min, ValidateNested } from 'class-validator';

export class ReorderItemDto {
  @IsInt()
  id: number;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderDto {
  @ValidateNested({ each: true })
  @Type(() => ReorderItemDto)
  @ArrayNotEmpty()
  items: ReorderItemDto[];
}