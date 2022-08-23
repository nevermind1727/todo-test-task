import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';
import { Todo, TodoDocument } from './todos.schema';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async createTodo(dto: CreateTodoDto): Promise<Todo> {
        const todo = await this.todoModel.create(dto)
        return todo
    }

    async getAllTodos(completed: boolean): Promise<Todo[]> {
        const todos = await this.todoModel.find({isCompleted: completed})
        return todos
    }

    async getTodoById(id: string): Promise<Todo> {
        const todo = await this.todoModel.findById(id)
        return todo
    }

    async updateTodoById(id: string, dto: EditTodoDto): Promise<Todo> {
        const todo = await this.todoModel.findByIdAndUpdate(id, dto)
        return todo
    }

    async deleteTodoById(id: string): Promise<Todo> {
        const todo = await this.todoModel.findByIdAndDelete(id)
        return todo
    }
}
