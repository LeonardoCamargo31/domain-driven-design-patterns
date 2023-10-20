import { Address } from './address'
import { Customer } from './customer'
import { Product } from './product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'product', 10)
    }).toThrowError('id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 10)
    }).toThrowError('name is required')
  })

  it('should throw error when price is less than 0', () => {
    expect(() => {
      const product = new Product('123', 'product', -10)
    }).toThrowError('price is less than 0')
  })

  it('should change name', () => {
    const product = new Product('123', 'product', 10)
    product.changeName('new name product')
    expect(product.name).toBe('new name product')
  })

  it('should change price', () => {
    const product = new Product('123', 'product', 10)
    product.changePrice(20)
    expect(product.price).toBe(20)
  })
})
