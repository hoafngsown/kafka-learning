import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller()
export class OrderConsumer {
  private readonly logger = new Logger(OrderConsumer.name);
}
