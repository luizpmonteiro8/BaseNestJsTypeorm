import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class TestClientDto extends PartialType(CreateClientDto) {}
