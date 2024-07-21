import { Either, left, right } from '@/core/either'
import { LateCancelReservation } from '@/core/errors/errors/late-cancel-reservation'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'

import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

interface CancelReservationRequest {
  reservationId: string
}

type CancelReservationResponse = Either<
  ResourceNotFound | LateCancelReservation,
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

    const differenceInMs =
      new Date().getTime() - reservation.startDate.getTime()

    const differenceInMinutes = differenceInMs / 60000

    if (differenceInMinutes > 60) {
      return left(new LateCancelReservation())
    }

    reservation.canceledAt = new Date()

    await this.reservationsRepository.save(reservation)

    return right({
      reservation,
    })
  }
}
