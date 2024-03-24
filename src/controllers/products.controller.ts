/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  // El Pipe Se envía como segundo parámetro en el decorador
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
