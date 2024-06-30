import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { CreateRoomUseCase } from './create-room'
import { makeRoom } from 'test/factories/make-room'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let sut: CreateRoomUseCase

describe('Create Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()

    sut = new CreateRoomUseCase(inMemoryRoomsRepository)
  })

  it('should be able to register a user', async () => {
    const room = makeRoom()

    console.log(room)

    const result = await sut.execute({
      name: room.name,
      capacity: room.capacity,
      location: room.location,
      resources: room.resources,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRoomsRepository.items).toHaveLength(1)
  })
})
