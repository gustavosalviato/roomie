import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'

import { FetchUserReservationsUseCase } from './fetch-user-resevations'

import { makeUser } from 'test/factories/make-user'

import { makeReservation } from 'test/factories/make-reservation'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryReservationsRepository: InMemoryReservationsRepository

let sut: FetchUserReservationsUseCase

describe('Fetch User Reservations', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryReservationsRepository = new InMemoryReservationsRepository()

    sut = new FetchUserReservationsUseCase(
      inMemoryReservationsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to fetch user reservations', async () => {
    const user = makeUser()

    const reservation = makeReservation({
      userId: user.id,
    })

    inMemoryUsersRepository.create(user)
    inMemoryReservationsRepository.create(reservation)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
  })
})
