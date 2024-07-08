import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { makeReservation } from 'test/factories/make-reservation'

import { CancelReservation } from './cancel-reservation'

describe('Cancel Reservation', () => {
  let inMemoryReservationsRepository: InMemoryReservationsRepository
  let sut: CancelReservation

  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    sut = new CancelReservation(inMemoryReservationsRepository)
  })

  it('should be able to cancel a reservation', async () => {
    const reservation = makeReservation()

    await inMemoryReservationsRepository.create(reservation)

    const result = await sut.execute({
      reservationId: reservation.id.toString(),
    })

    expect(result.isRight()).toBe(true)
  })
})
