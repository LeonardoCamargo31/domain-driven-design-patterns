import { EventHandlerInterface } from '../../@shared/event-handler-interface'
import { EventInterface } from '../../@shared/event-interface'
import { CustomerCreatedEvent } from '../customer-created-event'

export class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handler (event: EventInterface): void {
    console.log('esse é o primeiro console.log do evento: CustomerCreated')
  }
}
