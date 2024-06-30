import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Room, RoomProps } from '@/domain/schedule/enterprise/entities/room'

export function makeRoom(
  override: Partial<RoomProps> = {},
  id?: UniqueEntityID,
) {
  const room = Room.create(
    {
      name: faker.location.city(),
      capacity: faker.number.int({
        min: 1,
        max: 10,
      }),
      location: faker.location.secondaryAddress(),
      resources: [],
      ...override,
    },
    id,
  )

  return room
}
