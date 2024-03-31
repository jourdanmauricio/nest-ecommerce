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
}
