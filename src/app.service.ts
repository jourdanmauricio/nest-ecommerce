import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    // Inyectamos la conexíon
    @Inject('PG') private clientPg: Client,
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    const apiKey = this.configService.apiKey;
    const dbNane = this.configService.database.name;
    return `Hello World! ${apiKey}: ${dbNane}`;
  }
  getTasks() {
    // Teníamos un callback, pero en next necesitamos retornar el resultado al controlador
    // a través de una promesa o un observable
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
