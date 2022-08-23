import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Post()
    createTodo(@Body() dto: CreateTodoDto) {
        return this.todosService.createTodo(dto)
    }

    @Get()
    getAllTodos(@Query("completed") completed: boolean) {
        return this.todosService.getAllTodos(completed)
    }

    @Get(":id")
    getTodoById(@Param("id") id: string) {
        return this.todosService.getTodoById(id)
    }

    @Patch(":id")
    updateTodoById(@Param("id") id: string, @Body() dto: EditTodoDto) {
        return this.todosService.updateTodoById(id, dto)
    }

    @Delete(":id")
    deleteTodoById(@Param("id") id: string) {
        return this.todosService.deleteTodoById(id)
    }
}
