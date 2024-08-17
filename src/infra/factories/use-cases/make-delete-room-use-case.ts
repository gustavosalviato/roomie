import { DeleteRoomUseCase } from '@/domain/schedule/application/use-cases/delete-room'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'

export function makeDeleteRoomUseCase() {
  const prismaService = new PrismaService()
  const roomsRepository = new PrismaRoomsRespository(prismaService)

  const deleteRoomUseCase = new DeleteRoomUseCase(roomsRepository)

  return deleteRoomUseCase
}
