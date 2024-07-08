import { Either, left, right } from '@/core/either'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'

import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

interface CancelReservationRequest {
  reservationId: string
}

type CancelReservationResponse = Either<
  ResourceNotFound,
  {
    reservation: Reservation
  }
>

export class CancelReservation {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async execute({
    reservationId,
  }: CancelReservationRequest): Promise<CancelReservationResponse> {
    const reservation =
      await this.reservationsRepository.findById(reservationId)

    if (!reservation) {
      return left(new ResourceNotFound())
    }

    reservation.canceledAt = new Date()

    await this.reservationsRepository.save(reservation)

    return right({
      reservation,
    })
  }
}
