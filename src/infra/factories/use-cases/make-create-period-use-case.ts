import { CreatePeriodUseCase } from '@/domain/schedule/application/use-cases/create-period'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaPeriodsRepository } from '@/infra/database/prisma/repositories/prisma-periods-repository'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'

export function makeCreatePeriodUseCase() {
  const prismaService = new PrismaService()

  const periodsRepository = new PrismaPeriodsRepository(prismaService)
  const roomsRepository = new PrismaRoomsRespository(prismaService)

  const createPeriodUseCase = new CreatePeriodUseCase(
    periodsRepository,
    roomsRepository,
  )

  return createPeriodUseCase
}
