import { CreateReservationUseCase } from '@/domain/schedule/application/use-cases/create-reservation'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaPeriodsRepository } from '@/infra/database/prisma/repositories/prisma-periods-repository'
import { PrismaReservationsRepository } from '@/infra/database/prisma/repositories/prisma-reservations-repository'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeCreateReservationUseCase() {
  const prismaService = new PrismaService()

  const periodsRepository = new PrismaPeriodsRepository(prismaService)
  const usersRepository = new PrismaUserRepository(prismaService)
  const roomsRepository = new PrismaRoomsRespository(prismaService)
  const reservationsRespository = new PrismaReservationsRepository(
    prismaService,
  )

  const createReservationUseCase = new CreateReservationUseCase(
    usersRepository,
    roomsRepository,
    reservationsRespository,
    periodsRepository,
  )

  return createReservationUseCase
}
