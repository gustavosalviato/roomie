import { Room } from '@/domain/schedule/enterprise/entities/room'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'

interface EditRoomUseCaseRequest {
  roomId: string
  name: string
  location: string
  capacity: number
  resources: string[]
}

type EditRoomUseCaseResponse = Either<
  ResourceNotFound,
  {
    room: Room
  }
>

export class EditRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({
    roomId,
    name,
    capacity,
    location,
    resources,
  }: EditRoomUseCaseRequest): Promise<EditRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFound())
    }

    room.name = name
    room.capacity = capacity
    room.location = location
    room.resources = resources

    await this.roomsRepository.save(room)

    return right({
      room,
    })
  }
}
