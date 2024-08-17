import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Room } from '@/domain/schedule/enterprise/entities/room'
import { type Room as PrismaRoom, Prisma } from '@prisma/client'

export class PrismaRoomMapper {
  static toDomain(raw: PrismaRoom): Room {
    return Room.create(
      {
        name: raw.name,
        capacity: raw.capacity,
        location: raw.location,
        resources: raw.resources,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(room: Room): Prisma.RoomUncheckedCreateInput {
    return {
      id: room.id.toString(),
      name: room.name,
      capacity: room.capacity,
      location: room.location,
      resources: room.resources,
    }
  }
}
