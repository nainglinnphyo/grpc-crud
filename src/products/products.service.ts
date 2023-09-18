import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GrpcAbortedException, GrpcAlreadyExistsException, GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { Product, ProductById, createProduct } from 'src/@types/product';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }

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

    async findMany() {
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

}
