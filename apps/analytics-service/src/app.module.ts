import { Module } from '@nestjs/common';
import { OrderConsumer } from './kafka/order.consumer';
import { AnalyticsStore } from './kafka/analytics.store';

@Module({
  controllers: [OrderConsumer],
  providers: [AnalyticsStore],
})
export class AppModule {}
