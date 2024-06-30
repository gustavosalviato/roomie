import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { DeleteRoomUseCase } from './delete-room'

import { Room } from '@/domain/schedule/enterprise/entities/room'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { makeRoom } from 'test/factories/make-room'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let sut: DeleteRoomUseCase

describe('Delete Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()

    sut = new DeleteRoomUseCase(inMemoryRoomsRepository)
  })

  it('should be able to delete a room', async () => {
    const room = makeRoom()

    await inMemoryRoomsRepository.create(room)

    const result = await sut.execute({
      roomId: room.id.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRoomsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non existing room', async () => {
    const roomId = 'fake-room-id'

    const result = await sut.execute({
      roomId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFound)
  })
})
