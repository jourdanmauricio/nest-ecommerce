import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    // private brandsService: BrandsService,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};

      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async removeCategoryByProd(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProd(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    // Si hay cambio de marca
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }

    // Si hay cambios en categorías
    // Esto funciona pero desde el front siempre
    // se debe enviar todas las categorías.

    // Una buena práctica para el manejo de arrays es
    // separarlo en un método diferente
    // y generar endpoints para agregar o quitar categorias
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
