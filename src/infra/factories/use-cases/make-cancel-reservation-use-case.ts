import { CancelReservationUseCase } from '@/domain/schedule/application/use-cases/cancel-reservation'

import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaReservationsRepository } from '@/infra/database/prisma/repositories/prisma-reservations-repository'

export function makeCancelReservationUseCase() {
  const prismaService = new PrismaService()

  const reservationsRepository = new PrismaReservationsRepository(prismaService)

  const cancelReservationUsecase = new CancelReservationUseCase(
    reservationsRepository,
  )

  return cancelReservationUsecase
}
