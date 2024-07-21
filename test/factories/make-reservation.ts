import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Reservation,
  ReservationProps,
} from '@/domain/schedule/enterprise/entities/reservation'

export function makeReservation(
  override: Partial<ReservationProps> = {},
  id?: UniqueEntityID,
) {
  const room = Reservation.create(
    {
      userId: new UniqueEntityID(),
      roomId: new UniqueEntityID(),
      periodId: new UniqueEntityID(),
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      ...override,
    },

    id,
  )

  return room
}
