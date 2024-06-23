import { Room } from '@/domain/schedule/enterprise/entities/room'

export interface RoomsRepository {
  create(room: Room): Promise<void>
  delete(id: string): Promise<void>
  save(room: Room): Promise<void>
  fetchRooms(): Promise<Room[]>
  findById(id: string): Promise<null | Room>
}
