import { EventInterface } from './event-interface'
// todo event handler tem que receber um evento
// vamos garantir que é do tipo EventInterface
// com o uso do generic <T>
// com valor padrão sendo EventInterface
export interface EventHandlerInterface<T extends EventInterface=EventInterface> {
  handler: (event: T) => void
}
