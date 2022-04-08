import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client/client.controller';
import { Address } from './client/entity/address.entity';
import { Client } from './client/entity/client.entity';
import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.services';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'nest',
      entities: ['dist' + '/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ClientModule,
    TypeOrmModule.forFeature([Client, Address, User]),
  ],
  controllers: [ClientController, UsersController],
  providers: [ClientService, UsersService, AuthService],
})
export class AppModule {}
