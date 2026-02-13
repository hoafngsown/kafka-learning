import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Order } from '../types/order.types';

@Injectable()
export class OrderProducer implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  async emitOrderCreated(order: Order): Promise<void> {
  }

  async emitWithKeyStrategy(order: Order, strategy: 'none' | 'orderId' | 'customerId'): Promise<void> {
  }

  async processPayment(order: Order): Promise<any> {
  }

  async sendToDLQ(originalMessage: any, error: string): Promise<void> {
  }
}
