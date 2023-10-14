import { Order } from './order'
import { OrderItem } from './order-item'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', [])
    }).toThrowError('id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', [])
    }).toThrowError('customerId is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '123', [])
    }).toThrowError('item qtd mus be greater than 0')
  })

  it('should calculate total', () => {
    const item1 = new OrderItem('123', 'product1', 100)
    const item2 = new OrderItem('123', 'product2', 200)
    const order = new Order('123', '123', [item1, item2])
    expect(order.total()).toBe(300)
  })
})
