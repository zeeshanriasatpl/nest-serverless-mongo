import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Create a new Todo
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  // Get all Todos
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  // Mark Todo as complete
  @Patch(':id')
  async markComplete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.markComplete(id);
  }

  // Get a single Todo by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findById(id);
  }

  // Delete a Todo
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
