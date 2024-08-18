import { CreateReservationUseCase } from '@/domain/schedule/application/use-cases/create-reservation'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaPeriodRepository } from '@/infra/database/prisma/repositories/prisma-period-repository'
import { PrismaReservationRepository } from '@/infra/database/prisma/repositories/prisma-reservation-repository'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeCreateReservationUseCase() {
  const prismaService = new PrismaService()

  const periodsRepository = new PrismaPeriodRepository(prismaService)
  const usersRepository = new PrismaUserRepository(prismaService)
  const roomsRepository = new PrismaRoomsRespository(prismaService)
  const reservationsRespository = new PrismaReservationRepository(prismaService)

  const createReservationUseCase = new CreateReservationUseCase(
    usersRepository,
    roomsRepository,
    reservationsRespository,
    periodsRepository,
  )

  return createReservationUseCase
}
