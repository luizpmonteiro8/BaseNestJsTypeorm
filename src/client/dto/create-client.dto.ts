import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto copy';

export class CreateClientDto {
  @IsString()
  readonly name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  readonly address: CreateAddressDto;
}
