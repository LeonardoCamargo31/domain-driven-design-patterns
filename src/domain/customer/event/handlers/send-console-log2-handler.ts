import { EventHandlerInterface } from '../../../@shared/event/event-handler-interface'
import { EventInterface } from '../../../@shared/event/event-interface'
import { CustomerCreatedEvent } from '../customer-created-event'

export class SendConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handler (event: EventInterface): void {
    console.log('esse é o segundo console.log do evento: CustomerCreated')
  }
}
