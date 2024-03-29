import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { OrderItem } from './../entities/order-item.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  findAll() {
    return this.orderItemRepo.find({
      relations: ['order', 'order.customer'],
    });
  }

  findOne(id: number) {
    return this.orderItemRepo.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: data.orderId });
    const product = await this.productRepo.findOneBy({ id: data.productId });

    const newOrderItem = new OrderItem();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;

    return this.orderItemRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOneBy({ id });
    if (changes.orderId) {
      const order = await this.orderRepo.findOneBy({ id: changes.orderId });
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOneBy({
        id: changes.productId,
      });
      orderItem.product = product;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.orderItemRepo.save(orderItem);
  }

  remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
