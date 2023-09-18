import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { GrpcServerExceptionFilter } from "nestjs-grpc-exceptions"
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, {
    provide: APP_FILTER,
    useClass: GrpcServerExceptionFilter,
  },]
})
export class ProductsModule { }
