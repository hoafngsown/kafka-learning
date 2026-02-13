import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { OrderProducer } from "./kafka/order.producer";
import { CreateOrderDto, Order, OrderStatus } from "./types/order.types";

@Controller("orders")
export class AppController {
  private orders: Map<string, Order> = new Map();

  constructor(private readonly orderProducer: OrderProducer) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order: Order = {
      ...createOrderDto,
      orderId: uuidv4(),
      status: OrderStatus.CREATED,
      createdAt: new Date().toISOString(),
    };

    this.orders.set(order.orderId, order);
    await this.orderProducer.emitOrderCreated(order);

    return { message: "Order created and event emitted", order };
  }

  @Post("with-key-strategy")
  async createOrderWithKeyStrategy(
    @Body() createOrderDto: CreateOrderDto,
    @Query("strategy") strategy: "none" | "orderId" | "customerId" = "none",
  ) {
    const order: Order = {
      ...createOrderDto,
      orderId: uuidv4(),
      status: OrderStatus.CREATED,
      createdAt: new Date().toISOString(),
    };

    this.orders.set(order.orderId, order);
    await this.orderProducer.emitWithKeyStrategy(order, strategy);

    return { message: `Order created with key strategy: ${strategy}`, order };
  }

  @Post("with-payment")
  async createOrderWithPayment(@Body() createOrderDto: CreateOrderDto) {
    const order: Order = {
      ...createOrderDto,
      orderId: uuidv4(),
      status: OrderStatus.PAYMENT_PENDING,
      createdAt: new Date().toISOString(),
    };

    this.orders.set(order.orderId, order);

    const paymentResult = await this.orderProducer.processPayment(order);

    if (paymentResult?.success) {
      order.status = OrderStatus.CONFIRMED;
    } else {
      order.status = OrderStatus.CANCELLED;
    }

    return { message: "Order processed with payment", order, paymentResult };
  }

  @Get()
  getOrders() {
    return Array.from(this.orders.values());
  }
}
