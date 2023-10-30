import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-Is-created-handler'
import { ProductCreatedEvent } from '../product/product-created-event'
import { EventDispatcher } from './event-dispatcher'

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeUndefined()
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handler')
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    const productCratedEvent = new ProductCreatedEvent({
      name: 'product 1',
      description: 'product 1 description',
      price: 10.0
    })

    // quando o notify for chamado o SendEmailWhenProductIsCreatedHandler.handler() deve ser chamado
    eventDispatcher.notify(productCratedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})
