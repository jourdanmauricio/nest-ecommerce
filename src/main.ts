import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Elimina del payload los atributos que no esten definidos en el dto
      whitelist: true,
      // Rechaza la petición indicando que se envía un atributo que no es esperado
      forbidNonWhitelisted: true,
    }),
  );

  // documentacion swagger
  const config = new DocumentBuilder()
    .setTitle('My e-commerce API')
    .setDescription('Documentación de my e-commerce API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // la documentacion se verá en el endpoint http://localhost:3000/docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
