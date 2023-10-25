import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../database/sequelize/model/customer-model'
import CustomerRepository from './customer-repository'
import { Customer } from '../../domain/entity/customer'
import { Address } from '../../domain/entity/address'
import { OrderModel } from '../database/sequelize/model/order-model'
import { OrderItemModel } from '../database/sequelize/model/order-item-model'
import { ProductModel } from '../database/sequelize/model/product-model'
import { ProductRepository } from './product-repository'
import { Product } from '../../domain/entity/product'
import { OrderItem } from '../../domain/entity/order-item'
import { Order } from '../../domain/entity/order'
import OrderRepository from './order-repository'

const makeCustomer = (): Customer => {
  const customer = new Customer('c1', 'customer 1')
  const address = new Address('Street 1', 123, '12345-678', 'São Paulo', 'SP')
  customer.changeAddress(address)
  return customer
}

const makeProduct = (): Product => {
  return new Product('p1', 'product 1', 100)
}

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = makeCustomer()
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = makeProduct()
    await productRepository.create(product)

    const item = new OrderItem('i1', product.name, product.price, product.id, 2)
    const order = new Order('o1', customer.id, [item])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [{
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        order_id: order.id,
        product_id: item.productId
      }]
    })
  })

  it('should throw an error when calling the update method', async () => {
    const customerRepository = new CustomerRepository()
    const customer = makeCustomer()
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = makeProduct()
    await productRepository.create(product)

    const item = new OrderItem('i1', product.name, product.price, product.id, 2)
    const order = new Order('o1', customer.id, [item])
    const orderRepository = new OrderRepository()

    void expect(async () => {
      await orderRepository.update(order)
    }).rejects.toThrow('method not implemented')
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = makeCustomer()
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = makeProduct()
    await productRepository.create(product)

    const item = new OrderItem('i1', product.name, product.price, product.id, 2)
    const order = new Order('o1', customer.id, [item])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderResult = await orderRepository.find(order.id)
    expect(order).toStrictEqual(orderResult)
  })

  it('should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository()

    void expect(async () => {
      await orderRepository.find('456ABC')
    }).rejects.toThrow('order not found')
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = makeCustomer()
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = makeProduct()
    await productRepository.create(product)

    const item1 = new OrderItem('i1', product.name, product.price, product.id, 2)
    const item2 = new OrderItem('i2', product.name, product.price, product.id, 2)

    const order1 = new Order('o1', customer.id, [item1])
    const order2 = new Order('o2', customer.id, [item2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const orders = await orderRepository.findAll()
    expect(orders).toHaveLength(2)
    expect(orders).toContainEqual(order1)
    expect(orders).toContainEqual(order2)
  })
})
