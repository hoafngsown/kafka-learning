import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { KafkaModule } from "./kafka/kafka.module";
import { OrderStatusConsumer } from "./kafka/order-status.consumer";

@Module({
  imports: [KafkaModule],
  controllers: [AppController, OrderStatusConsumer],
})
export class AppModule {}
