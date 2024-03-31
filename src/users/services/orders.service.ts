import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.orderRepo.find({ relations: ['customer'] });
  }

  // En la relacion hacia items, profundizamos para otener la info del prod
  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!order) throw new NotFoundException('order not found');
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: data.customerId,
      });
      newOrder.customer = customer;
    }

    return this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (changes.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: changes.customerId,
      });
      order.customer = customer;
    }

    this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }

  async ordersByCustomer(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['customer'],
    });

    console.log('user', user);

    return this.orderRepo.find({
      where: { customer: { id: user.customer.id } },
      relations: ['items', 'items.product'],
    });
  }
}
