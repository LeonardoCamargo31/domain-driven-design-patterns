import { Address } from './address'

export class Customer {
  id: string
  name: string=''
  address: Address
  active: boolean=false

  constructor (id: string, name: string, address: Address) {
    this.id = id
    this.name = name
    this.address = address
    this.validate()
  }

  validate (): void {
    if (this.name.length === 0) {
      throw new Error('name is required')
    }
    if (this.id.length === 0) {
      throw new Error('id is required')
    }
  }

  activate (): void {
    if (!this.address) {
      throw new Error('address is mandatory to activate a customer')
    }
    this.active = true
  }
}
