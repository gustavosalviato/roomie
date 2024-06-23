import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { CreateRoomUseCase } from './create-room'

let inMemoryUsersRepository: InMemoryRoomsRepository
let sut: CreateRoomUseCase

describe('Create Room', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryRoomsRepository()

    sut = new CreateRoomUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'Room 1',
      capacity: 10,
      location: 'Floor 1',
      resources: ['whiteboard'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })
})
