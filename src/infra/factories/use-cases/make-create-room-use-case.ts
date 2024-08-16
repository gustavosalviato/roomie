import { CreateRoomUseCase } from '@/domain/schedule/application/use-cases/create-room'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'

export function makeCreateRoomUseCase() {
  const prismaService = new PrismaService()
  const roomsRepository = new PrismaRoomsRespository(prismaService)

  const createRoomUseCase = new CreateRoomUseCase(roomsRepository)

  return createRoomUseCase
}
