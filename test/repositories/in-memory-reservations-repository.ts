import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export class InMemoryReservationsRepository implements ReservationsRepository {
  public items: Reservation[] = []

  async create(reservation: Reservation) {
    this.items.push(reservation)
  }
}
