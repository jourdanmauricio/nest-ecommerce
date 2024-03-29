import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemsService } from '../services/order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderImtesService: OrderItemsService) {}

  @Get()
  findAll() {
    return this.orderImtesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.orderImtesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderImtesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.orderImtesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderImtesService.remove(id);
  }
}
