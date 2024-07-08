import {
  Params,
  ReservationsRepository,
} from '@/domain/schedule/application/repositories/reservations-repository'
import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export class InMemoryReservationsRepository implements ReservationsRepository {
  public items: Reservation[] = []

  async create(reservation: Reservation) {
    this.items.push(reservation)
  }

  async save(reservation: Reservation) {
    const reservationIndex = this.items.findIndex(
      room => room.id.toString() === room.id.toString(),
    )

    this.items[reservationIndex] = reservation
  }

  async findManyByUser(userId: string) {
    const reservations = this.items.filter(
      reservation => reservation.userId.toString() === userId,
    )

    return reservations
  }

  async findById(id: string) {
    const reservation = this.items.find(
      reservation => reservation.id.toString() === id,
    )

    if (!reservation) {
      return null
    }

    return reservation
  }

  async findUniqueReservation({ startDate, endDate, roomId }: Params) {
    const reservation = this.items.find(reservation => {
      return (
        reservation.startDate.toISOString() === startDate.toISOString() &&
        reservation.endDate.toISOString() === endDate.toISOString() &&
        reservation.roomId.toString() === roomId
      )
    })

    if (!reservation) {
      return null
    }

    return reservation
  }
}
