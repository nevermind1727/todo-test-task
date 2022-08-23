import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Todo } from 'src/todos/todos.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);