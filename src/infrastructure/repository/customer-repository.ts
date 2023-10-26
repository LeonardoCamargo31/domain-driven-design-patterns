import { Address } from '../../domain/entity/address'
import { Customer } from '../../domain/entity/customer'
import { CustomerRepositoryInterface } from '../../domain/repository/customer-repository.interface'
import { CustomerModel } from '../database/sequelize/model/customer-model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      reward_points: entity.rewardPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        state: entity.address.state,
        active: entity.isActive(),
        reward_points: entity.rewardPoints
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  async find (id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: {
          id
        },
        rejectOnEmpty: true
      })

      const customer = new Customer(id, customerModel.name)
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
        customerModel.state
      )
      customer.changeAddress(address)
      return customer
    } catch (error) {
      throw new Error('customer not found')
    }
  }

  async findAll (): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.addRewardPoints(customerModel.reward_points)
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
        customerModel.state
      )
      customer.changeAddress(address)
      if (customerModel.active) {
        customer.activate()
      }
      return customer
    })

    return customers
  }
}