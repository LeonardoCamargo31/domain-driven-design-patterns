import { EventDispatcher } from '../@shared/event-dispatcher'
import { CustomerChangeAddressEvent } from './customer-change-address-event'
import { SendConsoleLogHandler } from './handlers/send-console-log-handler'

describe('Customer change address events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogHandler()
    eventDispatcher.register('CustomerChangeAddressEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.CustomerChangeAddressEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.CustomerChangeAddressEvent.length).toBe(1)
    expect(eventDispatcher.getEventHandlers.CustomerChangeAddressEvent[0]).toMatchObject(eventHandler)
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handler')

    eventDispatcher.register('CustomerChangeAddressEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.CustomerChangeAddressEvent[0]).toMatchObject(eventHandler)

    const customerCreatedEvent = new CustomerChangeAddressEvent({
      id: '123',
      name: 'John',
      street: 'Street 1',
      number: 123,
      zip: '12345-678',
      city: 'São Paulo',
      state: 'SP'
    })

    eventDispatcher.notify(customerCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})
