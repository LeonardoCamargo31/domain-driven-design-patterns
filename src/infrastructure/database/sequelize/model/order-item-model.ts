import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { ProductModel } from './product-model'
import { OrderItem } from '../../../../domain/entity/order-item'
import { OrderModel } from './order-model'

@Table({
  tableName: 'order_items',
  timestamps: false
  })
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column({ allowNull:false })
  declare product_id: string

  // caso queira todos os dados do produto
  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @ForeignKey(() => OrderModel)
  @Column({ allowNull:false })
  declare order_id: string

  // caso queira todos os dados da order
  @BelongsTo(() => OrderModel)
  declare order: OrderItem

  @Column({ allowNull:false })
  declare quantity: number

  @Column({ allowNull:false })
  declare name: number

  @Column({ allowNull:false })
  declare price: number
}
