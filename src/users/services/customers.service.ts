import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    // private configService: ConfigService,
    // private productsService: ProductsService,
    // @Inject('PG') private clientPg: Client,
  ) {}

  findAll() {
    return this.customerRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });

    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
