import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { Client } from 'src/client/entity/client.entity';
import { Pagination } from 'src/paginate/pagination';
import { PaginationOptionsInterface } from 'src/paginate/pagination.options.interface';

import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;

  findAll() {
    return this.clientRepository.find({
      relations: ['address'],
    });
  }

  findOne(id: string) {
    const client = this.clientRepository.findOne({
      where: {
        id: +id,
      },
      relations: ['address'],
    });

    if (!client) {
      throw new NotFoundException(`Cliente com ${id} não encontrado!`);
    }

    return client;
  }

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create({
      ...createClientDto,
    });
    this.clientRepository.save(client);
  }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Client>> {
    const [results, total] = await this.clientRepository.findAndCount({
      take: options.limit,
      skip: options.page,
    });

    return new Pagination<Client>({
      results,
      total,
    });
  }
}
