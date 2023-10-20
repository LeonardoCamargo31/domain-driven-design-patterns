export class OrderItem {
  private readonly _id: string
  private readonly _productId: string
  private readonly _name: string
  private readonly _price: number
  private readonly _quantity: number
  private readonly _total: number

  constructor (id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this._total = this.orderItemTotal()
  }

  get price (): number {
    return this._price
  }

  get quantity (): number {
    return this._quantity
  }

  orderItemTotal (): number {
    return this._price * this._quantity
  }
}
