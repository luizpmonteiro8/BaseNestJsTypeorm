import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async signup(signupDto: SignUpDto): Promise<User> {
    const user = this.userRepository.create({
      ...signupDto,
      password: await this.generatePasswordEncryption(signupDto.password),
    });

    return this.userRepository.save(user);
  }

  public async signin(
    signinDto: SignInDto,
  ): Promise<{ name: string; authorization: string; email: string }> {
    const user = await this.findByEmail(signinDto.email);
    const match = await this.checkPassword(signinDto.password, user);

    if (!match) {
      throw new NotFoundException('Credenciais invalida.');
    }

    const jwtToken = await this.authService.createAccessToken(user.id);

    return { name: user.name, authorization: jwtToken, email: user.email };
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email não encontrado.');
    }
    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Senha incorreta.');
    }
    return match;
  }

  private async generatePasswordEncryption(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
