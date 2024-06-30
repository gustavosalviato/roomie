import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { EditRoomUseCase } from './edit-room'

import { Room } from '@/domain/schedule/enterprise/entities/room'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'
import { makeRoom } from 'test/factories/make-room'

let inRoomsUsersRepository: InMemoryRoomsRepository
let sut: EditRoomUseCase

describe('Edit Room', () => {
  beforeEach(() => {
    inRoomsUsersRepository = new InMemoryRoomsRepository()

    sut = new EditRoomUseCase(inRoomsUsersRepository)
  })

  it('should be able to edit a room', async () => {
    const room = makeRoom()

    await inRoomsUsersRepository.create(room)

    const result = await sut.execute({
      roomId: room.id.toValue(),
      name: 'Room 10',
      capacity: 10,
      location: 'Floor 10',
      resources: ['whiteboard', 'projector'],
    })

    expect(result.isRight()).toBe(true)
    expect(inRoomsUsersRepository.items[0]).toMatchObject({
      name: 'Room 10',
      capacity: 10,
    })
  })

  it('should not be able to register a non existing room', async () => {
    const roomId = 'fake-room-id'

    const result = await sut.execute({
      roomId,
      capacity: 100,
      location: 'Floor 1',
      name: 'Room 1',
      resources: ['whiteboard'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFound)
  })
})
