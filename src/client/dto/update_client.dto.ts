import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateClientDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  readonly address: UpdateAddressDto;
}
