import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  // Simulamos el id. Luego lo gestionará la BD

  private counterId = 0;
  private products: Product[] = [
    {
      id: 1,
      name: 'Camisas para hombre',
      brand: 'Calvin Klein',
      description: 'Camisas para hombre Calvin Klein - azul, negra, blanca',
      price: 20,
      stock: 27,
      image: 'https://...',
    },
    {
      id: 2,
      name: 'Calzado de seguridad',
      brand: 'Ombu',
      description: 'Calzado de trabajo Ombu Ozono. Segurida y Confort',
      price: 60,
      stock: 34,
      image: 'https://...',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('product not found');

    this.products.splice(index, 1);
    return { id };
  }
}
