import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from 'src/client/client.controller';
import { Address } from 'src/client/entity/address.entity';
import { Client } from 'src/client/entity/client.entity';
import { ClientService } from 'src/client/client.services';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Address])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
