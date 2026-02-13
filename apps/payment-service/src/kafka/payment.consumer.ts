import { Controller, Logger } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentConsumer {
  private readonly logger = new Logger(PaymentConsumer.name);
}
