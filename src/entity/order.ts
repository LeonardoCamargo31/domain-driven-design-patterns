import { OrderItem } from './order-item'

export class Order {
  private readonly _id: string
  private readonly _customerId: string
  private readonly _items: OrderItem[]=[]

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  validate (): void {
    if (this._id.length === 0) {
      throw new Error('id is required')
    }
    if (this._customerId.length === 0) {
      throw new Error('customerId is required')
    }
    if (this._items.length === 0) {
      throw new Error('item qtd mus be greater than 0')
    }
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }
}
