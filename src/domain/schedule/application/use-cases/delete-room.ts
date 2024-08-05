import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteRoomUseCaseRequest {
  roomId: string
}

type DeleteRoomUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({
    roomId,
  }: DeleteRoomUseCaseRequest): Promise<DeleteRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFoundError())
    }

    await this.roomsRepository.delete(roomId)

    return right({})
  }
}
