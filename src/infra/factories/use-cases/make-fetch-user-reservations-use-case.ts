import { FetchUserReservationsUseCase } from '@/domain/schedule/application/use-cases/fetch-user-resevations'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaReservationsRepository } from '@/infra/database/prisma/repositories/prisma-reservations-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeFetchUserReservationsUseCase() {
  const prismaService = new PrismaService()

  const reservationsRepository = new PrismaReservationsRepository(prismaService)

  const usersRepository = new PrismaUserRepository(prismaService)

  const fetchUserReservationsUseCase = new FetchUserReservationsUseCase(
    reservationsRepository,
    usersRepository,
  )

  return fetchUserReservationsUseCase
}
