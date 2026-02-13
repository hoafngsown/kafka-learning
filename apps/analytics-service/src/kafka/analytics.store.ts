import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsStore {
  private readonly logger = new Logger(AnalyticsStore.name);

  private totalOrders = 0;
  private totalRevenue = 0;
  private ordersByCustomer: Map<string, number> = new Map();

  recordOrder(order: any) {
    this.totalOrders++;
    this.totalRevenue += order.totalAmount || 0;

    const customerId = order.customerId || 'unknown';
    const current = this.ordersByCustomer.get(customerId) || 0;
    this.ordersByCustomer.set(customerId, current + 1);

    this.logger.log(
      `📈 Stats: ${this.totalOrders} orders | $${this.totalRevenue} revenue | ${this.ordersByCustomer.size} unique customers`,
    );
  }

  getStats() {
    return {
      totalOrders: this.totalOrders,
      totalRevenue: this.totalRevenue,
      uniqueCustomers: this.ordersByCustomer.size,
      ordersByCustomer: Object.fromEntries(this.ordersByCustomer),
    };
  }
}
