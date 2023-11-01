import { Order } from './order'
import { OrderItem } from './order-item'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', 'c1', [])
    }).toThrowError('id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('o1', '', [])
    }).toThrowError('customerId is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('o1', 'c1', [])
    }).toThrowError('item qtd must be greater than 0')
  })

  it('should calculate total', () => {
    const item1 = new OrderItem('i1', 'product1', 100, '1', 2)
    const item2 = new OrderItem('i2', 'product2', 200, '2', 2)
    const order = new Order('o1', 'c1', [item1, item2])
    expect(order.total()).toBe(600)
  })

  it('should check if the item qtd is less or equal 0', () => {
    expect(() => {
      const item = new OrderItem('i1', 'product1', 100, '1', 0)
      const order = new Order('o1', 'c1', [item])
    }).toThrowError('item quantity must be greater than 0')
  })

  it('should change customer', () => {
    const item1 = new OrderItem('123', 'product1', 100, '1', 2)
    const order = new Order('o1', 'c1', [item1])
    expect(order.customerId).toBe('c1')

    order.changeCustomer('c2')
    expect(order.customerId).toBe('c2')
  })

  it('should add new item', () => {
    const item1 = new OrderItem('123', 'product1', 100, '1', 2)
    const order = new Order('o1', 'c1', [item1])
    expect(order.items.length).toBe(1)

    const item2 = new OrderItem('i2', 'product2', 200, '2', 2)
    order.addItem(item2)
    expect(order.items.length).toBe(2)
  })

  it('should remove item', () => {
    const item1 = new OrderItem('123', 'product1', 100, '1', 2)
    const item2 = new OrderItem('i2', 'product2', 200, '2', 2)
    const order = new Order('o1', 'c1', [item1, item2])
    expect(order.items.length).toBe(2)

    order.removeItem(item1.id)
    expect(order.items.length).toBe(1)
  })

  it('should throw error if remove all items', () => {
    const item1 = new OrderItem('123', 'product1', 100, '1', 2)
    const order = new Order('o1', 'c1', [item1])
    expect(order.items.length).toBe(1)

    expect(() => {
      order.removeItem(item1.id)
    }).toThrowError('item qtd must be greater than 0')
  })
})
