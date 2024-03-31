import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

// para que todos los enpoints de el controlador esten protegidos
// colocamos el decodador arriba del controlador
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // SetMetadata nos permite enviar metadatos
  // que podemos recibir en el contexto del guardian
  @Get()
  // @UseGuards(ApiKeyGuard)
  // @SetMetadata('isPublic', true)
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): string {
    return 'Server working correctly';
  }
}
