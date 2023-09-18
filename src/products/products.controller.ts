import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductsService as ProductDbService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Product, ProductById, createProduct } from 'src/@types/product';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller()
export class ProductsController {

  constructor(private readonly productsService: ProductDbService) { }

  @GrpcMethod('ProductsService', 'FindOne')
  // @UseInterceptors(GrpcToHttpInterceptor)
  async findOne(dto: ProductById): Promise<Product> {
    return this.productsService.findOne(dto)
  }

  @GrpcMethod('ProductsService', 'CreateProduct')
  // @UseInterceptors(GrpcToHttpInterceptor)
  async createProduct(dto: createProduct): Promise<Product> {
    return this.productsService.createProduct(dto)
  }
}
