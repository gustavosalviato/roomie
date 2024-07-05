import { InMemoryPeriodsRepository } from 'test/repositories/in-memory-periods-repository'
import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'

import { CreatePeriodUseCase } from './create-period'

import { Room } from '@/domain/schedule/enterprise/entities/room'
import { Period } from '@/domain/schedule/enterprise/entities/period'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { makeRoom } from 'test/factories/make-room'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let inMemoryPeriodsRepository: InMemoryPeriodsRepository
let sut: CreatePeriodUseCase

describe('Create Period', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()
    inMemoryPeriodsRepository = new InMemoryPeriodsRepository()

    sut = new CreatePeriodUseCase(
      inMemoryPeriodsRepository,
      inMemoryRoomsRepository,
    )
  })

  it('should be able to create a period', async () => {
    const room = makeRoom()

    await inMemoryRoomsRepository.create(room)

    const result = await sut.execute({
      roomId: room.id.toString(),
      startDate: new Date(),
      endDate: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPeriodsRepository.items).toHaveLength(1)
  })

  it('should not be able to create a period to a not existing room', async () => {
    const roomId = 'fake-room-id'

    const result = await sut.execute({
      roomId,
      startDate: new Date(),
      endDate: new Date(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFound)
  })
})
