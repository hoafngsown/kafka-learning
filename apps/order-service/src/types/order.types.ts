export interface CreateOrderDto {
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order extends CreateOrderDto {
  orderId: string;
  status: OrderStatus;
  createdAt: string;
}

export enum OrderStatus {
  CREATED = "CREATED",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}
