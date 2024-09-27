import { Either, left, right } from '@/core/either'
import { LateCancelReservationError } from './errors/late-cancel-reservation-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

interface CancelReservationRequest {
  reservationId: string
}

type CancelReservationResponse = Either<
  ResourceNotFoundError | LateCancelReservationError,
  {
    reservation: Reservation
  }
>

export class CancelReservationUseCase {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async execute({
    reservationId,
  }: CancelReservationRequest): Promise<CancelReservationResponse> {
    const reservation =
      await this.reservationsRepository.findById(reservationId)

    if (!reservation) {
      return left(new ResourceNotFoundError())
    }

    const differenceInMs =
      new Date().getTime() - reservation.startDate.getTime()

    const differenceInMinutes = differenceInMs / 60000

    if (differenceInMinutes > 60) {
      return left(new LateCancelReservationError())
    }

    reservation.canceledAt = new Date()

    await this.reservationsRepository.save(reservation)

    return right({
      reservation,
    })
  }
}
