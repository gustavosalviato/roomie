import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { PeriodsRepository } from '@/domain/schedule/application/repositories/periods-repository'

import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { ReservationAlreadyExits } from '@/core/errors/errors/reservation-already-exists'

import { Either, left, right } from '@/core/either'

interface CreateReservationUseCaseRequest {
  userId: string
  roomId: string
  periodId: string
  startDate: Date
  endDate: Date
}

type CreateReservationUseCaseResponse = Either<
  ResourceNotFound | ReservationAlreadyExits,
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
    startDate,
    endDate,
  }: CreateReservationUseCaseRequest): Promise<CreateReservationUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFound())
    }

    const room = await this.roomsRespository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFound())
    }

    const period = await this.periodsRepository.findById(periodId)

    if (!period) {
      return left(new ResourceNotFound())
    }

    const reservationAlreadyExists =
      await this.reservationsRepository.findUniqueReservation({
        roomId: room.id.toString(),
        startDate,
        endDate,
      })

    if (reservationAlreadyExists) {
      return left(new ReservationAlreadyExits())
    }

    const reservation = Reservation.create({
      roomId: room.id,
      userId: user.id,
      periodId: period.id,
      startDate,
      endDate,
    })

    await this.reservationsRepository.create(reservation)

    return right({
      reservation,
    })
  }
}
