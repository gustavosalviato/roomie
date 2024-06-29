import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'

interface DeleteRoomUseCaseRequest {
  roomId: string
}

type DeleteRoomUseCaseResponse = Either<ResourceNotFound, {}>

export class DeleteRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({
    roomId,
  }: DeleteRoomUseCaseRequest): Promise<DeleteRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFound())
    }

    await this.roomsRepository.delete(roomId)

    return right({})
  }
}
