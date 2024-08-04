import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Room } from '@/domain/schedule/enterprise/entities/room'

import { PrismaClient } from '@prisma/client'
import { PrismaRoomMapper } from '../mappers/prisma-room-mapper'

export class PrismaRoomsRespository implements RoomsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(room: Room): Promise<void> {
    const data = PrismaRoomMapper.toPrisma(room)

    await this.prisma.room.create({
      data,
    })
  }
  async delete(id: string): Promise<void> {
    await this.prisma.room.delete({
      where: {
        id,
      },
    })
  }
  async save(room: Room): Promise<void> {
    await this.prisma.room.update({
      where: {
        id: room.id.toString(),
      },
      data: {
        name: room.name,
        capacity: room.capacity,
        location: room.location,
        resources: room.resources[0],
      },
    })
  }
  async fetchRooms(): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany()

    return rooms.map(room => {
      return PrismaRoomMapper.toDomain(room)
    })
  }
  async findById(id: string): Promise<Room | null> {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    })

    if (!room) {
      return null
    }

    return PrismaRoomMapper.toDomain(room)
  }
}
