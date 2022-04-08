import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;
}
