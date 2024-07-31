/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TaskMicroserviceModule } from './task-microservice.module';

async function bootstrap() {
    try{
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskMicroserviceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'tasks_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  );
  await app.listen();
  console.log("microservice is listening");
    } catch (error) {
        console.error('failed to start microservice:' , error);
        
    }
  
}
bootstrap();