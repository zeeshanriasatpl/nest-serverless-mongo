import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'aws-serverless-express';

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    
    await app.init();
    cachedServer = serverless.createServer(expressApp);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  const server = await bootstrap();
  return serverless.proxy(server, event, context, 'PROMISE').promise;
};
