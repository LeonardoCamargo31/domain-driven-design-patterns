import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/order-item'
import { OrderService } from './order-service'

describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('i1', 'item 1', 100, 'p1', 1)
    const orderItem2 = new OrderItem('i2', 'item 2', 200, 'p1', 2)

    const order1 = new Order('o1', 'c1', [orderItem1])
    const order2 = new Order('o2', 'c1', [orderItem2])

    const total = OrderService.total([order1, order2])
    expect(total).toBe(500)
  })

  it('should pace an order', () => {
    const customer = new Customer('c1', 'customer 1')
    const orderItem = new OrderItem('i1', 'item 1', 10, 'p1', 1)

    const order = OrderService.placeOrder(customer, [orderItem])
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})
