import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { EditRoomUseCase } from './edit-room'

import { Room } from '@/domain/schedule/enterprise/entities/room'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found'

let inMemoryUsersRepository: InMemoryRoomsRepository
let sut: EditRoomUseCase

describe('Edit Room', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryRoomsRepository()

    sut = new EditRoomUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit a room', async () => {
    const room = Room.create({
      name: 'Room 1',
      capacity: 10,
      location: 'Floor 1',
      resources: ['whiteboard'],
    })

    await inMemoryUsersRepository.create(room)

    const result = await sut.execute({
      roomId: room.id.toValue(),
      name: 'Room 10',
      capacity: 10,
      location: 'Floor 10',
      resources: ['whiteboard', 'projector'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
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
