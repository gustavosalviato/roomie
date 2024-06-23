import { Room } from '@/domain/schedule/enterprise/entities/room'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, right } from '@/core/either'

interface CreateRoomUseCaseRequest {
  name: string
  location: string
  capacity: number
  resources: string[]
}

type CreateRoomUseCaseResponse = Either<
  null,
  {
    room: Room
  }
>

export class CreateRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({
    name,
    capacity,
    location,
    resources,
  }: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
    const room = Room.create({
      name,
      location,
      capacity,
      resources,
    })

    await this.roomsRepository.create(room)

    return right({
      room,
    })
  }
}
