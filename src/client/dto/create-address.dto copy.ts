import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;
}
