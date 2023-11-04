import { v4 as uuid } from 'uuid'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/order-item'

export interface OrderFactoryProps {
  id: string
  customerId: string
  items: [{
    id: string
    name: string
    productId: string
    quantity: number
    price: number
  }]
}

export class OrderFactory {
  static create (orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
    })
    return new Order(orderProps.id, orderProps.customerId, items)
  }
}
