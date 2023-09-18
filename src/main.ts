import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

async function bootstrap() {
  //create grpc server with nest js factory
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5001', // product service grpc server run on port 5001
      package: 'product',
      protoPath: join(__dirname, 'proto/product.proto'), // path to microservice proto file
    },
  });
  app.useGlobalInterceptors(new GrpcToHttpInterceptor)
  app.listen()
}
bootstrap();
