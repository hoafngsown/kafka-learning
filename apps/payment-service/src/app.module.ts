import { Module } from '@nestjs/common';
import { PaymentConsumer } from './kafka/payment.consumer';

@Module({
  controllers: [PaymentConsumer],
})
export class AppModule {}
