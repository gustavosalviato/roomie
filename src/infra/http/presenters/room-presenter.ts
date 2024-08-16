import { Room } from '@/domain/schedule/enterprise/entities/room'

export class RoomPresenter {
  static toHTTP(room: Room) {
    return {
      id: room.id.toString(),
      name: room.name,
      location: room.location,
      capacity: room.capacity,
      resources: room.resources,
    }
  }
}
