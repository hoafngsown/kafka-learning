import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { AnalyticsStore } from './analytics.store';

@Controller()
export class OrderConsumer {
  private readonly logger = new Logger(OrderConsumer.name);

  constructor(private readonly analyticsStore: AnalyticsStore) {}
}
