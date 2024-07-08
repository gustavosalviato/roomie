import { Either, left, right } from '@/core/either'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'

import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

interface FetchUserReservationsRequest {
  userId: string
}

type FetchUserReservationsResponse = Either<
  ResourceNotFound,
  {
    reservations: Reservation[]
  }
>

export class FetchUserReservations {
  constructor(
    private reservationsRespository: ReservationsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserReservationsRequest): Promise<FetchUserReservationsResponse> {
    const user = this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFound())
    }

    const reservations =
      await this.reservationsRespository.findManyByUser(userId)

    return right({
      reservations,
    })
  }
}
