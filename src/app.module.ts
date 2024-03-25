import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import config from './config';

@Module({
  imports: [
    // indicamos el archivo .env y que será global
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      // cargamos la configuración
      load: [config],
      isGlobal: true,
      // Indicamos la validacion de schema
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
