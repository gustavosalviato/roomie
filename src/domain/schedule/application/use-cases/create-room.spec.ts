import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { CreateRoomUseCase } from './create-room'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let sut: CreateRoomUseCase

describe('Create Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()

    sut = new CreateRoomUseCase(inMemoryRoomsRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'Room 1',
      capacity: 10,
      location: 'Floor 1',
      resources: ['whiteboard'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRoomsRepository.items).toHaveLength(1)
  })
})
