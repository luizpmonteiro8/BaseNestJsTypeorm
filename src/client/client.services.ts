import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { Client } from 'src/client/entity/client.entity';

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

  async paginate(limit: number, page: number) {
    const [results, totalItems] = await this.clientRepository.findAndCount({
      take: limit,
      skip: page * limit,
    });
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Number(page) + 1;

    return {
      results,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage,
        lastPage: totalPages == currentPage ? true : false,
      },
    };
  }
}
