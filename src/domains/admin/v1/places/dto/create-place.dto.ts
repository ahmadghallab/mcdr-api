import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsArray, ArrayMinSize } from 'class-validator';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { LocationType } from 'src/core/common/enums/location-type.enum';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { IsGoogleMapsIframeUrl } from '../validators/google-maps-iframe.validator';

export class CreatePlaceDto {
  @IsObject()
  @IsNotEmpty()
  address: TranslationDto;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  phones?: string[];

  @IsGoogleMapsIframeUrl({ message: 'Invalid Google Maps iframe URL.' })
  iframeSrc: string;

  @IsEnum(LocationType)
  type: LocationType;

  @IsEnum(PublishStatus)
  status: PublishStatus;
}
