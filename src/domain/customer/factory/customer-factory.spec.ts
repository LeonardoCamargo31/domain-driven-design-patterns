import { Address } from '../value-object/address'
import { CustomerFactory } from './customer-factory'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('john')
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.address).toBeUndefined()
    expect(customer.constructor.name).toBe('Customer')
  })

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 123, '12345-678', 'São Paulo', 'SP')
    const customer = CustomerFactory.createWithAddress('john', address)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('john')
    expect(customer.address).toBeDefined()
    expect(customer.constructor.name).toBe('Customer')
  })
})
