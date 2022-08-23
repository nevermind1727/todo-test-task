import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './todos.schema';
import { TodosService } from './todos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]), AuthModule, JwtModule],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
