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
    const customer = new Customer('123', 'customer 1')
    const address = new Address('Street 1', 123, '12345-678', 'São Paulo', 'SP')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('1', 'product 1', 100)
    await productRepository.create(product)

    const item = new OrderItem('123', product.name, product.price, product.id, 2)
    const order = new Order('123', '123', [item])
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
})
