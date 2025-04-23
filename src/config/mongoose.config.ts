import { ConfigModule } from '@nestjs/config';

export const MongooseConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});
