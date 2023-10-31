import { EventHandlerInterface } from '../../@shared/event-handler-interface'
import { EventInterface } from '../../@shared/event-interface'
import { CustomerCreatedEvent } from '../customer-created-event'

export class SendConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handler (event: EventInterface): void {
    console.log(`endereço do cliente: ${event.eventData.id as string}, ${event.eventData.name as string} alterado para: ${event.eventData.street as string}, ${event.eventData.number.toString() as string}`)
  }
}
