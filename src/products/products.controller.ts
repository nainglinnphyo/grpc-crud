import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Product, ProductById, UpdateProduct, createProduct } from 'src/@types/product';
@Controller()
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  // find all product handler
  @GrpcMethod('ProductsService', 'FindMany')
  async findMany(): Promise<{ products: Product[] }> {
    return this.productsService.findMany()
  }

  // find by product id handler 
  @GrpcMethod('ProductsService', 'FindOne')
  async findOne(dto: ProductById): Promise<Product> {
    return this.productsService.findOne(dto)
  }

  // product create handler
  @GrpcMethod('ProductsService', 'CreateProduct')
  async createProduct(dto: createProduct): Promise<Product> {
    return this.productsService.createProduct(dto)
  }

  // product update handler
  @GrpcMethod('ProductsService', 'UpdateProduct')
  async updateProduct(dto: UpdateProduct): Promise<Product> {
    return this.productsService.updateProduct(dto)
  }

  @GrpcMethod('ProductsService', 'DeleteProduct')
  async deleteProduct(dto: ProductById): Promise<Product> {
    return this.productsService.deleteProduct(dto)
  }
}
