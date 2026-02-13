import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'analytics-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'analytics-group',
        },
      },
    },
  );

  await app.listen();
  console.log('📊 Analytics Service is listening (group: analytics-group)');
}
bootstrap();
