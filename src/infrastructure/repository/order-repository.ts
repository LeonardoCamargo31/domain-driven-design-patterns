import { Order } from '../../domain/entity/order'
import { OrderItem } from '../../domain/entity/order-item'
import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface'
import { OrderItemModel } from '../database/sequelize/model/order-item-model'
import { OrderModel } from '../database/sequelize/model/order-model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create (entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update (entity: Order): Promise<void> {
    throw new Error('method not implemented')
  }

  async find (id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: ['items'],
        rejectOnEmpty: true
      })

      const items = orderModel.items.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      })
      return new Order(id, orderModel.customer_id, items)
    } catch (error) {
      throw new Error('order not found')
    }
  }

  async findAll (): Promise<any> {
    const orderModels = await OrderModel.findAll({
      include: ['items']
    })
    const orders = orderModels.map((orderModel) => {
      const items = orderModel.items.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      })
      return new Order(orderModel.id, orderModel.customer_id, items)
    })

    return orders
  }
}
