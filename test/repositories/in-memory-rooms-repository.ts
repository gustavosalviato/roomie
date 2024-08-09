import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Room } from '@/domain/schedule/enterprise/entities/room'

export class InMemoryRoomsRepository implements RoomsRepository {
  public items: Room[] = []

  async create(room: Room) {
    this.items.push(room)
  }

  async delete(id: string) {
    const roomIndex = this.items.findIndex(room => room.id.toString() === id)

    this.items.splice(roomIndex, 1)
  }

  async save(room: Room) {
    const roomIndex = this.items.findIndex(
      room => room.id.toString() === room.id.toString(),
    )

    this.items[roomIndex] = room
  }
  async fetchRooms() {
    return this.items
  }

  async findById(id: string) {
    const room = this.items.find(room => room.id.toString() === id)

    if (!room) {
      return null
    }

    return room
  }

  async findByName(name: string) {
    const room = this.items.find(
      room => room.name.toLowerCase() === name.toLowerCase(),
    )

    if (!room) {
      return null
    }

    return room
  }
}
