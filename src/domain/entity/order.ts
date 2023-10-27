import { OrderItem } from './order-item'

export class Order {
  private readonly _id: string
  private _customerId: string
  private _items: OrderItem[] = []
  private readonly _total: number

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customerId (): string {
    return this._customerId
  }

  get items (): OrderItem[] {
    return this._items
  }

  validate (): void {
    if (this._id.length === 0) {
      throw new Error('id is required')
    }
    if (this._customerId.length === 0) {
      throw new Error('customerId is required')
    }
    if (this._items.length === 0) {
      throw new Error('item qtd must be greater than 0')
    }
    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('item quantity must be greater than 0')
    }
  }

  changeCustomer (customerId: string): void {
    this._customerId = customerId
    this.validate()
  }

  addItem (item: OrderItem): void {
    this._items.push(item)
    this.validate()
  }

  removeItem (itemId: string): void {
    this._items = this._items.filter(item => item.id !== itemId)
    this.validate()
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }
}
