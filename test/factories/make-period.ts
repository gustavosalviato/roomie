import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Period,
  PeriodProps,
} from '@/domain/schedule/enterprise/entities/period'

export function makePeriod(
  override: Partial<PeriodProps> = {},
  id?: UniqueEntityID,
) {
  const room = Period.create(
    {
      roomId: new UniqueEntityID(),
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      ...override,
    },
    id,
  )

  return room
}
