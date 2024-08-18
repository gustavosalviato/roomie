import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { PeriodsRepository } from '@/domain/schedule/application/repositories/periods-repository'

import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ReservationAlreadyExistsError } from './errors/reservation-already-exists-error'
import { InvalidReservationEndDateError } from './errors/invalid-reservation-end-date-error'
import { ReservationInvalidDurationError } from './errors/reservation-invalid-duration-error'

import { Either, left, right } from '@/core/either'

interface CreateReservationUseCaseRequest {
  userId: string
  roomId: string
  periodId: string
}

type CreateReservationUseCaseResponse = Either<
  | ResourceNotFoundError
  | ReservationAlreadyExistsError
  | InvalidReservationEndDateError
  | ReservationInvalidDurationError,
  {
    reservation: Reservation
  }
>

export class CreateReservationUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private roomsRespository: RoomsRepository,
    private reservationsRepository: ReservationsRepository,
    private periodsRepository: PeriodsRepository,
  ) {}

  async execute({
    userId,
    roomId,
    periodId,
  }: CreateReservationUseCaseRequest): Promise<CreateReservationUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const room = await this.roomsRespository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFoundError())
    }

    const period = await this.periodsRepository.findById(periodId)

    if (!period) {
      return left(new ResourceNotFoundError())
    }

    const reservations = await this.reservationsRepository.findByRoomAndTime(
      room.id.toString(),
      period.startDate,
      period.endDate,
    )

    if (reservations.length > 0) {
      return left(new ReservationAlreadyExistsError())
    }

    if (period.endDate.getTime() < period.startDate.getTime()) {
      throw left(new InvalidReservationEndDateError())
    }

    const differenceInMs = period.endDate.getTime() - period.startDate.getTime()

    const differenceInMinutes = differenceInMs / 60000

    if (differenceInMinutes < 30) {
      return left(new ReservationInvalidDurationError())
    }

    // 4 hours
    if (differenceInMinutes > 240) {
      return left(new ReservationInvalidDurationError())
    }

    const reservation = Reservation.create({
      roomId: room.id,
      userId: user.id,
      periodId: period.id,
      startDate: period.startDate,
      endDate: period.endDate,
    })

    await this.reservationsRepository.create(reservation)

    return right({
      reservation,
    })
  }
}
