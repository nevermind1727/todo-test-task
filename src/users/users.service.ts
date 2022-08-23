import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create(dto)
        return user
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email})
        return user
    }

}
