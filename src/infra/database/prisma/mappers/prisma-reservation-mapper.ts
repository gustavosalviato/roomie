import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

import { type Reservation as PrismaRersevation, Prisma } from '@prisma/client'

export class PrismaReservationMapper {
  static toDomain(raw: PrismaRersevation): Reservation {
    return Reservation.create(
      {
        roomId: new UniqueEntityID(raw.room_id),
        userId: new UniqueEntityID(raw.user_id),
        periodId: new UniqueEntityID(raw.period_id),
        startDate: raw.start_date,
        endDate: raw.end_date,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    reservation: Reservation,
  ): Prisma.ReservationUncheckedCreateInput {
    return {
      room_id: reservation.roomId.toString(),
      user_id: reservation.userId.toString(),
      period_id: reservation.periodId.toString(),
      start_date: reservation.startDate,
      end_date: reservation.endDate,
    }
  }
}
