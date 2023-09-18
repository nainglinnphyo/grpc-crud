import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GrpcAbortedException, GrpcAlreadyExistsException, GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { Product, ProductById, UpdateProduct, createProduct } from 'src/@types/product';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }

    // find by product id
    async findOne(dto: ProductById): Promise<Product> {
        return this.prismaService.product.findUniqueOrThrow({
            where: {
                id: dto.id
            }
        })
            .then((d) => d)
            .catch((e) => {
                throw new GrpcNotFoundException({ message: e.message || 'No product found', status: 404 });
            })
    }

    // create product
    async createProduct(dto: createProduct): Promise<Product> {
        return this.prismaService.product.create({
            data: {
                name: dto.name,
                price: dto.price
            }
        })
            .then((d) => d)
            .catch((e) => {
                if (e.code === 'P2002') {
                    throw new GrpcAlreadyExistsException({ message: 'Product already exist.', status: 409 })
                }
                throw new GrpcAbortedException({ message: 'Internal server error', status: 500 });
            })
    }

    // find all product
    async findMany(): Promise<{ products: Product[] }> {
        return this.prismaService.product.findMany()
            .then((d) => {
                return {
                    products: d
                }
            })
            .catch((e) => {
                throw new GrpcAbortedException({ message: 'Internal server error', status: 500 });
            })
    }

    // update product
    async updateProduct(dto: UpdateProduct): Promise<Product> {
        return this.prismaService.product.update({
            where: {
                id: dto.id
            },
            data: {
                name: dto.name,
                price: dto.price
            }
        })
            .then((d) => d)
            .catch((e) => {
                if (e.code === 'P2002') {
                    throw new GrpcAlreadyExistsException({ message: 'Product already exist.', status: 409 })
                }
                throw new GrpcAbortedException({ message: 'Internal server error', status: 500 });
            })
    }

    // delete product
    async deleteProduct(dto: ProductById): Promise<Product> {
        return this.prismaService.product.delete({
            where: {
                id: dto.id
            }
        })
            .then((d) => d)
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new GrpcAlreadyExistsException({ message: 'Product not found.', status: 409 })
                }
                throw new GrpcAbortedException({ message: 'Internal server error', status: 500 });
            })
    }

}
