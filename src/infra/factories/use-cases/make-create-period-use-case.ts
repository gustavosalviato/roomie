import { CreatePeriodUseCase } from '@/domain/schedule/application/use-cases/create-period'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaPeriodRepository } from '@/infra/database/prisma/repositories/prisma-period-repository'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'

export function makeCreatePeriodUseCase() {
  const prismaService = new PrismaService()

  const periodsRepository = new PrismaPeriodRepository(prismaService)
  const roomsRepository = new PrismaRoomsRespository(prismaService)

  const createPeriodUseCase = new CreatePeriodUseCase(
    periodsRepository,
    roomsRepository,
  )

  return createPeriodUseCase
}
