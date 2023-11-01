import { EventDispatcher } from '../../@shared/event/event-dispatcher'
import { CustomerCreatedEvent } from './customer-created-event'
import { SendConsoleLog1Handler } from './handlers/send-console-log1-handler'
import { SendConsoleLog2Handler } from './handlers/send-console-log2-handler'

describe('Customer created events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLog1Handler()
    eventDispatcher.register('CustomerCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(1)
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler)
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new SendConsoleLog1Handler()
    const eventHandler2 = new SendConsoleLog2Handler()

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handler')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handler')

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2)

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'John'
    })

    eventDispatcher.notify(customerCreatedEvent)
    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })
})
