import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  // Relación hacia products
  // No habililitamos la relación bidireccional
  // porque no nos interesa obtener las ordernes
  // en las que participó un producto.
  @ManyToOne(() => Product)
  product: Product;

  // Relación hacia orders
  // En este caso si establecemos la bidireccionalidad
  // Nos interesa los items de una orden,
  // y desde los obtener la info de la orden
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
