import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Period } from '@/domain/schedule/enterprise/entities/period'
import { type Period as PrismaPeriod, Prisma } from '@prisma/client'

export class PrismaPeriodMapper {
  static toDomain(raw: PrismaPeriod): Period {
    return Period.create(
      {
        roomId: new UniqueEntityID(raw.room_id),
        startDate: raw.start_date,
        endDate: raw.end_date,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(period: Period): Prisma.PeriodUncheckedCreateInput {
    return {
      id: period.id.toString(),
      room_id: period.roomId.toString(),
      start_date: period.startDate,
      end_date: period.endDate,
    }
  }
}
