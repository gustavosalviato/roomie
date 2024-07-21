import { PeriodsRepository } from '@/domain/schedule/application/repositories/periods-repository'
import { Period } from '@/domain/schedule/enterprise/entities/period'
import { RoomsRepository } from '@/domain/schedule/application/repositories/rooms-repository'

import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'

import { Either, left, right } from '@/core/either'

interface CreatePeriodUseCaseRequest {
  roomId: string
  startDate: Date
  endDate: Date
}

type CreatePeriodUseCaseResponse = Either<
  ResourceNotFound,
  {
    period: Period
  }
>

export class CreatePeriodUseCase {
  constructor(
    private periodsRepository: PeriodsRepository,
    private roomsRepository: RoomsRepository,
  ) {}

  async execute({
    roomId,
    endDate,
    startDate,
  }: CreatePeriodUseCaseRequest): Promise<CreatePeriodUseCaseResponse> {
    const room = await this.roomsRepository.findById(roomId)

    if (!room) {
      return left(new ResourceNotFound())
    }

    const period = Period.create({
      roomId: room.id,
      startDate,
      endDate,
    })

    await this.periodsRepository.create(period)

    return right({
      period,
    })
  }
}
