import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "order-service-consumer",
        brokers: ["localhost:9092"],
      },
      consumer: {
        groupId: "order-group",
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(" Order Service running on http://localhost:3000");
  console.log(" Kafka consumer connected (group: order-group)");
}
bootstrap();
