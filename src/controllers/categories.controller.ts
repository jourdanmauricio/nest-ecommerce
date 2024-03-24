import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  // Si recibimos dos parámetros
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Respuesta producto id: ${productId} de la categoría id: ${id}`;
  }
}
