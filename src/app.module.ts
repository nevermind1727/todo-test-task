import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}), MongooseModule.forRoot(process.env.MONGO_URI), TodosModule, UsersModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}
