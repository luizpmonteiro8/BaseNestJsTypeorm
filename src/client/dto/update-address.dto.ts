import { IsNumber, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;
}
