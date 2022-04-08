import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { ClientService } from 'src/client/client.services';
import { AuthGuard } from '@nestjs/passport';
import { UpdateClientDto } from './dto/update_client.dto';
import { TestClientDto } from './dto/test-client.dto';

@Controller('client')
@UseGuards(AuthGuard('jwt'))
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.clientService.paginate(
      request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      request.query.hasOwnProperty('page') ? request.query.page : 0,
    );
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: TestClientDto) {
    console.log(updateClientDto);

    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
