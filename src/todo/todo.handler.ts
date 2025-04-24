import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

let app;
let todoService;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.createApplicationContext(AppModule);
    todoService = app.get(TodoService);
  }
  return { app, todoService };
}

export const handler = async (event, context) => {
  await bootstrap();

  const { httpMethod, path, pathParameters, body } = event;
  const id = pathParameters?.id;

  console.log("Https method == ", httpMethod)
  try {
    switch (httpMethod) {
      case 'POST':
        const createDto: CreateTodoDto = JSON.parse(body);
        return {
          statusCode: 201,
          body: JSON.stringify(await todoService.create(createDto)),
        };

      case 'GET':
        if (id) {
          return {
            statusCode: 200,
            body: JSON.stringify(await todoService.findOne(id)),
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(await todoService.findAll()),
        };

      case 'PATCH':
        const updateDto: UpdateTodoDto = JSON.parse(body);
        return {
          statusCode: 200,
          body: JSON.stringify(await todoService.update(id, updateDto)),
        };

      case 'DELETE':
        return {
          statusCode: 200,
          body: JSON.stringify(await todoService.remove(id)),
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
