import { Module } from '@nestjs/common';
import { OrderConsumer } from './kafka/order.consumer';

@Module({
  controllers: [OrderConsumer],
})
export class AppModule {}
