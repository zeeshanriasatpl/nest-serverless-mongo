import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  // Create a new Todo
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel({ title: createTodoDto.title });
    return newTodo.save();
  }

  // Find all Todos
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async markComplete(id: string): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, { completed: true }, { new: true })
      .exec();

    if (!updatedTodo) {
      throw new Error('Todo not found');
    }

    return updatedTodo;
  }

  async delete(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new Error('Todo not found');
    }
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new Error('Todo not found');
    }
    return deletedTodo;
  }
}
