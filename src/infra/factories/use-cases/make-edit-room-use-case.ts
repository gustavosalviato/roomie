import { EditRoomUseCase } from '@/domain/schedule/application/use-cases/edit-room'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaRoomsRespository } from '@/infra/database/prisma/repositories/prisma-rooms-repository'

export function makeEditRoomUseCase() {
  const prismaService = new PrismaService()
  const roomsRepository = new PrismaRoomsRespository(prismaService)

  const editRoomUseCase = new EditRoomUseCase(roomsRepository)

  return editRoomUseCase
}
