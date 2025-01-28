import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await newUser.save();

      const returnUser = newUser.toObject();

      delete returnUser.password;

      return returnUser;
    } catch (error) {
      console.log(JSON.stringify(error))
      if ( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.create({
      ...registerDto
    })
    return {
      user,
      token: this.getJwtToken({id: user._id})
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({email});

    if (!user) throw new UnauthorizedException("Credenciales no válidas");

    if (!bcryptjs.compareSync(password, user.password || "") ) throw new UnauthorizedException("Credenciales no válidas");

    const { password:_, ...rest } = user.toJSON();
    
    
    return {
      user: rest,
      token: this.getJwtToken({id: user.id, })
    };
    /*
    
    
    */
  }

  checkToken(user: User): LoginResponse {
    return {
      user: user,
      token: this.getJwtToken({id: user._id})
    }
  }


  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    const {password, ...rest} = user.toJSON();
    return rest;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
    // const payload = { sub: user.userId, username: user.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
