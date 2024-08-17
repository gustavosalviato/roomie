import { Room } from '@/domain/schedule/enterprise/entities/room'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, right } from '@/core/either'
import { RecordAlreadyExistsError } from './errors/room-already-exists'

interface CreateRoomUseCaseRequest {
  name: string
  location: string
  capacity: number
  resources: string[]
}

type CreateRoomUseCaseResponse = Either<
  RecordAlreadyExistsError,
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
