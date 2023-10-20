export class Address {
  street: string=''
  number: number =0
  zip: string=''
  city: string=''
  state: string=''

  constructor (street: string, number: number, zip: string, city: string, state: string) {
    this.street = street
    this.number = number
    this.zip = zip
    this.city = city
    this.state = state
  }

  validate (): void {
    if (this.street.length === 0) {
      throw new Error('street is required')
    }
    if (this.number === 0) {
      throw new Error('number is required')
    }
    if (this.zip.length === 0) {
      throw new Error('zip is required')
    }
    if (this.city.length === 0) {
      throw new Error('city is required')
    }
    if (this.state.length === 0) {
      throw new Error('state is required')
    }
  }
}
