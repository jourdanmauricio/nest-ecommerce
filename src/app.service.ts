import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    // const apiKey = this.configService.get('API_KEY');
    // const dbNane = this.configService.get('DATABASE_NAME');
    const apiKey = this.configService.apiKey;
    const dbNane = this.configService.database.name;
    return `Hello World! ${apiKey}: ${dbNane}`;
  }
}
