import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmail(dto.email)
        if (!candidate) throw new UnauthorizedException({message: 'Invalid email address'})
        const comparedPass = await bcrypt.compare(dto.password, candidate.password)
        if (!comparedPass) throw new UnauthorizedException({message: 'Invalid password'})
        return this.generateToken(candidate)
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmail(dto.email)
        if (candidate) throw new HttpException("User with this email already registered", HttpStatus.BAD_REQUEST)
        const hash = await bcrypt.hash(dto.password, 10)
        const newUser = await this.usersService.createUser({...dto, password: hash})
        return this.generateToken(newUser)
    }

    private async generateToken(user) {
        const payload = {id: user._id, email: user.email}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
