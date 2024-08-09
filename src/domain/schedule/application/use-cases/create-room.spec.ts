import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { CreateRoomUseCase } from './create-room'
import { makeRoom } from 'test/factories/make-room'

import { RecordAlreadyExistsError } from './errors/room-already-exists'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let sut: CreateRoomUseCase

describe('Create Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()

    sut = new CreateRoomUseCase(inMemoryRoomsRepository)
  })

  it('should be able to register a user', async () => {
    const room = makeRoom()

    const result = await sut.execute({
      name: room.name,
      capacity: room.capacity,
      location: room.location,
      resources: room.resources,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRoomsRepository.items).toHaveLength(1)
  })

  it('should not be able to create room with the same name', async () => {
    const firstRoom = makeRoom({
      name: 'room-1',
    })

    const secondRoom = makeRoom({
      name: 'room-1',
    })

    await inMemoryRoomsRepository.create(firstRoom)

    const result = await sut.execute({
      name: secondRoom.name,
      capacity: secondRoom.capacity,
      location: secondRoom.location,
      resources: secondRoom.resources,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(RecordAlreadyExistsError)
  })
})
