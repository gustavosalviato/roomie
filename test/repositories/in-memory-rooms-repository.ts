import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Room } from '@/domain/schedule/enterprise/entities/room'

export class InMemoryRoomsRepository implements RoomsRepository {
  public items: Room[] = []

  async create(room: Room) {
    this.items.push(room)
  }

  async delete(id: string) {
    const roomIndex = this.items.findIndex(room => room.id.toString() === id)

    if (roomIndex > 0) {
      this.items.splice(roomIndex, 0)
    }
  }

  async save(room: Room) {
    const roomIndex = this.items.findIndex(
      room => room.id.toString() === room.id.toString(),
    )

    this.items[roomIndex] = room
  }
  async fetchRooms(): Promise<Room[]> {
    return this.items
  }

  async findById(id: string): Promise<Room | null> {
    const room = this.items.find(room => room.id.toString() === id)

    if (!room) {
      return null
    }

    return room
  }
}
