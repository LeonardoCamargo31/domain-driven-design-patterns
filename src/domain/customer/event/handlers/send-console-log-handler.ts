import { EventHandlerInterface } from '../../../@shared/event/event-handler-interface'
import { EventInterface } from '../../../@shared/event/event-interface'
import { CustomerChangeAddressEvent } from '../customer-change-address-event'

export class SendConsoleLogHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handler (event: EventInterface): void {
    console.log(`endereço do cliente: ${event.eventData.id as string}, ${event.eventData.name as string} alterado para: ${event.eventData.street as string}, ${event.eventData.number.toString() as string}`)
  }
}
