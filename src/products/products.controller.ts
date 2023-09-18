import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Product, ProductById, createProduct } from 'src/@types/product';
@Controller()
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }


  @GrpcMethod('ProductsService', 'FindMany')
  async findMany() {
    return this.productsService.findMany()
  }

  @GrpcMethod('ProductsService', 'FindOne')
  async findOne(dto: ProductById): Promise<Product> {
    return this.productsService.findOne(dto)
  }

  @GrpcMethod('ProductsService', 'CreateProduct')
  async createProduct(dto: createProduct): Promise<Product> {
    return this.productsService.createProduct(dto)
  }
}
