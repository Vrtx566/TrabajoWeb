import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository} from "@nestjs/typeorm";
import { User} from "./entities/auth.entity";
import { Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import { LoginAuthDto} from "./dto/login-dto";
import { JwtService} from "@nestjs/jwt";
import {Role} from "../enums/role.enum";
import * as process from "process";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    try {
      const user = this.userRepository.create(createAuthDto);
      user.password = await bcrypt.hash(user.password, 10);
      // Asignar el rol predeterminado
      user.roles = [Role.USER,Role.PROVIDER,Role.ADMIN];
      await this.userRepository.save(user);
      const { alias, email, roles } = user;
      return { user: { alias, email, roles } };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async checkToken(token: string) {
    try {
      const validToken = await this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, password } = loginAuthDto;
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { alias, roles } = user;
      const jwt = this.jwtService.sign({ alias, email, roles });

      return { user: { alias, email, jwt } };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
}
