import { Address } from './address'
import { Customer } from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'John')
    }).toThrowError('id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrowError('name is required')
  })

  it('should change name', () => {
    // arrange
    const customer = new Customer('123', 'John')
    // act
    customer.changeName('Jane')
    // assert
    expect(customer.name).toBe('Jane')
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John')
    const address = new Address('Street 1', 123, '12345-678', 'São Paulo', 'SP')
    customer.address = address
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined', () => {
    const customer = new Customer('123', 'John')
    expect(() => customer.activate()).toThrowError('address is mandatory to activate a customer')
  })
})
