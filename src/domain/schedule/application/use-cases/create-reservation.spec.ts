import { InMemoryPeriodsRepository } from 'test/repositories/in-memory-periods-repository'
import { InMemoryRoomsRepository } from 'test/repositories/in-memory-rooms-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'

import { CreateReservationUseCase } from './create-reservation'

import { makeRoom } from 'test/factories/make-room'
import { makeUser } from 'test/factories/make-user'
import { makePeriod } from 'test/factories/make-period'

let inMemoryRoomsRepository: InMemoryRoomsRepository
let inMemoryPeriodsRepository: InMemoryPeriodsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryReservationsRepository: InMemoryReservationsRepository
let sut: CreateReservationUseCase

describe('Create Reservation', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository()
    inMemoryPeriodsRepository = new InMemoryPeriodsRepository()

    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryReservationsRepository = new InMemoryReservationsRepository()

    sut = new CreateReservationUseCase(
      inMemoryUsersRepository,
      inMemoryRoomsRepository,
      inMemoryReservationsRepository,
      inMemoryPeriodsRepository,
    )
  })

  it('should be able to create a reservation', async () => {
    const user = makeUser()
    const room = makeRoom()
    const period = makePeriod()

    inMemoryUsersRepository.create(user)
    inMemoryRoomsRepository.create(room)
    inMemoryPeriodsRepository.create(period)

    const result = await sut.execute({
      userId: user.id.toString(),
      roomId: room.id.toString(),
      periodId: period.id.toString(),
      startDate: period.startDate,
      endDate: period.endDate,
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(inMemoryPeriodsRepository.items).toHaveLength(1)
  })
})
