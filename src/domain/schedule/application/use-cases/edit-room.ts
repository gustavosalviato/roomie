import { Room } from '@/domain/schedule/enterprise/entities/room'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditRoomUseCaseRequest {
  roomId: string
  name: string
  location: string
  capacity: number
  resources: string[]
}

type EditRoomUseCaseResponse = Either<
  ResourceNotFoundError,
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
      return left(new ResourceNotFoundError())
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
